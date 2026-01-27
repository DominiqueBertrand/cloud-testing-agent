import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager, QueryOrder, wrap } from '@mikro-orm/core';

import { PmReport, Task } from '@src/entities';
import { TestReport } from '@src/modules/task/dto/test-report';
import { ElementsQueryDto } from './dto';

@Injectable()
export class PmReportService {
  constructor(
    @InjectRepository(PmReport) private readonly pmReportRepository: EntityRepository<PmReport>,
    @InjectRepository(Task) private readonly taskRepository: EntityRepository<Task>,
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

  async create({ report, status, task }): Promise<PmReport> {
    try {
      const taskId = typeof task === 'string' ? task : task?.id;
      if (!taskId) {
        throw new HttpException('Task is missing', HttpStatus.BAD_REQUEST);
      }
      const reportTask: Task | null = await this.taskRepository.findOne({ id: taskId });
      if (!reportTask) {
        throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
      }
      const pmReport: PmReport = new PmReport(reportTask, report as TestReport, status);
      this.em.persist(pmReport);
      await this.em.flush();

      return pmReport;
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async update({ report, status, id, task }): Promise<PmReport> {
    try {
      const _report: PmReport | null = await this.pmReportRepository.findOne({ id });
      if (!_report) {
        throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
      }
      if (report?.id && report.id !== id) {
        throw new HttpException('Report id mistmatch', HttpStatus.NOT_FOUND);
      }
      let reportTask = _report.task;
      if (task) {
        const taskId = typeof task === 'string' ? task : task?.id;
        if (!taskId) {
          throw new HttpException('Task is missing', HttpStatus.BAD_REQUEST);
        }
        const updatedTask: Task | null = await this.taskRepository.findOne({ id: taskId });
        if (!updatedTask) {
          throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
        reportTask = updatedTask;
      }

      wrap(_report).assign({
        task: reportTask,
        report: (report ?? _report.report) as TestReport,
        status: status ?? _report.status,
      });
      await this.em.flush();

      return _report;
    } catch (error: any) {
      console.table(error);
      throw new HttpException(error.name, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      // using reference is enough, no need for a fully initialized entity
      const report = await this.pmReportRepository.findOne({ id });

      if (!report) {
        throw new HttpException('Report not found', HttpStatus.NOT_FOUND);
      } else {
        await this.em.removeAndFlush(report);
      }
    } catch (error: any) {
      switch (error?.errno ?? error?.status) {
        case 19:
          throw new HttpException(
            `Error ${error.errno}: this collection is used by at least one task.`,
            HttpStatus.FAILED_DEPENDENCY,
          );
        case 404:
          throw new HttpException(`Error ${error.status}: ${error?.message}`, HttpStatus.NOT_FOUND);

        default:
          throw new HttpException(JSON.stringify(error), HttpStatus.BAD_REQUEST);
      }
    }
  }
}
