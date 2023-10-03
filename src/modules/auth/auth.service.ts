import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { SignOptions } from 'jsonwebtoken';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { UserService } from '../users/user.service';
import { RefreshSession, User } from '@src/entities';
import { LoginDto } from './dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { hashPassword } from '../users/user.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshSession) private readonly sessionRepository: EntityRepository<RefreshSession>,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,

    private readonly em: EntityManager,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: User = await this.userService.getUserByUsername(username);

    if (user?.password) {
      const isValid = await bcrypt.compare(pass, user.password);
      if (isValid) {
        const dynamicKey = 'password';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [dynamicKey]: _, ...rest } = user;

        return rest;
      }
    }

    return null;
  }

  async login(login: LoginDto) {
    const user: User = await this.userService.getUserByUsername(login.username);
    const accessToken = await this.generateAccessToken({ id: user.id, username: user.username, roles: user.roles });
    const refreshToken = await this.generateRefreshToken({ id: user.id });

    await this.createRefreshSession(user, refreshToken);

    const dynamicKey = 'password';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [dynamicKey]: _, ...rest } = user;

    return {
      user: rest,
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: string): Promise<boolean> {
    try {
      const user: User = await this.userService.getUserById(userId);
      if (!user) {
        return false;
      }
      user?.sessions?.removeAll();

      this.em.flush();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async createRefreshSession(user: User, token: string) {
    const decodeToken: any = this.jwtService.decode(token);

    const refreshToken = token;
    const expiresIn = decodeToken.exp;
    const createdAt: Date = decodeToken.iat;

    const session = new RefreshSession(user, refreshToken, expiresIn, createdAt);

    this.em.persist(session);
    await this.em.flush();

    return session;
  }

  async generateAccessToken(payload: {
    id: string;
    username: string | undefined;
    roles: string[] | undefined;
  }): Promise<string> {
    const expiresIn = this.configService.get<string>('service.jwt.jwtAccessExpiresIn');
    const subject = String(payload.id);
    const opts: SignOptions = {
      expiresIn,
      subject,
    };

    return this.jwtService.signAsync(
      {
        username: payload.username,
        userid: payload.id,
        roles: payload.roles,
        sid: v4(), // token uniqueness
      },
      opts,
    );
  }

  async generateRefreshToken(payload: { id: string }): Promise<string> {
    const opts: SignOptions = {
      expiresIn: this.configService.get<string>('service.jwt.jwtRefreshExpiresIn'),
      subject: String(payload.id),
    };

    return this.jwtService.signAsync(
      {
        sid: v4(), // token uniqueness
      },
      opts,
    );
  }

  async refreshToken(token: string) {
    let decodeToken: any;
    try {
      decodeToken = this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException();
    }

    const user: User = await this.userService.getUserById(decodeToken.sub);

    const session: RefreshSession | null = await this.sessionRepository.findOne({ refreshToken: token });
    if (!session) throw new UnauthorizedException();

    const accessToken = await this.generateAccessToken({ id: user.id, username: user.username, roles: user.roles });
    const refreshToken = await this.generateRefreshToken({ id: user.id });

    const decodeNewToken: any = this.jwtService.decode(refreshToken);

    session.createdAt = decodeNewToken.iat;
    session.expiresIn = decodeNewToken.exp;
    session.refreshToken = refreshToken;

    this.em.persist(session);
    await this.em.flush();

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async profile(userId: string): Promise<User> {
    const user: User = await this.userService.getUserById(userId);

    return user;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user: User = await this.userService.getUserById(userId);
    const email: string | undefined = updateProfileDto?.email;
    const password: string | undefined = updateProfileDto?.password;

    if (user?.email !== email) {
      user.email = email;
      this.em.persist(user);
      await this.em.flush();
    }
    if (password) {
      const hashedPassword: string = await hashPassword(password);
      user.password = hashedPassword;
      this.em.persist(user);
      await this.em.flush();
    }

    return user;
  }
}
