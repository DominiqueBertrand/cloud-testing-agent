import { Cascade, Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { IPmCollection, ICollection } from '@src/modules/pmCollection/pmCollection.type';
import { Task } from './Task';

@Entity()
export class PmCollection extends BaseEntity implements Partial<IPmCollection> {
  @Property({ nullable: true })
  collection?: ICollection;

  @Property({ nullable: true })
  @Unique()
  ref?: string;

  @Property({ nullable: true })
  name?: string;

  @OneToMany(() => Task, task => task.collection, { cascade: [Cascade.ALL] })
  tasks: Collection<Task> = new Collection<Task>(this);

  constructor(collection: ICollection, id: string, ref: string, name: string) {
    super();
    this.collection = collection;
    this.id = id;
    this.ref = ref;
    this.name = name;
  }
}
