import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PmEnvironmentService } from './pmEnvironment.service';
import { EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { PmEnvironment } from '@src/entities';

describe('PmEnvironmentService', () => {
  let moduleRef: TestingModule;
  let pmEnvironmentService: PmEnvironmentService;
  let entityManagerMock: EntityManager;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: EntityManager,
          useFactory: jest.fn(() => ({
            flush: jest.fn(),
          })),
        },
        {
          provide: getRepositoryToken(PmEnvironment),
          useFactory: jest.fn(() => ({
            findAll: jest.fn(),
            findOne: jest.fn(),
            persist: jest.fn(),
          })),
        },
        PmEnvironmentService,
      ],
    }).compile();

    pmEnvironmentService = moduleRef.get<PmEnvironmentService>(PmEnvironmentService);
    entityManagerMock = moduleRef.get(EntityManager);
  });

  it('should be defined', () => {
    expect(pmEnvironmentService).toBeDefined();
  });

  it('should be defined', () => {
    expect(entityManagerMock).toBeDefined();
  });

  describe('update', () => {
    it('should throw when environment id mismatch', async () => {
      (entityManagerMock as any).findOneOrFail = jest.fn().mockResolvedValueOnce({ id: 'env-1', name: 'old' });
      (entityManagerMock as any).assign = jest.fn();

      await expect(
        pmEnvironmentService.update({
          id: 'env-1',
          environment: { id: 'env-2', name: 'new', values: [] },
        }),
      ).rejects.toBeInstanceOf(HttpException);
    });

    it('should assign updated environment', async () => {
      const stored = { id: 'env-1', name: 'old' };
      (entityManagerMock as any).findOneOrFail = jest.fn().mockResolvedValueOnce(stored);
      (entityManagerMock as any).assign = jest.fn();
      (entityManagerMock as any).flush = jest.fn();

      const result = await pmEnvironmentService.update({
        id: 'env-1',
        environment: { id: 'env-1', name: 'new', values: [] },
      });

      expect((entityManagerMock as any).assign).toHaveBeenCalledWith(
        stored,
        { environment: { id: 'env-1', name: 'new', values: [] }, name: 'new' },
        { mergeObjects: true, convertCustomTypes: true },
      );
      expect((entityManagerMock as any).flush).toHaveBeenCalled();
      expect(result).toEqual(stored);
    });
  });
});
