import { Module } from '@nestjs/common';

import { PmEnvironmentController } from './pmEnvironment.controller';
import { OrmModule } from '../orm/orm.module';
import { PmEnvironmentService } from './pmEnvironment.service';

@Module({
  imports: [OrmModule],
  controllers: [PmEnvironmentController],
  providers: [PmEnvironmentService],
})
export class PmEnvironmentModule {}
