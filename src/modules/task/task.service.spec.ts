import { DateTime } from 'luxon';

import { TaskService } from './task.service';

describe('TaskService', () => {
  it('should map running schedules to dates', async () => {
    TaskService.pool = { run: jest.fn() } as any;

    const schedulerRegistry = {
      getCronJobs: jest.fn().mockReturnValue(
        new Map([
          [
            'job-1',
            {
              lastDate: () => new Date('2020-01-01T00:00:00Z'),
              nextDate: () => DateTime.fromISO('2020-01-02T00:00:00Z'),
            },
          ],
        ]),
      ),
    };

    const service = new TaskService(
      { findOne: jest.fn(), findAll: jest.fn() } as any,
      {} as any,
      {} as any,
      {} as any,
      { flush: jest.fn(), persist: jest.fn() } as any,
      schedulerRegistry as any,
    );

    const result = await service.getRunningSchedules();

    expect(result).toHaveLength(1);
    expect(result[0].key).toBe('job-1');
    expect(result[0].lastTest).toBeInstanceOf(Date);
    expect(result[0].nextTest).toBeInstanceOf(Date);
  });
});
