import { Module } from '@nestjs/common';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
