import { Test, TestingModule } from '@nestjs/testing';
import { PmEnvironmentController } from './pmEnvironment.controller';
import { PmEnvironmentService } from './pmEnvironment.service';
import { CreateOrUpdateEnvironmentDto, ElementsQueryDto } from './dto';

describe('PmEnvironmentController', () => {
  let moduleRef: TestingModule;
  let pmEnvironmentController: PmEnvironmentController;
  let envId: string;
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [PmEnvironmentController],
      providers: [
        {
          provide: PmEnvironmentService,
          useValue: {
            create: jest.fn().mockImplementation((query: ElementsQueryDto) => Promise.resolve({ ...query })),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(''),
            update: jest.fn().mockResolvedValue(CreateOrUpdateEnvironmentDto),
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
      const test = await pmEnvironmentController.find({ limit: 20, offset: 0, orderBy: 'updatedAt' });
      expect(Array.isArray(test)).toBe(true);
    });
  });

  describe('create', () => {
    it('should return an array"', async () => {
      const mock: CreateOrUpdateEnvironmentDto = {
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
      const test = await pmEnvironmentController.create(mock);
      expect(test).not.toEqual(null);

      if (test) {
        envId = test.id;
      }
    });
  });
  describe('findOne', () => {
    it('should return an environment"', async () => {
      const test = await pmEnvironmentController.findOne(envId);
      expect(test).not.toEqual(null);
    });
  });
  describe('update', () => {
    it('should return an environment"', async () => {
      const mock: CreateOrUpdateEnvironmentDto = {
        environment: {
          id: '8f3277a9-c7la-4326-b333-3e015a270e48',
          name: 'test update',
          values: [
            {
              key: 'url',
              value: 'https://test.com',
              type: 'default',
              enabled: true,
            },
            {
              key: 'login',
              value: 'test.update@test.fr',
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
      const test = await pmEnvironmentController.update(envId, mock);
      expect(test).not.toEqual(null);
    });
  });

  describe('delete', () => {
    it('should return an message"', async () => {
      const test = await pmEnvironmentController.delete(envId);
      expect(test).not.toEqual(null);
    });
  });
});
