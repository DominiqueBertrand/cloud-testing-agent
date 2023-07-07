import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class PmReport extends BaseEntity {
  @Property({ nullable: true })
  report?: object;

  constructor(report: object) {
    super();
    this.report = report;
  }
}
