import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import serviceConfig from '@src/config/service.config';
// Modules
import { OrmModule } from './modules/orm/orm.module';
import { TaskModule } from './modules/task/task.module';
import { PmCollectionModule } from './modules/pmCollection/pmCollection.module';
import { PmReportModule } from './modules/pmReport/pmReport.module';
import { PmEnvironmentModule } from './modules/pmEnvironment/pmEnvironment.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true, load: [serviceConfig] }),
    OrmModule,
    TaskModule,
    PmCollectionModule,
    PmReportModule,
    PmEnvironmentModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
