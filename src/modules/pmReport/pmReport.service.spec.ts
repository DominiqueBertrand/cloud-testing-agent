import { HttpException } from '@nestjs/common';

import { PmReportService } from './pmReport.service';
import { TestStatus } from './pmReport-status.enum';

// var avoids TDZ with jest.mock hoisting
var wrapMock: jest.Mock;
var assignMock: jest.Mock;

jest.mock('@mikro-orm/core', () => {
  const actual = jest.requireActual('@mikro-orm/core');
  assignMock = jest.fn();
  wrapMock = jest.fn(() => ({ assign: assignMock }));
  return { ...actual, wrap: wrapMock };
});

describe('PmReportService', () => {
  const reportRepository = {
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

  const buildService = () => new PmReportService(reportRepository as any, taskRepository as any, em as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should throw when task is missing', async () => {
      const service = buildService();

      await expect(service.create({ report: {}, status: TestStatus.PENDING, task: undefined })).rejects.toBeInstanceOf(
        HttpException,
      );
    });

    it('should throw when task is not found', async () => {
      const service = buildService();
      taskRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.create({ report: {}, status: TestStatus.PENDING, task: { id: 'task-1' } }),
      ).rejects.toBeInstanceOf(HttpException);
    });

    it('should persist report when task exists', async () => {
      const service = buildService();
      taskRepository.findOne.mockResolvedValueOnce({ id: 'task-1' });

      const result = await service.create({ report: { ok: true }, status: TestStatus.SUCCESS, task: 'task-1' });

      expect(em.persist).toHaveBeenCalledWith(result);
      expect(em.flush).toHaveBeenCalled();
      expect(result.task).toEqual({ id: 'task-1' });
    });
  });

  describe('update', () => {
    it('should throw when report is not found', async () => {
      const service = buildService();
      reportRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        service.update({ id: 'report-1', report: {}, status: TestStatus.SUCCESS, task: undefined }),
      ).rejects.toBeInstanceOf(HttpException);
    });

    it('should throw when report id mismatch', async () => {
      const service = buildService();
      reportRepository.findOne.mockResolvedValueOnce({ id: 'report-1', report: {}, status: TestStatus.PENDING });

      await expect(
        service.update({ id: 'report-1', report: { id: 'report-2' }, status: TestStatus.SUCCESS, task: undefined }),
      ).rejects.toBeInstanceOf(HttpException);
    });

    it('should assign updated report fields', async () => {
      const service = buildService();
      reportRepository.findOne.mockResolvedValueOnce({ id: 'report-1', report: {}, status: TestStatus.PENDING });

      const result = await service.update({
        id: 'report-1',
        report: { ok: true },
        status: TestStatus.SUCCESS,
        task: undefined,
      });

      expect(wrapMock).toHaveBeenCalledWith(result);
      expect(assignMock).toHaveBeenCalledWith(
        expect.objectContaining({
          report: { ok: true },
          status: TestStatus.SUCCESS,
        }),
      );
      expect(em.flush).toHaveBeenCalled();
    });
  });
});
