import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '@src/modules/users/user.type';
import { IsString } from 'class-validator';

export class UpdateProfileDto implements Partial<IUser> {
  @IsString()
  @ApiProperty({
    required: false,
  })
  readonly email?: string;

  @IsString()
  @ApiProperty({
    required: false,
  })
  readonly password?: string;
}
