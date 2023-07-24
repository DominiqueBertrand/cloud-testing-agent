import { Module } from '@nestjs/common';

import { PmReportController } from './pmReport.controller';
import { OrmModule } from '../orm/orm.module';
import { PmReportService } from './pmReport.service';

@Module({
  imports: [OrmModule],
  controllers: [PmReportController],
  providers: [PmReportService],
})
export class PmReportModule {}
