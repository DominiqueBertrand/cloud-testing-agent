import { Test, TestingModule } from '@nestjs/testing';
import { PmScheduleController } from './pmSchedule.controller';
import { PmScheduleService } from './pmSchedule.service';
import { CreateOrUpdateScheduletDto } from './dto';

describe('PmReportController', () => {
  let moduleRef: TestingModule;
  let pmScheduleController: PmScheduleController;

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
    pmScheduleController = moduleRef.get(PmScheduleController);
  });

  it('should be defined', () => {
    expect(pmScheduleController).toBeDefined();
  });
  describe('find all schedules', () => {
    it('should return an array"', async () => {
      const test = await pmScheduleController.find({ limit: 20, offset: 0, orderBy: 'updatedAt' });
      expect(Array.isArray(test)).toBe(true);
    });
  });
});
