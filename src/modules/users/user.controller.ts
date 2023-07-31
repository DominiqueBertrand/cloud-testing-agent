import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from '@src/entities';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserService } from './user.service';
import { RolesGuard } from '@src/modules/common/guards';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { HasRoles } from '@src/modules/common/decorators';
import { UserRole } from './user.enum';

@Controller('user')
@HasRoles(UserRole.SUPERADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
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
  async removeUser(@Param('id') id: string): Promise<User> {
    return await this.userService.removeUser(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.updateUser(id, updateUserDto);
  }
}
