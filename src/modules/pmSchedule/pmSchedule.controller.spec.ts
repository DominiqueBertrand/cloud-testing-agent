import { Test, TestingModule } from '@nestjs/testing';
import { PmScheduleController } from './pmSchedule.controller';
import { PmScheduleService } from './pmSchedule.service';
import { CreateOrUpdateScheduletDto } from './dto';

describe('PmReportController', () => {
  let moduleRef: TestingModule;
  let pmReportController: PmScheduleController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [PmScheduleController],
      providers: [
        {
          provide: PmScheduleService,
          useValue: {
            create: jest.fn().mockImplementation((query: CreateOrUpdateScheduletDto) => Promise.resolve({ ...query })),
            findAll: jest.fn().mockResolvedValue([]),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
    pmReportController = moduleRef.get(PmScheduleController);
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
