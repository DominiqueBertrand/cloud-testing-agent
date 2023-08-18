import { Test, TestingModule } from '@nestjs/testing';
import { PmReportController } from './pmReport.controller';
import { PmReportService } from './pmReport.service';
import { mockReport, mockReportService, newReport } from './report.service.mock';
// import { IPmReport } from './pmReport.type';
import { PmReport } from '@src/entities';
import { CreateOrUpdateReportDto } from './dto';
import { TestStatus } from './pmReport-status.enum';

describe('PmReportController', () => {
  let moduleRef: TestingModule;
  let pmReportController: PmReportController;
  let pmReportService: PmReportService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [PmReportController],
      providers: [
        {
          provide: PmReportService,
          useValue: mockReportService, // Provide a mock value or use jest.mock
        },
      ],
    }).compile();
    pmReportController = moduleRef.get<PmReportController>(PmReportController);
    pmReportService = moduleRef.get<PmReportService>(PmReportService);
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
  describe('create', () => {
    it('should return a new report"', async () => {
      mockReportService.create = jest.fn().mockResolvedValueOnce(mockReport);
      const result: PmReport = await pmReportController.create(newReport);
      expect(result).toEqual(mockReport);
    });
  });
  describe('findOne', () => {
    it('should return a report by id', async () => {
      const result: PmReport | null = await pmReportController.findOne(mockReport.id);
      expect(result).toEqual(mockReport);
    });
  });
  describe('update', () => {
    it('should return a report"', async () => {
      const updatedReport = {
        ...mockReport,
        status: TestStatus.SUCCESS,
      };
      const report = { ...newReport, status: TestStatus.SUCCESS };
      mockReportService.update = jest.fn().mockResolvedValueOnce(updatedReport);
      const result: PmReport = await pmReportController.update(mockReport.id, report as CreateOrUpdateReportDto);
      expect(pmReportService.update).toHaveBeenCalled();
      expect(result).toEqual(updatedReport);
    });
  });
  describe('delete', () => {
    it('should return a task by id', async () => {
      await pmReportController.delete(mockReport.id);
      expect(pmReportService.delete).toHaveBeenCalled();
      expect(204);
    });
  });
});
