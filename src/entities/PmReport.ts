import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';

@Entity()
export class PmReport extends BaseEntity {
  @Property({ nullable: true })
  report?: object;

  @Property({ nullable: true })
  status?: TestStatus;

  constructor(report: object, status?: TestStatus, id?: string) {
    super();
    this.report = report;
    this.status = status ?? TestStatus.RUNNING;
    if (id) this.id = id;
  }
}
