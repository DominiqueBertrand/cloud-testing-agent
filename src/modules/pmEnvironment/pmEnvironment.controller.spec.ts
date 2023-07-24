import { Test, TestingModule } from '@nestjs/testing';
import { PmEnvironmentController } from './pmEnvironment.controller';
import { PmEnvironmentService } from './pmEnvironment.service';
import { ElementsQueryDto } from './dto';

describe('PmEnvironmentController', () => {
  let moduleRef: TestingModule;
  let pmEnvironmentController: PmEnvironmentController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [PmEnvironmentController],
      providers: [
        {
          provide: PmEnvironmentService,
          useValue: {
            create: jest.fn().mockImplementation((query: ElementsQueryDto) => Promise.resolve({ ...query })),
            findAll: jest.fn().mockResolvedValue([]),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();
    pmEnvironmentController = moduleRef.get(PmEnvironmentController);
  });

  it('should be defined', () => {
    expect(pmEnvironmentController).toBeDefined();
  });
  describe('find', () => {
    it('should return an array"', async () => {
      const test = await pmEnvironmentController.find({ limit: 20, offset: 0, orderBy: 'updatedAt' });
      expect(Array.isArray(test)).toBe(true);
    });
  });
  // TODO: test every controllers
});
