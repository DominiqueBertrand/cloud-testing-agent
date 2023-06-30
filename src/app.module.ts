import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostmanModule } from './postman/postman.module';
import serviceConfig from '@src/config/service.config';

@Module({
  imports: [ConfigModule.forRoot({ ignoreEnvFile: true, load: [serviceConfig] }), PostmanModule],
})
export class AppModule {}
