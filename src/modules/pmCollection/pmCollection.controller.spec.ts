import { Test, TestingModule } from '@nestjs/testing';
import { PmCollectionController } from './pmCollection.controller';
import { PmCollectionService } from './pmCollection.service';
import { ElementsQueryDto } from './dto';

describe('PmEnvironmentController', () => {
  let moduleRef: TestingModule;
  let pmEnvironmentController: PmCollectionController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [PmCollectionController],
      providers: [
        {
          provide: PmCollectionService,
          useValue: {
            create: jest.fn().mockImplementation((query: ElementsQueryDto) => Promise.resolve({ ...query })),
            findAll: jest.fn().mockResolvedValue([]),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();
    pmEnvironmentController = moduleRef.get(PmCollectionController);
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
