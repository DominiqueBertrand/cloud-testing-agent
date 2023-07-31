import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';

import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserService } from './user.service';
import { User } from '@src/entities';
import { LocalAuthGuard } from '../auth/local/local-auth.guard';

@Controller()
@UseGuards(LocalAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/user')
  async getUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/user/:id')
  async getUser(@Param('id', ParseIntPipe) id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Post('/user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Delete('/user/:id')
  async removeUser(@Param('id') id: string) {
    return await this.userService.removeUser(id);
  }

  @Put('/user/:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }
}
