import { ApiProperty } from '@nestjs/swagger';
import { User } from '@src/entities';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    required: true,
  })
  readonly username!: string;

  @IsString()
  @ApiProperty({
    required: true,
  })
  readonly password!: string;
}

export class LoginResponseDto {
  @IsString()
  @ApiProperty({
    required: true,
  })
  readonly user!: User;

  @IsString()
  @ApiProperty({
    required: true,
  })
  readonly accessToken!: string;

  @IsString()
  @ApiProperty({
    required: true,
  })
  readonlyrefreshToken!: string;
}
