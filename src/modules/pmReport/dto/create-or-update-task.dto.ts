import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IPmReport } from '@src/modules/pmReport/pmReport.type';
import { TestStatus } from '../pmReport-status.enum';

export class CreateOrUpdateReportDto implements Partial<IPmReport> {
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Test status for the report. Defaults to PENDING when omitted.',
    example: 'SUCCESS',
  })
  readonly status!: TestStatus;

  @ApiProperty({
    required: true,
    description: 'Newman/Postman report payload (summary, stats, executions, etc.).',
    example: {
      stats: {
        assertions: { total: 12, failed: 0 },
        requests: { total: 3, failed: 0 },
      },
      execution: [],
    },
  })
  readonly report!: object;

  @ApiProperty({
    required: true,
    description: 'Task reference (id or object containing id).',
    example: { id: 'd66b2795-aadf-49d3-b1d0-fcc111c6c4c1' },
  })
  readonly task!: object;
}
