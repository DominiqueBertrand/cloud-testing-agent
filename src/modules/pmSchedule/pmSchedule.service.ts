import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { EntityManager, QueryOrder } from '@mikro-orm/core';
import { PmSchedule, Task } from '@src/entities';
import { ElementsQueryDto } from './dto';
import { checkCron } from './middleware/checkCron';

@Injectable()
export class PmScheduleService {
  constructor(
    @InjectRepository(PmSchedule) private readonly pmSchedulerepository: EntityRepository<PmSchedule>,
    @InjectRepository(Task) private readonly taskRepository: EntityRepository<Task>,

    private readonly em: EntityManager,
  ) {}

  async findAll({ limit, offset, orderBy: orderbyKey }: ElementsQueryDto): Promise<PmSchedule[]> {
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
    return this.pmSchedulerepository.findAll({
      //   populate: ['schedule', 'schedule'],
      orderBy,
      limit: limit ?? 20,
      offset: offset ?? 0,
      fields: ['id', 'schedule', 'createdAt', 'updatedAt'],
    });
  }

  async findOne(scheduleId: string): Promise<PmSchedule | null> {
    const schedule: PmSchedule | null = await this.pmSchedulerepository.findOne(
      { id: scheduleId },
      { populate: ['task', 'schedule'] },
    );
    if (!schedule) {
      throw new HttpException('Id schedule is not valid', HttpStatus.BAD_REQUEST);
    }
    return schedule;
  }

  async create({ pSchedule, id }): Promise<PmSchedule> {
    try {
      const task: Task | null = await this.taskRepository.findOne(id);
      if (!task) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      const pmSchedule: PmSchedule = new PmSchedule(pSchedule, task);
      if (!checkCron(pmSchedule.schedule)) {
        throw new HttpException('Cron is not valid', HttpStatus.BAD_REQUEST);
      }
      this.em.persist(pmSchedule);
      await this.em.flush();

      return pmSchedule;
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async update({ schedule, id }): Promise<PmSchedule> {
    try {
      const _schedule: PmSchedule | null = await this.pmSchedulerepository.findOne({ id });
      if (!_schedule) {
        throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND);
      }

      const pmSchedule: PmSchedule = new PmSchedule(schedule, id);
      this.em.persist(pmSchedule);
      await this.em.flush();

      return pmSchedule;
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      // using reference is enough, no need for a fully initialized entity
      const schedule = await this.pmSchedulerepository.findOne({ id });

      if (!schedule) {
        throw new HttpException('Schedule not found', HttpStatus.NOT_FOUND);
      } else {
        await this.em.removeAndFlush(schedule);
        return 'Schedule ' + id + ' deleted';
      }
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.NOT_FOUND);
    }
  }
}
