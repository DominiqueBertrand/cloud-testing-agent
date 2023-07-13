import { Cascade, Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { IPmEnvironment, IEnvironment } from '@src/modules/pmEnvironment/pmEnvironment.type';
import { Task } from './Task';

@Entity()
export class PmEnvironment extends BaseEntity implements Partial<IPmEnvironment> {
  @Property({ nullable: true })
  environment?: IEnvironment;

  @Property({ nullable: true })
  @Unique()
  ref?: string;

  @Property({ nullable: true })
  name?: string;

  @OneToMany(() => Task, task => task.environment, { cascade: [Cascade.ALL] })
  tasks: Collection<Task> = new Collection<Task>(this);

  constructor(environment: IEnvironment, id: string, ref: string, name: string) {
    super();
    this.environment = environment;
    this.id = id;
    this.ref = ref;
    this.name = name;
  }
}
