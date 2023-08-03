import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { Task } from './Task';
import { TestReport } from '@src/modules/task/dto/test-report';
import { PoolRunWorkerDto } from '@src/modules/task/dto';

@Entity()
export class PmReport extends BaseEntity {
  @Property({ nullable: true })
  report?: TestReport;

  @Property({ nullable: true })
  status?: TestStatus;

  @ManyToOne(() => Task)
  task: Task | PoolRunWorkerDto;

  constructor(task: Task | PoolRunWorkerDto, report: TestReport, status?: TestStatus) {
    super();
    this.task = task;
    this.report = report;
    this.status = status ?? TestStatus.RUNNING;
  }
}
