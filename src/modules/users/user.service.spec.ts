import { HttpException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { Test, TestingModule } from '@nestjs/testing';

import * as userUtils from './user.utils';
import { UserService } from './user.service';
import { User } from '@src/entities';

describe('UserService', () => {
  let service: UserService;
  let repository: { findOne: jest.Mock };
  let em: EntityManager;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: EntityManager,
          useValue: {
            persist: jest.fn(),
            flush: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
    repository = moduleRef.get(getRepositoryToken(User));
    em = moduleRef.get(EntityManager);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('updateUser', () => {
    it('should hash password before saving', async () => {
      const user = { id: 'user-1', password: 'old' } as User;
      repository.findOne.mockResolvedValueOnce(user);
      const hashSpy = jest.spyOn(userUtils, 'hashPassword').mockResolvedValueOnce('hashed');

      const result = await service.updateUser('user-1', { password: 'new' });

      expect(hashSpy).toHaveBeenCalledWith('new');
      expect(result.password).toBeUndefined();
      expect(user.password).toBe('hashed');
      expect(em.persist).toHaveBeenCalledWith(user);
      expect(em.flush).toHaveBeenCalled();
    });

    it('should throw when password is missing', async () => {
      const user = { id: 'user-1', password: 'old' } as User;
      repository.findOne.mockResolvedValueOnce(user);

      await expect(service.updateUser('user-1', {})).rejects.toBeInstanceOf(HttpException);
    });
  });
});
