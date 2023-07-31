import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { Task } from './Task';

@Entity()
export class PmReport extends BaseEntity {
  @Property({ nullable: true })
  report?: object;

  @Property({ nullable: true })
  status?: TestStatus;

  @ManyToOne(() => Task)
  task?: Task;

  constructor(report: object, status?: TestStatus, id?: string, task?: Task) {
    super();
    this.report = report;
    this.status = status ?? TestStatus.RUNNING;
    if (id) this.id = id;
    this.task = task;
  }
}
