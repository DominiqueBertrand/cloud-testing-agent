import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IPmReport } from '@src/modules/pmReport/pmReport.type';

export class CreateOrUpdateReportDto implements Partial<IPmReport> {
  @IsString()
  @ApiProperty({
    required: false,
    description: 'By default, this value is extracted from the report, so set this value to change the default value',
  })
  readonly ref!: string;

  @ApiProperty({
    required: true,
    description: 'Postman report in json format',
  })
  readonly report!: object;
}
