import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository, EntityManager, QueryOrder } from '@mikro-orm/core';

import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

import { User } from '@src/entities';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserRole } from './user.enum';
import { hashPassword, sanitizeUser } from './user.utils';
import { FindAllElementsQueryDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: EntityRepository<User>,

    private readonly em: EntityManager,
  ) {}

  async getAllUsers({ limit, offset, orderBy: orderbyKey }: FindAllElementsQueryDto): Promise<User[]> {
    let orderBy: any;

    switch (orderbyKey) {
      case 'updatedAt': {
        orderBy = { updatedAt: QueryOrder.DESC };
        break;
      }
      case 'createdAt': {
        orderBy = { createdAt: QueryOrder.DESC };
        break;
      }
      case 'id': {
        orderBy = { id: QueryOrder.DESC };
        break;
      }

      default: {
        orderBy = { updatedAt: QueryOrder.DESC };
        break;
      }
    }
    return await this.userRepository.findAll({
      orderBy,
      limit: limit ?? 20,
      offset: offset ?? 0,
      fields: ['id', 'username', 'roles', 'email'],
    });
  }

  async getUserById(id: string): Promise<User> {
    const user: User | null = await this.userRepository.findOne(id, {
      fields: ['id', 'username', 'roles', 'email', 'createdAt', 'updatedAt', 'sessions'],
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
    const hashedPassword = await hashPassword(password);
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

    return sanitizeUser(newUser);
  }

  async removeUser(id: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne(id, {
        populate: ['sessions'],
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await this.em.removeAndFlush(user);
    } catch (error: any) {
      if ((error?.errno ?? error?.status) === 404) {
        throw new HttpException(
          `Error ${error.errno}: this environment is used by at least one task.`,
          HttpStatus.FAILED_DEPENDENCY,
        );
      } else {
        throw new HttpException(JSON.stringify(error), HttpStatus.BAD_REQUEST);
      }
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user: User | null = await this.userRepository.findOne(id);
      if (!user) {
        throw new HttpException('Error: User not found', HttpStatus.NOT_FOUND);
      }
      user.password = updateUserDto.password;
      this.em.persist(user);

      await this.em.flush();

      return sanitizeUser(user);
    } catch (error: any) {
      throw new HttpException(JSON.stringify(error), HttpStatus.BAD_REQUEST);
    }
  }
}
