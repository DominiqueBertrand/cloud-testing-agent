import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IPmEnvironment, IEnvironment } from '@src/modules/pmEnvironment/pmEnvironment.type';

export class CreateOrUpdateEnvironmentDto implements Partial<IPmEnvironment> {
  @IsString()
  @ApiProperty({
    required: false,
    description: 'Optional reference label. Defaults to environment.id when omitted.',
    example: 'INDIVIDUEL-COOG',
  })
  readonly ref!: string;

  @ApiProperty({
    required: true,
    description: 'Postman environment JSON (exported from Postman).',
    example: {
      id: '3f68fe37-e2b2-47b3-9530-02452adb9ae4',
      name: 'INDIVIDUEL COOG',
      values: [
        { key: 'api_gateway', value: 'aesio.recette.coog.io/gateway', type: 'default', enabled: true },
        { key: 'coog_user_api_coog_token', value: 'change-me', type: 'default', enabled: true },
      ],
      _postman_variable_scope: 'environment',
      _postman_exported_at: '2026-01-27T15:55:09.303Z',
      _postman_exported_using: 'Postman/11.81.3',
    },
  })
  readonly environment!: IEnvironment;
}
