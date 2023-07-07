import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import serviceConfig from '@src/config/service.config';
// Modules
import { PostmanModule } from './modules/postman/postman.module';
import { OrmModule } from './modules/orm/orm.module';
import { TaskModule } from './modules/task/task.module';
import { PmCollectionModule } from './modules/pmCollection/pmCollection.module';
import { PmReportModule } from './modules/pmReport/pmReport.module';
import { PmEnvironmentModule } from './modules/pmEnvironment/pmEnvironment.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot({ ignoreEnvFile: true, load: [serviceConfig] }),
    PostmanModule,
    OrmModule,
    TaskModule,
    PmCollectionModule,
    PmReportModule,
    PmEnvironmentModule,
  ],
})
export class AppModule {}
