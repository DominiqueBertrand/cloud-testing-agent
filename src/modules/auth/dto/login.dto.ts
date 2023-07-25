import { ApiProperty } from '@nestjs/swagger';
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
