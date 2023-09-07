import { TestStatus } from '../pmReport/pmReport-status.enum';
import { CreateOrUpdateElementDto, FindAllElementsQueryDto } from './dto';
import { TaskStatus, TaskType } from './task-status.enum';

export const mockTask = {
  id: 'testid_0',
  collection: { id: 'test0collection' },
  environment: { id: 'test0environment' },
  type: TaskType.ONESHOT,
  status: TaskStatus.IN_PROGRESS,
  testStatus: TestStatus.PENDING,
};

export const schedule = {
  id: 'test00schedule',
};

export const mockTaskrun = {
  id: 'testid_0',
  collection: { id: 'test0collection' },
  environment: { id: 'test0environment' },
  type: TaskType.ONESHOT,
  status: TaskStatus.IN_PROGRESS,
  testStatus: TestStatus.PENDING,
};

export const newTask: CreateOrUpdateElementDto = {
  collection: {
    id: 'test0collect',
  },
  environment: {
    id: 'test0env',
  },
  ref: '',
};
export const queryFindAll: FindAllElementsQueryDto = {
  limit: 20,
  offset: 0,
  orderBy: 'updatedAt',
};

export const mock = {
  findAll: jest.fn().mockResolvedValueOnce([]),
  // Define other methods used by the controller
};

export const mockTaskService = {
  //   findAll: jest.fn().mockImplementation(queryFindAll => {
  //     if (queryFindAll === queryFindAll) {
  //       promises.resolve('');
  //     } else {
  //       promises.resolve('bad query request');
  //     }
  //   }),
  findAll: jest.fn().mockResolvedValueOnce([]),
  create: jest.fn(),
  findOne: jest.fn().mockResolvedValueOnce(mockTask),
  update: jest.fn(),
  delete: jest.fn(),
  run: jest.fn().mockResolvedValueOnce(mockTask),
  runBatch: jest.fn().mockResolvedValueOnce([mockTask, mockTask]),
  runSchedule: jest.fn(),
  getRunningSchedules: jest.fn().mockResolvedValueOnce([]),
  stopSchedule: jest.fn(),
  // Define other methods used by the controller
};
