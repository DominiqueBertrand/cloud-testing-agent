import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Valid refresh token returned by /auth/login or /auth/refresh.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
