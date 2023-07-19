import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RunBatch {
  @IsString()
  @ApiProperty({
    required: false,
    description: 'By default, this value is equal to the id, so set this value to change the default value',
  })
  readonly tasks!: Array<string>;
}
