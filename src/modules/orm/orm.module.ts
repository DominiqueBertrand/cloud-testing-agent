import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Task, PmReport, PmCollection, PmEnvironment, User, RefreshSession, PmSchedule } from '../../entities';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [Task, PmReport, PmCollection, PmEnvironment, User, RefreshSession, PmSchedule],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
