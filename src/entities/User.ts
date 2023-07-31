import { IsOptional } from 'class-validator';
import { Entity, Property, Index, Unique, OneToMany, Cascade, Collection } from '@mikro-orm/core';

import { RefreshSession } from './RefreshSession';
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Property({ nullable: false })
  @Index()
  @Unique()
  username?: string;

  @Property({ nullable: false })
  password?: string;

  @OneToMany(() => RefreshSession, refreshSession => refreshSession.user, { cascade: [Cascade.ALL] })
  @IsOptional()
  sessions?: Collection<RefreshSession> = new Collection<RefreshSession>(this);

  constructor(username: string, password: string) {
    super();
    this.username = username;
    this.password = password;
  }
}
