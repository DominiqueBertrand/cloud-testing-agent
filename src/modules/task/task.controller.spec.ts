import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateOrUpdateElementDto } from './dto';

describe('TaskController', () => {
  let moduleRef: TestingModule;
  let taskController: TaskController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            create: jest.fn().mockImplementation((query: CreateOrUpdateElementDto) => Promise.resolve({ ...query })),
            findAll: jest.fn().mockResolvedValue([]),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
    taskController = moduleRef.get(TaskController);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });
  describe('find', () => {
    it('should return an array"', async () => {
      const test = await taskController.find({ limit: 20, offset: 0, orderBy: 'updatedAt' });
      expect(Array.isArray(test)).toBe(true);
    });
  });
  // TODO: test every controllers
});
