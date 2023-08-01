import { ApiProperty } from '@nestjs/swagger';
import { iUser } from '@src/modules/users/user.type';
import { IsString } from 'class-validator';

export class UpdateProfileDto implements Partial<iUser> {
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
