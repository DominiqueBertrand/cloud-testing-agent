import { Entity, Index, ManyToOne, OneToOne, Property, Ref, wrap } from '@mikro-orm/core';
// import { ApiProperty } from '@nestjs/swagger';

import { PmCollection, PmEnvironment, PmReport } from './index';
import { BaseEntity } from './BaseEntity';
import { TaskStatus } from '@src/modules/task/task-status.enum';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { IsOptional } from 'class-validator';
@Entity()
export class Task extends BaseEntity {
  @ManyToOne(() => PmCollection)
  collection?: Ref<PmCollection>;

  @ManyToOne(() => PmEnvironment)
  environment?: Ref<PmEnvironment>;

  @OneToOne(() => PmReport, { nullable: true })
  @IsOptional()
  report?: PmReport;

  @Property({ nullable: true })
  options?: object;

  @Property({ nullable: true })
  @Index()
  status?: TaskStatus;

  @Property({ nullable: true })
  testStatus?: TestStatus;

  constructor(collection: PmCollection, environment: PmEnvironment, status?: TaskStatus, testStatus?: TestStatus) {
    super();
    this.collection = wrap(collection).toReference();
    this.environment = wrap(environment).toReference();
    this.status = status ?? TaskStatus.OPEN;
    this.testStatus = testStatus ?? TestStatus.PENDING;
  }
}
