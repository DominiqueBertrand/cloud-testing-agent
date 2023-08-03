import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

import { EntityManager, QueryOrder } from '@mikro-orm/core';
import { PmReport } from '@src/entities';
import { ElementsQueryDto } from './dto';

@Injectable()
export class PmReportService {
  constructor(
    @InjectRepository(PmReport) private readonly pmReportRepository: EntityRepository<PmReport>,
    // private readonly pmReportRepository: PmReportRepository,
    private readonly em: EntityManager,
  ) {}

  async findAll({ limit, offset, orderBy: orderbyKey }: ElementsQueryDto): Promise<PmReport[]> {
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
      fields: ['id', 'status', 'createdAt', 'updatedAt'],
    });
  }

  async findOne(reportId: string): Promise<PmReport | null> {
    const report: PmReport | null = await this.pmReportRepository.findOne({ id: reportId }, { populate: ['task'] });
    return report;
  }

  async create({ report, status }): Promise<PmReport> {
    try {
      const pmReport: PmReport = new PmReport(report, status, undefined);
      this.em.persist(pmReport);
      await this.em.flush();

      return pmReport;
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async update({ report, status, id }): Promise<PmReport> {
    try {
      const _report: PmReport | null = await this.pmReportRepository.findOne({ id });
      if (!_report) {
        throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
      }
      if (!report?.id !== id) {
        throw new HttpException('Report id mistmatch', HttpStatus.NOT_FOUND);
      }
      const pmReport: PmReport = new PmReport(report, status, id);
      this.em.persist(pmReport);
      await this.em.flush();

      return pmReport;
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      // using reference is enough, no need for a fully initialized entity
      const report = await this.pmReportRepository.findOne({ id });

      if (!report) {
        throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
      } else {
        await this.em.removeAndFlush(report);
        return 'Report ' + id + ' deleted';
      }
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.NOT_FOUND);
    }
  }
}
