import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import newman from 'newman';

export class TestReport {
  @IsString()
  @ApiProperty({
    required: false,
    description: 'By default, this value is equal to the id, so set this value to change the default value',
  })
  readonly stats!: object;
  @ApiProperty({
    required: true,
    description: 'Postman environment in json format',
  })
  readonly failure?: newman.NewmanRun;

  @ApiProperty({
    required: true,
    description: 'Postman environment in json format',
  })
  readonly execution?: newman.NewmanRunExecution[];
}
