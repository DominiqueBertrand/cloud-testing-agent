import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { IPmEnvironment, IEnvironment } from '@src/modules/pmEnvironment/pmEnvironment.type';

@Entity()
export class PmEnvironment extends BaseEntity implements Partial<IPmEnvironment> {
  @Property({ nullable: true })
  environment?: IEnvironment;

  @Property({ nullable: true })
  @Unique()
  ref?: string;

  @Property({ nullable: true })
  name?: string;

  constructor(environment: IEnvironment, id: string, ref: string, name: string) {
    super();
    this.environment = environment;
    this.id = id;
    this.ref = ref;
    this.name = name;
  }
}
