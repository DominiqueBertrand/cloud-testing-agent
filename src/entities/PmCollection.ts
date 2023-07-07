import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { IPmCollection, ICollection } from '@src/modules/pmCollection/pmCollection.type';

@Entity()
export class PmCollection extends BaseEntity implements Partial<IPmCollection> {
  @Property({ nullable: true })
  collection?: ICollection;

  @Property({ nullable: true })
  @Unique()
  ref?: string;

  @Property({ nullable: true })
  name?: string;

  constructor(collection: ICollection, id: string, ref: string, name: string) {
    super();
    this.collection = collection;
    this.id = id;
    this.ref = ref;
    this.name = name;
  }
}
