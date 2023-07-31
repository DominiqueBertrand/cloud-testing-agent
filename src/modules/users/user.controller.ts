import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';

import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UserService } from './user.service';
import { User } from '@src/entities';
import { LocalAuthGuard } from '../auth/local/local-auth.guard';
import { Public } from '../common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Get()
  @ApiBearerAuth()
  async getUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Public()
  @Get(':id')
  @ApiBearerAuth()
  async getUser(@Param('id', ParseIntPipe) id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Public()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  async removeUser(@Param('id') id: string) {
    return await this.userService.removeUser(id);
  }

  @UseGuards(LocalAuthGuard)
  @Put(':id')
  @ApiBearerAuth()
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }
}
