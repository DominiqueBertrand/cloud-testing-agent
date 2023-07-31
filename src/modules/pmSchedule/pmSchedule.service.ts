import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { EntityManager, QueryOrder } from '@mikro-orm/core';
import { PmSchedule } from '@src/entities';
import { ElementsQueryDto } from './dto';
import { checkCron } from './middleware/checkCron';

@Injectable()
export class PmScheduleService {
  constructor(
    @InjectRepository(PmSchedule) private readonly pmReportRepository: EntityRepository<PmSchedule>,
    // private readonly pmReportRepository: PmReportRepository,
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
    return this.pmReportRepository.findAll({
      //   populate: ['report', 'report'],
      orderBy,
      limit: limit ?? 20,
      offset: offset ?? 0,
      fields: ['id', 'createdAt', 'updatedAt'],
    });
  }

  async findOne(scheduleId: string): Promise<PmSchedule | null> {
    const schedule: PmSchedule | null = await this.pmReportRepository.findOne(
      { id: scheduleId },
      { populate: ['task'] },
    );
    return schedule;
  }

  async create({ pSchedule }) {
    try {
      const pmSchedule: PmSchedule = new PmSchedule(pSchedule, undefined);
      const scheduler = checkCron(pmSchedule);
      console.log(scheduler);
      this.em.persist(pmSchedule);
      await this.em.flush();

      return { pmSchedule };
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async update({ schedule, id }) {
    try {
      const _report: PmSchedule | null = await this.pmReportRepository.findOne({ id });
      if (!_report) {
        throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
      }
      if (!schedule?.id !== id) {
        throw new HttpException('Report id mistmatch', HttpStatus.NOT_FOUND);
      }
      const pmReport: PmSchedule = new PmSchedule(schedule, id);
      this.em.persist(pmReport);
      await this.em.flush();

      return { pmReport };
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    try {
      // using reference is enough, no need for a fully initialized entity
      const report = await this.pmReportRepository.findOne({ id });

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
