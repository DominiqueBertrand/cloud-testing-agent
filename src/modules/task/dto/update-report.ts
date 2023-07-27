import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { TaskStatus } from '../task-status.enum';
import { PmReport } from '@src/entities';

export class UpdateReportDto {
  @IsString()
  @ApiProperty({
    required: false,
    description: 'By default, this value is equal to the id, so set this value to change the default value',
  })
  readonly ref!: string;

  @ApiProperty({
    required: true,
    description: 'Postman environment in json format',
  })
  readonly status!: TaskStatus;

  @ApiProperty({
    required: true,
    description: 'Postman environment in json format',
  })
  readonly testStatus!: TestStatus;
  @ApiProperty({
    required: true,
    description: 'Postman environment in json format',
  })
  readonly report?: PmReport;
}
