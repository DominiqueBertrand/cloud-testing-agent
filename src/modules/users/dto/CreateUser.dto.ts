import { IsNotEmpty, IsEmail } from 'class-validator';
import { UserRole } from '../user.enum';

export class CreateUserDto {
  @IsNotEmpty()
  username?: string;

  @IsNotEmpty()
  password?: string;

  roles?: UserRole[];

  @IsEmail()
  email?: string;
}
