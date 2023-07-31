import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@src/modules/users/user.enum';

export const HasRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);
