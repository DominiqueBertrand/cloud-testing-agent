import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
// import { ApiProperty } from '@nestjs/swagger';

import { PmCollection, PmEnvironment, PmReport } from './index';
import { BaseEntity } from './BaseEntity';
import { TaskStatus } from '@src/modules/task/task-status.enum';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';

@Entity()
export class Task extends BaseEntity {
  @ManyToOne(() => PmCollection)
  collection?: PmCollection;

  @ManyToOne(() => PmEnvironment)
  environment?: PmEnvironment;

  @OneToOne(() => PmReport)
  report?: PmReport;

  @Property({ nullable: true })
  options?: object;

  @Property({ nullable: true })
  status?: TaskStatus;

  @Property({ nullable: true })
  testStatus?: TestStatus;

  constructor(collection: PmCollection, environment: PmEnvironment, status?: TaskStatus, testStatus?: TestStatus) {
    super();
    this.collection = collection;
    this.environment = environment;
    this.status = status ?? TaskStatus.OPEN;
    this.testStatus = testStatus ?? TestStatus.PENDING;
  }
}
