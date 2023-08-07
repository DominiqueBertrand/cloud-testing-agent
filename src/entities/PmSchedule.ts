import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Task } from './Task';

@Entity()
export class PmSchedule extends BaseEntity {
  @Property({ nullable: true })
  cron: string;

  @Property({ nullable: true })
  name: string;

  @OneToOne(() => Task)
  task: Task;

  constructor(cron: string, name: string, task: Task) {
    super();
    this.cron = cron;
    this.name = name;
    this.task = task;
  }
}
