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
  // describe('find schedule by id', () => {
  //   it('should get a schedule"', async () => {
  //     const tests = await pmScheduleController.find({ limit: 20, offset: 0, orderBy: 'updatedAt' });
  //     expect(Array.isArray(tests)).toBe(true);
  //     if (tests) {
  //       scheduleId = tests[0].id;
  //       const test = await pmScheduleController.findOne(scheduleId);
  //       expect(test).not.toEqual(null);
  //     }
  //   });
  // });
  // describe('edit schedule by id', () => {
  //   it('should get a schedule"', async () => {
  //     const dto = new CreateOrUpdateScheduletDto();
  //     if (ScheduleId) {
  //       const test = await pmScheduleController.update(ScheduleId, dto);
  //       expect(test).not.toEqual(null);
  //     }
  //   });
  // });
  // describe('edit schedule by id', () => {
  //   it('should get a schedule"', async () => {
  //     if (ScheduleId) {
  //       await pmScheduleController.delete(ScheduleId);
  //       const test = await pmScheduleController.findOne(ScheduleId);
  //       expect(test).toEqual(null);
  //     }
  //   });
  // });
  // TODO: test every controllers
  // describe('create schedule', () => {
  //   it('should create a schedule"', async () => {
  //     let id: string;
  //     const task = await taskService.findAll({ limit: 10, offset: 0, orderBy: 'updatedAt' });
  //     if (task) {
  //       id = task[0].id;
  //       const mockCreateOrUpdateScheduleDto: CreateOrUpdateScheduletDto = {
  //         schedule: {
  //           cron: '*/5 * * * *',
  //           name: 'toto',
  //         },
  //         taskId: id,
  //       };
  //       const test = await pmScheduleController.create(mockCreateOrUpdateScheduleDto);
  //       expect(test).not.toEqual(null);
  //     }
  //   });
  // });
});
