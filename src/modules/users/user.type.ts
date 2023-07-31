import { RefreshSession } from '@src/entities';
import { UserRole } from './user.enum';
import { Collection } from '@mikro-orm/core';

// export type User = {
//   userId: number;
//   username: string;
//   password: string;
// };

export interface iUser {
  username?: string;
  password?: string;
  sessions?: Collection<RefreshSession>;
  roles?: UserRole[];
  email?: string | undefined;
}
