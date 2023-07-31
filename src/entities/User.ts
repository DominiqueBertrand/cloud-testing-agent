import { IsOptional, IsEmail } from 'class-validator';
import { Entity, Property, Index, Unique, OneToMany, Cascade, Collection } from '@mikro-orm/core';

import { RefreshSession } from './RefreshSession';
import { BaseEntity } from './BaseEntity';
import { UserRole } from '@src/modules/users/user.enum';

@Entity()
export class User extends BaseEntity {
  @Property({ nullable: false })
  @Index()
  @Unique()
  username?: string;

  @Property({ nullable: false })
  password?: string;

  @OneToMany(() => RefreshSession, refreshSession => refreshSession.user, {
    cascade: [Cascade.ALL],
  })
  @IsOptional()
  sessions?: Collection<RefreshSession> = new Collection<RefreshSession>(this);

  @Property({ nullable: false })
  roles?: UserRole[];

  @Property({ nullable: true })
  @IsEmail()
  email?: string | undefined;

  constructor(username: string, password: string, roles?: UserRole[], email?: string) {
    super();
    this.username = username;
    this.password = password;
    this.roles = roles ?? [UserRole.USER];
    this.email = email;
  }
}
