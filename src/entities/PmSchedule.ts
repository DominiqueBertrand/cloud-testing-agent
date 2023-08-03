import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Task } from './Task';
import { Schedule } from '@src/modules/pmSchedule/pmSchedule.type';

@Entity()
export class PmSchedule extends BaseEntity {
  @Property({ nullable: true })
  schedule: Schedule;

  @OneToOne(() => Task)
  task: Task;

  constructor(schedule: Schedule, task: Task) {
    super();
    this.schedule = schedule;
    this.task = task;
  }
}
