import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';

import { EntityManager, QueryOrder } from '@mikro-orm/core';
import { PmCollection, PmEnvironment, Task } from '@src/entities';
import { CreateOrUpdateElementDto, FindAllElementsQueryDto } from './dto';
import { TaskStatus } from './task-status.enum';
import { TestStatus } from '../pmReport/pmReport-status.enum';
import { TestRunner } from './middleware/testRunner';
import { resolvePromisesSeq } from './middleware/resolvePromiseSeq';
// import { resolvePromisesSeq } from './middleware/resolvePromiseSeq';
import { Worker } from 'worker_threads';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: EntityRepository<Task>,
    @InjectRepository(PmCollection) private readonly pmCollectionRepository: EntityRepository<PmCollection>,
    @InjectRepository(PmEnvironment) private readonly pmEnvironmentRepository: EntityRepository<PmEnvironment>,
    // private readonly taskRepository: taskRepository,
    private readonly em: EntityManager,
  ) {}

  async findAll({ limit, offset, orderBy: orderbyKey }: FindAllElementsQueryDto): Promise<Task[]> {
    let orderBy: any;

    switch (orderbyKey) {
      case 'updatedAt': {
        orderBy = { updatedAt: QueryOrder.DESC };
        break;
      }
      case 'createdAt': {
        orderBy = { createdAt: QueryOrder.DESC };
        break;
      }
      case 'id': {
        orderBy = { id: QueryOrder.DESC };
        break;
      }

      default: {
        orderBy = { updatedAt: QueryOrder.DESC };
        break;
      }
    }
    return this.taskRepository.findAll({
      //   populate: ['report', 'report'],
      orderBy,
      limit: limit ?? 20,
      offset: offset ?? 0,
      fields: [
        'id',
        'createdAt',
        'updatedAt',
        'status',
        'testStatus',
        'collection.id',
        'collection.name',
        'environment.id',
        'environment.name',
        'report.id',
      ],
    });
  }

  async findOne(id: string): Promise<Task | null> {
    const report: Task | null = await this.taskRepository.findOne({ id });
    return report;
  }

  async create({ collection, environment }: Partial<CreateOrUpdateElementDto>): Promise<Task> {
    try {
      const pmCollection: PmCollection | null = await this.pmCollectionRepository.findOne({ id: collection?.id });
      const pmEnvironment: PmEnvironment | null = await this.pmEnvironmentRepository.findOne({ id: environment?.id });
      if (!pmCollection) {
        throw new HttpException('Collecion not found', HttpStatus.NOT_FOUND);
      }
      if (!pmEnvironment) {
        throw new HttpException('Environment not found', HttpStatus.NOT_FOUND);
      }
      const taskRepository = this.em.getRepository(Task);
      console.log(pmCollection, pmEnvironment);

      const task = taskRepository.create(new Task(pmCollection, pmEnvironment));
      pmCollection.tasks.add(task);
      pmEnvironment.tasks.add(task);
      await this.em.flush();

      return task;
    } catch (error: any) {
      console.error(error);
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, { collection, environment }: Partial<CreateOrUpdateElementDto>): Promise<Task> {
    try {
      const task: Task | null = await this.taskRepository.findOne({ id });
      if (!task) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      const pmCollection = this.pmCollectionRepository.findOne({ id: collection?.id });
      const pmEnvironment = this.pmEnvironmentRepository.findOne({ id: environment?.id });
      if (!pmCollection && !pmEnvironment) {
        throw new HttpException('Collecion or Environement not found', HttpStatus.NOT_FOUND);
      }
      this.em.persist(task);
      await this.em.flush();

      return task;
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    try {
      // using reference is enough, no need for a fully initialized entity
      const report = await this.taskRepository.findOne({ id });

      if (!report) {
        throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
      } else {
        await this.em.removeAndFlush(report);
      }
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.NOT_FOUND);
    }
  }

  async run(id: string) {
    try {
      // using reference is enough, no need for a fully initialized entity
      const task = await this.taskRepository.findOne(id);
      if (!task) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      const pmCollection: PmCollection | null = await this.pmCollectionRepository.findOne(
        { id: task.collection?.id },
        { populate: ['collection'] },
      );
      const pmEnvironment: PmEnvironment | null = await this.pmEnvironmentRepository.findOne({
        id: task.environment?.id,
      });
      if (!pmCollection) {
        throw new HttpException('Collecion not found', HttpStatus.NOT_FOUND);
      }
      if (!pmEnvironment) {
        throw new HttpException('Environment not found', HttpStatus.NOT_FOUND);
      }
      wrap(task).assign({ status: TaskStatus.IN_PROGRESS, testStatus: TestStatus.RUNNING });
      await this.em.flush();
      const report = await TestRunner(pmCollection.collection, pmEnvironment.environment);
      wrap(task).assign({ report, status: TaskStatus.DONE, testStatus: TestStatus.SUCCESS });
      await this.em.flush();

      return task;
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.NOT_FOUND);
    }
  }

  async runBatch(tasksIds: Array<string>) {
    try {
      const tasksData: Array<object> = [];

      await resolvePromisesSeq(
        tasksIds.map(async taskId => {
          const taskLoaded = await this.taskRepository.findOne(
            { id: taskId },
            // { populate: ['collection', 'environment'] },
          );
          const pmCollection: PmCollection | null = await this.pmCollectionRepository.findOne(
            { id: taskLoaded?.collection?.id },
            { populate: ['collection'] },
          );
          const pmEnvironment: PmEnvironment | null = await this.pmEnvironmentRepository.findOne({
            id: taskLoaded?.environment?.id,
          });
          if (!pmCollection) {
            throw new HttpException('Collecion not found', HttpStatus.NOT_FOUND);
          }
          if (!pmEnvironment) {
            throw new HttpException('Environment not found', HttpStatus.NOT_FOUND);
          }
          if (!taskLoaded) {
            throw new HttpException('Task not found : ' + { taskId }, HttpStatus.NOT_FOUND);
          }
          tasksData.push({ id: taskId, collection: pmCollection.collection, environment: pmEnvironment.environment });
        }),
      );

      // console.log(tasksData);
      tasksData.map(task => {
        const worker = new Worker('./dist/modules/task/worker/worker.js', {
          workerData: {
            value: task,
            path: './worker.ts',
          },
        });
        worker.on('message', result => {
          console.log('res:', result);
        });
      });
      if (tasksData) return { tasksData };
      else return [];
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.NOT_FOUND);
    }
  }
}
