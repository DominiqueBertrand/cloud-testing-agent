import { Module } from '@nestjs/common';

import { TaskController } from './task.controller';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [TaskController],
  providers: [],
})
export class TaskModule {}
