import { Test, TestingModule } from '@nestjs/testing';
import { PmEnvironmentController } from './pmEnvironment.controller';
import { PmEnvironmentService } from './pmEnvironment.service';
import { CreateOrUpdateEnvironmentDto } from './dto';
import { PmEnvironment } from '@src/entities';

describe('PmEnvironmentController', () => {
  let moduleRef: TestingModule;
  let pmEnvironmentController: PmEnvironmentController;
  let envId: string;
  const mockEnvironment: CreateOrUpdateEnvironmentDto = {
    environment: {
      id: '8202f7a9-c7ba-4316-b333-3e015a270e48',
      name: 'test',
      values: [
        {
          key: 'url',
          value: 'https://test.com',
          type: 'default',
          enabled: true,
        },
        {
          key: 'login',
          value: 'test@test.fr',
          type: 'default',
          enabled: true,
        },
        {
          key: 'password',
          value: 'password',
          type: 'default',
          enabled: true,
        },
      ],
    },
    ref: '',
  };

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [PmEnvironmentController],
      providers: [
        {
          provide: PmEnvironmentService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((environment: CreateOrUpdateEnvironmentDto) => Promise.resolve({ ...environment })),
            findAll: jest.fn().mockResolvedValue([mockEnvironment]),
            findOne: jest.fn().mockResolvedValue(mockEnvironment),
            update: jest.fn().mockResolvedValue(mockEnvironment),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
    pmEnvironmentController = moduleRef.get(PmEnvironmentController);
  });

  it('should be defined', () => {
    expect(pmEnvironmentController).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array"', async () => {
      const test: PmEnvironment[] = await pmEnvironmentController.find({
        limit: 20,
        offset: 0,
        orderBy: 'updatedAt',
      });
      expect(test).toEqual(expect.objectContaining([mockEnvironment]));
      expect(Array.isArray(test)).toBe(true);
    });
  });

  describe('create', () => {
    it('should return an array"', async () => {
      const test: PmEnvironment = await pmEnvironmentController.create(mockEnvironment);
      expect(test).toEqual(expect.objectContaining(mockEnvironment));
      expect(test).not.toEqual(null);

      if (test) {
        envId = test.id;
      }
    });
  });
  describe('findOne', () => {
    it('should return an environment"', async () => {
      const test: PmEnvironment = await pmEnvironmentController.findOne(envId);
      expect(test).toEqual(expect.objectContaining(mockEnvironment));
      expect(test).not.toEqual(null);
    });
  });
  describe('update', () => {
    it('should return an environment"', async () => {
      const test: PmEnvironment = await pmEnvironmentController.update(envId, mockEnvironment);
      expect(test).toEqual(expect.objectContaining(mockEnvironment));
      expect(test).not.toEqual(null);
    });
  });

  describe('delete', () => {
    it('should return an message"', async () => {
      const test: void = await pmEnvironmentController.delete(envId);
      expect(test).not.toEqual(null);
      expect(204);
    });
  });
});
