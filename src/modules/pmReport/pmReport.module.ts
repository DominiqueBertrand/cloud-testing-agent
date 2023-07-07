import { Module } from '@nestjs/common';

import { PmReportController } from './pmReport.controller';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [PmReportController],
  providers: [],
})
export class PmReportModule {}
