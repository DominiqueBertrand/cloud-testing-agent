import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IPmEnvironment, IEnvironment } from '@src/modules/pmEnvironment/pmEnvironment.type';

export class CreateOrUpdateEnvironmentDto implements Partial<IPmEnvironment> {
  @IsString()
  @ApiProperty({
    required: false,
    description:
      'By default, this value is extracted from the environment, so set this value to change the default value',
  })
  readonly ref!: string;

  @ApiProperty({
    required: true,
    description: 'Postman environment in json format',
  })
  readonly environment!: IEnvironment;
}
