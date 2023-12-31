import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { User } from '@src/entities';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserService } from './user.service';
import { RolesGuard } from '@src/modules/common/guards';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { HasRoles } from '@src/modules/common/decorators';
import { UserRole } from './user.enum';
import { FindAllElementsQueryDto } from './dto';

@Controller('user')
@HasRoles(UserRole.SUPERADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(@Query() query: FindAllElementsQueryDto): Promise<User[]> {
    return await this.userService.getAllUsers(query);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeUser(@Param('id') id: string): Promise<void> {
    return await this.userService.removeUser(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.updateUser(id, updateUserDto);
  }
}
