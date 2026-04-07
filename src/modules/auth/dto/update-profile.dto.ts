import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '@src/modules/users/user.type';
import { IsString } from 'class-validator';

export class UpdateProfileDto implements Partial<IUser> {
  @IsString()
  @ApiProperty({
    required: false,
    description: 'New email for the current user.',
    example: 'user@example.com',
  })
  readonly email?: string;

  @IsString()
  @ApiProperty({
    required: false,
    description: 'New password for the current user.',
    example: 'new-strong-password',
  })
  readonly password?: string;
}
