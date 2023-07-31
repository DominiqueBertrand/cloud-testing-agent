import { UserRole } from '@src/modules/users/user.enum';

export type JwtPayload = {
  email: string;
  userId: string;
  roles: UserRole[];
  sub: number;
};
