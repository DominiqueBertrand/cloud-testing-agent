import { Module } from '@nestjs/common';

import { PmScheduleController } from './pmSchedule.controller';
import { OrmModule } from '../orm/orm.module';
import { PmScheduleService } from './pmSchedule.service';

@Module({
  imports: [OrmModule],
  controllers: [PmScheduleController],
  providers: [PmScheduleService],
})
export class PmReportModule {}
