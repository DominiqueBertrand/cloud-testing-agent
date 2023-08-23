import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { mockTask, mockTaskService, mockTaskrun, newTask, queryFindAll, schedule } from './task.service.mock';
import { CreateOrUpdateElementDto } from './dto/create-or-update-element.dto';
import { TaskStatus, TaskType } from './task-status.enum';
import { TestStatus } from '../pmReport/pmReport-status.enum';
import { IRunningSchedule, ITask } from './task.type';
import { Task } from '@src/entities';
import { RunBatch } from './dto';

describe('TaskController', () => {
  let moduleRef: TestingModule;
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService, // Provide a mock value or use jest.mock
        },
        // Other dependencies
      ],
    }).compile();
    taskController = moduleRef.get<TaskController>(TaskController);
    taskService = moduleRef.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  describe('find', () => {
    it('should return an array"', async () => {
      const test: Task[] = await taskController.find(queryFindAll);
      expect(taskService.findAll).toHaveBeenCalled();

      expect(test).toEqual([]);
    });
  });
  describe('create', () => {
    it('should return a task"', async () => {
      mockTaskService.create = jest.fn().mockResolvedValueOnce(mockTask);
      const result: ITask = await taskController.create(newTask);
      expect(taskService.create).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });
  });
  describe('findOne', () => {
    it('should return a task by id', async () => {
      const result: Task | null = await taskController.findOne(mockTask.id);
      expect(taskService.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockTask);
    });
  });
  describe('update', () => {
    it('should return a task updated', async () => {
      const updatedTask = {
        ...mockTask,
        type: TaskType.ONESHOT,
        status: TaskStatus.DONE,
        testStatus: TestStatus.SUCCESS,
      };
      const task = { ...newTask, type: TaskType.ONESHOT, status: TaskStatus.DONE, testStatus: TestStatus.SUCCESS };
      mockTaskService.update = jest.fn().mockResolvedValueOnce(updatedTask);
      const result: ITask = await taskController.update(mockTask.id, task as CreateOrUpdateElementDto);
      expect(taskService.update).toHaveBeenCalled();
      expect(result).toEqual(updatedTask);
    });
  });
  describe('delete', () => {
    it('should return a task by id', async () => {
      await taskController.delete(mockTask.id);
      expect(taskService.delete).toHaveBeenCalled();
      expect(204);
    });
  });
  describe('run task', () => {
    it('should return a task', async () => {
      const result: ITask = await taskController.createTest(mockTask.id);
      expect(taskService.run).toHaveBeenCalled();
      expect(result).toEqual(mockTaskrun);
    });
  });
  describe('run task batch', () => {
    it('should return tasks', async () => {
      const runBatch: RunBatch = { tasks: [mockTask.id, mockTask.id] };
      const result: Array<object> = await taskController.createTestBatch(runBatch);
      expect(taskService.runBatch).toHaveBeenCalled();
      expect(result).toEqual([mockTask, mockTask]);
    });
  });
  describe('run task schedule', () => {
    it('should return tasks', async () => {
      await taskController.createScheduledTask(schedule.id);
      expect(taskService.runSchedule).toHaveBeenCalled();
    });
  });
  describe('get running schedules', () => {
    it('should return tasks', async () => {
      const test: IRunningSchedule[] = await taskController.getSchedules();
      expect(taskService.getRunningSchedules).toHaveBeenCalled();
      expect(test).toEqual([]);
    });
  });
  describe('delete running schedules', () => {
    it('should return tasks', async () => {
      await taskController.stopScheduleTask(schedule.id);
      expect(taskService.stopSchedule).toHaveBeenCalled();
      expect(204);
    });
  });
  // TODO: test every controllers
});
