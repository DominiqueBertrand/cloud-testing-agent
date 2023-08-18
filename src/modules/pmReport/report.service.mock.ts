import { CreateOrUpdateReportDto } from './dto';
import { TestStatus } from './pmReport-status.enum';

export const mockReport = {
  id: 'testid_0',
  collection: { id: 'test0collection' },
  environment: { id: 'test0environment' },
};

export const newReport: CreateOrUpdateReportDto = {
  report: {},
  status: TestStatus.PENDING,
  task: {},
};

export const mockReportService = {
  findAll: jest.fn().mockResolvedValueOnce([]),
  create: jest.fn(),
  findOne: jest.fn().mockResolvedValueOnce(mockReport),
  update: jest.fn(),
  delete: jest.fn(),
  // Define other methods used by the controller
};
