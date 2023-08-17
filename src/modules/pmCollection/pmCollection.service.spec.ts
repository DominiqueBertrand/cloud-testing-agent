import { Test, TestingModule } from '@nestjs/testing';
import { PmCollectionService } from './pmCollection.service';
import { EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { PmCollection } from '@src/entities';

describe('PmEnvironmentService', () => {
  let moduleRef: TestingModule;
  let pmCollectionService: PmCollectionService;
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
          provide: getRepositoryToken(PmCollection),
          useFactory: jest.fn(() => ({
            findAll: jest.fn(),
            findOne: jest.fn(),
            persist: jest.fn(),
          })),
        },
        PmCollectionService,
      ],
    }).compile();

    pmCollectionService = moduleRef.get<PmCollectionService>(PmCollectionService);
    entityManagerMock = moduleRef.get(EntityManager);
  });

  it('should be defined', () => {
    expect(pmCollectionService).toBeDefined();
  });

  it('should be defined', () => {
    expect(entityManagerMock).toBeDefined();
  });

  describe('find', () => {
    it('should return an array"', async () => {
      const test: PmCollection[] = await pmCollectionService.findAll({
        limit: 20,
        offset: 0,
        orderBy: 'updatedAt',
      });
      expect(test).not.toEqual(null);
      expect(200);
    });
  });
  describe('create', () => {
    it('should return a collection"', async () => {
      expect(test).not.toEqual(null);
      expect(200);
    });
  });
});
