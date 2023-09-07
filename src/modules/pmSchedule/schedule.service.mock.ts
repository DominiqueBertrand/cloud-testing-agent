import { CreateOrUpdateScheduletDto } from './dto';

export const mockSchedule = {
  id: '1b4207b0-5144-477b-a802-2eda16dabbe1',
  createdAt: '2023-08-18T14:46:34.952Z',
  updatedAt: '2023-08-18T14:46:34.952Z',
  cron: '* * * * *',
  name: 'byte',
  task: {
    id: '7d339528-a350-4f39-8012-afcfba91ecf8',
    createdAt: '2023-08-18T14:46:32.050Z',
    updatedAt: '2023-08-18T14:46:32.050Z',
    collection: 'f91934f-4771-4afdb2e2-d291b47527b5',
    environment: '8f3277a9-c7ba-4316-b13-3e05a270e48',
    schedule: null,
    options: null,
    status: 'OPEN',
    testStatus: 'PENDING',
    type: 'ONESHOT',
  },
};

export const newSchedule: CreateOrUpdateScheduletDto = {
  schedule: {
    cron: '* * * * *',
    name: 'byte',
  },
  taskId: 'taskId0',
};

export const mockScheduleService = {
  findAll: jest.fn().mockResolvedValueOnce([]),
  create: jest.fn(),
  findOne: jest.fn().mockResolvedValueOnce(mockSchedule),
  update: jest.fn(),
  delete: jest.fn(),
  // Define other methods used by the controller
};
