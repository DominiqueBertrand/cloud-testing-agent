import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { TaskStatus } from '../task-status.enum';
import { PmReport } from '@src/entities';

export class UpdateReportDto {
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Optional reference label for the report update.',
    example: 'run-2026-01-28T12:21:18Z',
  })
  readonly ref!: string;

  @ApiProperty({
    required: true,
    description: 'Task status to set after execution.',
    example: 'DONE',
  })
  readonly status!: TaskStatus;

  @ApiProperty({
    required: true,
    description: 'Test status to set after execution.',
    example: 'SUCCESS',
  })
  readonly testStatus!: TestStatus;
  @ApiProperty({
    required: true,
    description: 'Report payload produced by the runner.',
    example: {
      stats: { assertions: { total: 12, failed: 0 }, requests: { total: 3, failed: 0 } },
      execution: [],
    },
  })
  readonly report?: PmReport;
}
