import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import newman from 'newman';

export class TestReport {
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Aggregated Newman stats (assertions, requests, etc.).',
    example: { assertions: { total: 12, failed: 0 }, requests: { total: 3, failed: 0 } },
  })
  readonly stats!: object;
  @ApiProperty({
    required: true,
    description: 'Full Newman run object in case of failure.',
    example: {},
  })
  readonly failure?: newman.NewmanRun;

  @ApiProperty({
    required: true,
    description: 'Per-request execution details.',
    example: [],
  })
  readonly execution?: newman.NewmanRunExecution[];
}
