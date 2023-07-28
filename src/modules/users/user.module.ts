import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { OrmModule } from '../orm/orm.module';
import { UserController } from './user.controller';

@Module({
  imports: [OrmModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
