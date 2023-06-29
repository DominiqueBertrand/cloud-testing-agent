import { Module } from '@nestjs/common';
import { PostmanModule } from './postman/postman.module';


@Module({
  imports: [PostmanModule],
})
export class AppModule {}
