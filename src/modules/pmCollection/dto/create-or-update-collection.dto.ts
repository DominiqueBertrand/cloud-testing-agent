import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IPmCollection, ICollection } from '@src/modules/pmCollection/pmCollection.type';

export class CreateOrUpdateCollectionDto implements Partial<IPmCollection> {
  @IsString()
  @ApiProperty({
    required: false,
    description:
      'Optional reference used to label the collection. Defaults to collection.info._postman_id when omitted.',
    example: 'PIAES2-migration-tnr',
  })
  readonly ref!: string;

  @ApiProperty({
    required: true,
    description:
      'Postman collection JSON. Must include info._postman_id and info.name. Use full Postman export for best compatibility.',
    example: {
      info: {
        _postman_id: '3ede584c-ef4b-4634-b8c6-a4cd980394f6',
        name: '[PPOP-659] POSTGRESQL MIGRATION TNR [PIAES2]',
        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
        _exporter_id: '12345',
      },
      item: [
        {
          name: 'Healthcheck',
          request: { method: 'GET', url: 'https://example.test/health' },
        },
      ],
    },
  })
  readonly collection!: ICollection;
}
