import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('TaskController', () => {
  let moduleRef: TestingModule;
  let authController: AuthController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            logout: jest.fn().mockImplementation(() => Promise.resolve([])),
            login: jest.fn().mockImplementation(() => Promise.resolve({})),
            refreshToken: jest.fn().mockImplementation(() => Promise.resolve({})),
            profile: jest.fn().mockImplementation(() => Promise.resolve([])),
            updateProfile: jest.fn().mockImplementation(() => Promise.resolve({})),
          },
        },
      ],
    }).compile();
    authController = moduleRef.get(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
  describe('logout', () => {
    it('should return an array"', async () => {
      const test = await authController.logout('xxx');
      expect(Array.isArray(test)).toBe(true);
    });
  });
  describe('login', () => {
    it('should return an array"', async () => {
      const test = await authController.login({
        username: 'test',
        password: 'test',
      });
      expect(test).not.toBeUndefined();
    });
  });
  describe('refresh', () => {
    it('should return an array"', async () => {
      const test = await authController.refresh({
        refreshToken: 'xxx',
      });
      expect(test).not.toBeUndefined();
    });
  });
  describe('profile', () => {
    it('should return an array"', async () => {
      const test = await authController.profile('xxx');
      expect(test).not.toBeUndefined();
    });
  });
  describe('updateProfile', () => {
    it('should return an array"', async () => {
      const test = await authController.updateProfile('xxx', {});
      expect(test).not.toBeUndefined();
    });
  });
});
