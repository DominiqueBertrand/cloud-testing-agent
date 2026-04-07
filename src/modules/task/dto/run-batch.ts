import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RunBatch {
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Array of task ids to run in batch.',
    example: ['d66b2795-aadf-49d3-b1d0-fcc111c6c4c1', '7e41d6f2-271a-4964-9058-674f5f5a03b9'],
  })
  readonly tasks!: Array<string>;
}
