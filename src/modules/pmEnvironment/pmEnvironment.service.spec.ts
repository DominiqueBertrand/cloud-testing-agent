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
});
