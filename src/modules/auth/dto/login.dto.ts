import { ApiProperty } from '@nestjs/swagger';
import { User } from '@src/entities';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({
    required: true,
    description: 'Username used to authenticate (created during seeding or user creation).',
    example: 'coog',
  })
  readonly username!: string;

  @IsString()
  @ApiProperty({
    required: true,
    description: 'Password for the user.',
    example: 'change-me',
  })
  readonly password!: string;
}

export class LoginResponseDto {
  @IsString()
  @ApiProperty({
    required: true,
    description: 'Authenticated user payload (password excluded).',
    example: { id: '69cfe27b-a75c-423c-b87c-14c704cc211e', username: 'coog', roles: ['ADMIN', 'USER'] },
  })
  readonly user!: User;

  @IsString()
  @ApiProperty({
    required: true,
    description: 'JWT access token to call protected endpoints.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  readonly accessToken!: string;

  @IsString()
  @ApiProperty({
    required: true,
    description: 'JWT refresh token to renew the access token.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  readonlyrefreshToken!: string;
}
