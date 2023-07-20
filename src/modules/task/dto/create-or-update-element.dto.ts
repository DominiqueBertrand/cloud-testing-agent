import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IPmCollection } from '@src/modules/pmCollection/pmCollection.type';
import { IEnvironment, IPmEnvironment } from '@src/modules/pmEnvironment/pmEnvironment.type';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { TaskStatus } from '../task-status.enum';
import { PmReport } from '@src/entities';

interface iCollection extends Partial<IPmCollection> {
  id: string;
  environment?: IEnvironment;
}

interface iEnvironment extends Partial<IPmEnvironment> {
  id: string;
}

export class CreateOrUpdateElementDto {
  @IsString()
  @ApiProperty({
    required: false,
    description: 'By default, this value is equal to the id, so set this value to change the default value',
  })
  readonly ref!: string;

  @ApiProperty({
    required: true,
    description: 'Postman collection in json format',
  })
  readonly collection!: iCollection;

  @ApiProperty({
    required: true,
    description: 'Postman environment in json format',
  })
  readonly environment!: iEnvironment;

  @ApiProperty({
    required: true,
    description: 'Postman environment in json format',
  })
  readonly status?: TaskStatus;

  @ApiProperty({
    required: true,
    description: 'Postman environment in json format',
  })
  readonly testStatus?: TestStatus;
  @ApiProperty({
    required: true,
    description: 'Postman environment in json format',
  })
  readonly report?: PmReport;
}
