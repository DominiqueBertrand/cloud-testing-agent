import { HttpException } from '@nestjs/common';

import { PmScheduleService } from './pmSchedule.service';

const checkCronMock = jest.fn();

jest.mock('./middleware/checkCron', () => ({
  checkCron: (...args: any[]) => checkCronMock(...args),
}));

describe('PmScheduleService', () => {
  const scheduleRepository = {
    findOne: jest.fn(),
    findAll: jest.fn(),
  };
  const taskRepository = {
    findOne: jest.fn(),
  };
  const em = {
    persist: jest.fn(),
    flush: jest.fn(),
  };

  const buildService = () => new PmScheduleService(scheduleRepository as any, taskRepository as any, em as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should throw when task is missing', async () => {
      const service = buildService();
      taskRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.create({ id: 'task-1', pSchedule: { cron: '* * * * *', name: 'job' } }),
      ).rejects.toBeInstanceOf(HttpException);
    });

    it('should throw when cron is invalid', async () => {
      const service = buildService();
      taskRepository.findOne.mockResolvedValueOnce({ id: 'task-1' });
      checkCronMock.mockReturnValueOnce(false);

      await expect(
        service.create({ id: 'task-1', pSchedule: { cron: '* * * * *', name: 'job' } }),
      ).rejects.toBeInstanceOf(HttpException);
    });

    it('should persist schedule when valid', async () => {
      const service = buildService();
      taskRepository.findOne.mockResolvedValueOnce({ id: 'task-1' });
      checkCronMock.mockReturnValueOnce(true);

      const result = await service.create({ id: 'task-1', pSchedule: { cron: '* * * * *', name: 'job' } });

      expect(em.persist).toHaveBeenCalledWith(result);
      expect(em.flush).toHaveBeenCalled();
      expect(result.task).toEqual({ id: 'task-1' });
    });
  });

  describe('update', () => {
    it('should throw when schedule is missing', async () => {
      const service = buildService();
      scheduleRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.update({ id: 'schedule-1', schedule: { cron: '* * * * *', name: 'job' } }),
      ).rejects.toBeInstanceOf(HttpException);
    });

    it('should throw when cron is invalid', async () => {
      const service = buildService();
      scheduleRepository.findOne.mockResolvedValueOnce({ id: 'schedule-1', cron: 'old', name: 'old' });
      checkCronMock.mockReturnValueOnce(false);

      await expect(
        service.update({ id: 'schedule-1', schedule: { cron: '* * * * *', name: 'job' } }),
      ).rejects.toBeInstanceOf(HttpException);
    });

    it('should update schedule fields when valid', async () => {
      const service = buildService();
      const schedule = { id: 'schedule-1', cron: 'old', name: 'old' };
      scheduleRepository.findOne.mockResolvedValueOnce(schedule);
      checkCronMock.mockReturnValueOnce(true);

      const result = await service.update({ id: 'schedule-1', schedule: { cron: '* * * * *', name: 'job' } });

      expect(result.cron).toBe('* * * * *');
      expect(result.name).toBe('job');
      expect(em.persist).toHaveBeenCalledWith(schedule);
      expect(em.flush).toHaveBeenCalled();
    });
  });
});
