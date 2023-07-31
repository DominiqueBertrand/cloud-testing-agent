import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

import { User } from '@src/entities';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserRole } from './user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: EntityRepository<User>,

    private readonly em: EntityManager,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll({
      fields: ['id', 'username', 'roles', 'email'],
    });
  }

  async getUserById(id: string): Promise<User> {
    const user: User | null = await this.userRepository.findOne(id, {
      fields: ['id', 'username', 'roles', 'email', 'createdAt', 'updatedAt'],
    });

    if (!user) throw new NotFoundException('User is not found');

    return user;
  }

  // For Auth
  async getUserByUsername(username: string): Promise<User> {
    const user: User | null = await this.userRepository.findOne({ username });

    if (!user) throw new NotFoundException('User is not found');

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const username = createUserDto.username;
    const password = createUserDto.password;
    if (!username || !password) {
      throw new HttpException(`Username or password can't be undefined`, HttpStatus.NOT_ACCEPTABLE);
    }
    // Hash user password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser: User = new User(username, hashedPassword);
    if (createUserDto.email) {
      newUser.email = createUserDto.email;
    }
    if (Array.isArray(createUserDto.roles)) {
      const roles: UserRole[] = [];
      createUserDto.roles.forEach(role => {
        switch (role) {
          case UserRole.SUPERADMIN:
            roles.push(UserRole.SUPERADMIN);
            break;
          case UserRole.ADMIN:
            roles.push(UserRole.ADMIN);
            break;
          case UserRole.USER:
            roles.push(UserRole.USER);
            break;

          default:
            break;
        }
      });
      newUser.roles = roles;
    }
    this.em.persist(newUser);
    await this.em.flush();

    return newUser;
  }

  async removeUser(id: string) {
    const user = await this.userRepository.findOne(id, {
      populate: ['sessions'],
    });
    if (!user) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    await this.em.removeAndFlush(user);

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user: User | null = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.password = updateUserDto.password;
    this.em.persist(user);
    await this.em.flush();

    return user;
  }
}
