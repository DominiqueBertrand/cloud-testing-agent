import { Module } from '@nestjs/common';

import { PmCollectionController } from './pmCollection.controller';
import { OrmModule } from '../orm/orm.module';
import { PmCollectionService } from './pmCollection.service';

@Module({
  imports: [OrmModule],
  controllers: [PmCollectionController],
  providers: [PmCollectionService],
})
export class PmCollectionModule {}
