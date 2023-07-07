import { Module } from '@nestjs/common';

import { PostmanController } from './postman.controller';
import { PostmanService } from './postman.service';

@Module({
  controllers: [PostmanController],
  providers: [PostmanService],
})
export class PostmanModule {}
