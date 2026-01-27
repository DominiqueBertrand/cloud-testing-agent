import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { RefreshSession, User } from '@src/entities';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  const sessionRepository = {
    findOne: jest.fn(),
  };
  const userService = {
    getUserByUsername: jest.fn(),
    getUserById: jest.fn(),
  };
  const jwtService = {
    signAsync: jest.fn(),
    decode: jest.fn(),
    verify: jest.fn(),
  };
  const configService = {
    get: jest.fn(),
  };
  const em = {
    persist: jest.fn(),
    flush: jest.fn(),
  };

  const buildService = () =>
    new AuthService(
      sessionRepository as any,
      userService as any,
      jwtService as any,
      configService as any,
      em as any,
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user without password when credentials are valid', async () => {
      const service = buildService();
      userService.getUserByUsername.mockResolvedValueOnce({
        id: 'user-1',
        username: 'test',
        password: 'hashed',
      } as User);
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

      const result = await service.validateUser('test', 'password');

      expect(result).toMatchObject({ id: 'user-1', username: 'test' });
      expect(result.password).toBeUndefined();
    });

    it('should return null when credentials are invalid', async () => {
      const service = buildService();
      userService.getUserByUsername.mockResolvedValueOnce({
        id: 'user-1',
        username: 'test',
        password: 'hashed',
      } as User);
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

      const result = await service.validateUser('test', 'wrong');

      expect(result).toBeNull();
    });
  });

  describe('refreshToken', () => {
    it('should throw UnauthorizedException when session is missing', async () => {
      const service = buildService();
      jwtService.verify.mockReturnValueOnce({ sub: 'user-1' });
      userService.getUserById.mockResolvedValueOnce({ id: 'user-1' } as User);
      sessionRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.refreshToken('token')).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('should issue new tokens when session exists', async () => {
      const service = buildService();
      jwtService.verify.mockReturnValueOnce({ sub: 'user-1' });
      userService.getUserById.mockResolvedValueOnce({ id: 'user-1', username: 'test' } as User);
      sessionRepository.findOne.mockResolvedValueOnce({
        refreshToken: 'old',
        expiresIn: 0,
        createdAt: new Date(),
      } as RefreshSession);
      jwtService.signAsync.mockResolvedValueOnce('access-token').mockResolvedValueOnce('refresh-token');
      jwtService.decode.mockReturnValueOnce({ iat: new Date(), exp: 123 });
      configService.get.mockReturnValue('15m');

      const result = await service.refreshToken('token');

      expect(result.accessToken).toBe('access-token');
      expect(result.refreshToken).toBe('refresh-token');
    });
  });
});
