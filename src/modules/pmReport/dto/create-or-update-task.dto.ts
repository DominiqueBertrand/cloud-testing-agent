import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IPmReport } from '@src/modules/pmReport/pmReport.type';
import { TestStatus } from '../pmReport-status.enum';

export class CreateOrUpdateReportDto implements Partial<IPmReport> {
  @IsString()
  @ApiProperty({
    required: false,
    description: 'By default, this value is set to TestStatus.PENDING',
  })
  readonly status!: TestStatus;

  @ApiProperty({
    required: true,
    description: 'Postman report in json format',
  })
  readonly report!: object;
}
