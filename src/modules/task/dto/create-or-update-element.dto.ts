import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IPmCollection, ICollection } from '@src/modules/pmCollection/pmCollection.type';

export class CreateOrUpdateElementDto implements Partial<IPmCollection> {
  @IsString()
  @ApiProperty({
    required: false,
    description:
      'By default, this value is extracted from the collection, so set this value to change the default value',
  })
  readonly ref!: string;

  @ApiProperty({
    required: true,
    description: 'Postman collection in json format',
  })
  readonly collection!: ICollection;
}
