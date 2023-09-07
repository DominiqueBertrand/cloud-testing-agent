import { Test, TestingModule } from '@nestjs/testing';
import { PmScheduleController } from './pmSchedule.controller';
import { PmScheduleService } from './pmSchedule.service';
import { mockSchedule, mockScheduleService, newSchedule } from './schedule.service.mock';
import { PmSchedule } from '@src/entities';

describe('PmReportController', () => {
  let moduleRef: TestingModule;
  let pmScheduleController: PmScheduleController;
  let pmScheduleService: PmScheduleService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [PmScheduleController],
      providers: [
        {
          provide: PmScheduleService,
          useValue: mockScheduleService, // Provide a mock value or use jest.mock
        },
      ],
    }).compile();
    pmScheduleController = moduleRef.get<PmScheduleController>(PmScheduleController);
    pmScheduleService = moduleRef.get<PmScheduleService>(PmScheduleService);
  });

  it('should be defined', () => {
    expect(pmScheduleController).toBeDefined();
  });
  describe('find', () => {
    it('should return an array"', async () => {
      const test = await pmScheduleController.find({ limit: 20, offset: 0, orderBy: 'updatedAt' });
      expect(Array.isArray(test)).toBe(true);
      expect(pmScheduleService.findAll).toHaveBeenCalled();
    });
  });
  describe('create', () => {
    it('should return a new report"', async () => {
      mockScheduleService.create = jest.fn().mockResolvedValueOnce(mockSchedule);
      const result: PmSchedule = await pmScheduleController.create(newSchedule);
      expect(result).toEqual(mockSchedule);
    });
  });
  describe('findOne', () => {
    it('should return a report by id', async () => {
      const result: PmSchedule | null = await pmScheduleController.findOne(mockSchedule.id);
      expect(result).toEqual(mockSchedule);
    });
  });
  describe('delete', () => {
    it('should return a task by id', async () => {
      await pmScheduleController.delete(mockSchedule.id);
      expect(pmScheduleService.delete).toHaveBeenCalled();
      expect(204);
    });
  });
});
