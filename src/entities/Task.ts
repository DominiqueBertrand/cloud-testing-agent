import { Cascade, Entity, ManyToOne, Property } from '@mikro-orm/core';
// import { ApiProperty } from '@nestjs/swagger';

import { PmCollection, PmReport } from './index';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Task extends BaseEntity {
  //   @ApiProperty({ example: { collection: { id: '1' } }, description: 'The Id of the Collection' })
  @ManyToOne(() => PmCollection)
  collection?: PmCollection;

  @ManyToOne(() => PmReport, { cascade: [Cascade.PERSIST, Cascade.REMOVE], nullable: true })
  report?: PmReport;

  @Property({ nullable: true })
  options?: object;

  constructor(collection: PmCollection) {
    super();
    this.collection = collection;
  }
}
