import {
  Cascade,
  Collection,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property,
  Ref,
  wrap,
} from '@mikro-orm/core';
// import { ApiProperty } from '@nestjs/swagger';

import { PmCollection, PmEnvironment, PmReport, PmSchedule } from './index';
import { BaseEntity } from './BaseEntity';
import { TaskStatus, TaskType } from '@src/modules/task/task-status.enum';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { IsOptional } from 'class-validator';
import { ITask } from '@src/modules/task/task.type';
@Entity()
export class Task extends BaseEntity implements ITask {
  @ManyToOne(() => PmCollection)
  collection?: Ref<PmCollection>;

  @ManyToOne(() => PmEnvironment)
  environment?: Ref<PmEnvironment>;

  @OneToMany(() => PmReport, report => report.task, { cascade: [Cascade.ALL] })
  @IsOptional()
  reports: Collection<PmReport> = new Collection<PmReport>(this);

  @OneToOne(() => PmSchedule, schedule => schedule.task, { nullable: true, cascade: [Cascade.ALL], owner: true })
  @IsOptional()
  schedule?: PmSchedule;

  @Property({ nullable: true })
  options?: object;

  @Property({ nullable: true })
  @Index()
  status?: TaskStatus;

  @Property({ nullable: true })
  testStatus?: TestStatus;

  @Property({ nullable: true })
  type?: TaskType;

  constructor(
    collection: PmCollection,
    environment: PmEnvironment,
    type?: TaskType,
    status?: TaskStatus,
    testStatus?: TestStatus,
  ) {
    super();
    this.collection = wrap(collection).toReference();
    this.environment = wrap(environment).toReference();
    this.type = type ?? TaskType.ONESHOT;
    this.status = status ?? TaskStatus.OPEN;
    this.testStatus = testStatus ?? TestStatus.PENDING;
  }
}
