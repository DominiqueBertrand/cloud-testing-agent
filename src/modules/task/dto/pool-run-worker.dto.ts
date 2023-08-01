import { ApiProperty } from '@nestjs/swagger';
import { PmCollection, PmEnvironment } from '@src/entities';
import { IsString } from 'class-validator';

export class PoolRunWorkerDto {
  @IsString()
  @ApiProperty({
    required: false,
  })
  readonly id!: string;

  @ApiProperty({
    required: false,
  })
  readonly environment!: PmEnvironment;

  @ApiProperty({
    required: false,
  })
  readonly collection!: PmCollection;

  constructor(id: string, environment: PmEnvironment, collection: PmCollection) {
    this.id = id;
    this.collection = JSON.parse(JSON.stringify(collection));
    this.environment = JSON.parse(JSON.stringify(environment));
  }
}
