import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { EntityManager, QueryOrder } from '@mikro-orm/core';
import { PmCollection, PmEnvironment, Task } from '@src/entities';
import { CreateOrUpdateElementDto, FindAllElementsQueryDto } from './dto';
import { taskInit } from './middleware/taskManager';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: EntityRepository<Task>,
    @InjectRepository(PmCollection) private readonly pmCollectionRepository: EntityRepository<PmCollection>,
    @InjectRepository(PmEnvironment) private readonly PmEnvironmentRepository: EntityRepository<PmEnvironment>,
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
      fields: ['id', 'createdAt', 'updatedAt', 'collection', 'environment'],
    });
  }

  async findOne(id: string): Promise<Task | null> {
    const report: Task | null = await this.taskRepository.findOne({ id });
    return report;
  }

  async create({ collection, environment, ref }: Partial<CreateOrUpdateElementDto>): Promise<Task> {
    try {
      const pmCollection = this.pmCollectionRepository.findOne({ id: collection?.id });
      if (!pmCollection) {
        throw new HttpException('Collecion not found', HttpStatus.NOT_FOUND);
      }
      const pmEnvironment = this.PmEnvironmentRepository.findOne({ id: environment?.id });
      if (!pmEnvironment) {
        throw new HttpException('Environment not found', HttpStatus.NOT_FOUND);
      }
      const task: Task = await taskInit(collection, environment, ref);
      console.log(ref);
      return task;
    } catch (error: any) {
      console.error(error);
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id, { collection, environment }: Partial<CreateOrUpdateElementDto>): Promise<Task> {
    try {
      const task: Task | null = await this.taskRepository.findOne({ id });
      if (!task) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      const pmCollection = this.pmCollectionRepository.findOne({ id: collection?.id });
      const pmEnvironment = this.PmEnvironmentRepository.findOne({ id: environment?.id });
      if (!pmCollection && !pmEnvironment) {
        throw new HttpException('Collecion or Environement not found', HttpStatus.NOT_FOUND);
      }
      const updatedTask: Task = { ...task, ...pmCollection, ...pmEnvironment };
      this.em.persist(updatedTask);
      await this.em.flush();

      return updatedTask;
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
}
