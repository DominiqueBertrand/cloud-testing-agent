import { Entity, ManyToOne, Index, Unique, Property } from '@mikro-orm/core';

import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class RefreshSession extends BaseEntity {
  @ManyToOne(() => User)
  user?: User;

  @Property()
  @Index()
  @Unique()
  refreshToken?: string;

  @Property()
  expiresIn?: number;

  constructor(user: User, refreshToken: string, expiresIn?: number, createdAt?: Date) {
    super(createdAt);
    this.user = user;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
  }
}
