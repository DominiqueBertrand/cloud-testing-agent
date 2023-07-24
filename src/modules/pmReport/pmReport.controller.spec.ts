import { Test, TestingModule } from '@nestjs/testing';
import { PmReportController } from './pmReport.controller';
import { PmReportService } from './pmReport.service';
import { CreateOrUpdateReportDto } from './dto';

describe('PmReportController', () => {
  let moduleRef: TestingModule;
  let pmReportController: PmReportController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [PmReportController],
      providers: [
        {
          provide: PmReportService,
          useValue: {
            create: jest.fn().mockImplementation((query: CreateOrUpdateReportDto) => Promise.resolve({ ...query })),
            findAll: jest.fn().mockResolvedValue([]),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
    pmReportController = moduleRef.get(PmReportController);
  });

  it('should be defined', () => {
    expect(pmReportController).toBeDefined();
  });
  describe('find', () => {
    it('should return an array"', async () => {
      const test = await pmReportController.find({ limit: 20, offset: 0, orderBy: 'updatedAt' });
      expect(Array.isArray(test)).toBe(true);
    });
  });
  // TODO: test every controllers
});
