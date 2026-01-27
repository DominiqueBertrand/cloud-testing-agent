import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { OrmModule } from '../orm/orm.module';
import { InternalOrJwtAuthGuard } from '../common/guards';

@Module({
  imports: [OrmModule, ConfigModule],
  controllers: [TaskController],
  providers: [TaskService, InternalOrJwtAuthGuard],
})
export class TaskModule {}
