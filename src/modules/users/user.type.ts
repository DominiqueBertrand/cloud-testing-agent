import { RefreshSession } from '@src/entities';
import { UserRole } from './user.enum';
import { Collection } from '@mikro-orm/core';

export interface IUser {
  username?: string;
  password?: string;
  sessions?: Collection<RefreshSession>;
  roles?: UserRole[];
  email?: string;
}
