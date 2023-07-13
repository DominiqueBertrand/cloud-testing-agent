import { Entity, Index, OneToOne, Property } from '@mikro-orm/core';
// import { ApiProperty } from '@nestjs/swagger';

import { PmReport } from './index';
import { BaseEntity } from './BaseEntity';
import { TaskStatus } from '@src/modules/task/task-status.enum';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { IsOptional } from 'class-validator';
@Entity()
export class PmTest extends BaseEntity {
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

  constructor(testStatus?: TestStatus) {
    super();
    this.testStatus = testStatus ?? TestStatus.PENDING;
  }
}
