import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('TaskController', () => {
  let moduleRef: TestingModule;
  let taskController: UserController;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAllUsers: jest.fn().mockImplementation(() => Promise.resolve([])),
            getUserById: jest.fn().mockResolvedValue([]),
            getUserByUsername: jest.fn().mockResolvedValue([]),
            createUser: jest.fn().mockResolvedValue([]),
            removeUser: jest.fn().mockResolvedValue([]),
            updateUser: jest.fn(),
          },
        },
      ],
    }).compile();
    taskController = moduleRef.get(UserController);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });
  describe('getUsers', () => {
    it('should return an array"', async () => {
      const test = await taskController.getUsers({ limit: 20, offset: 0, orderBy: 'updatedAt' });
      expect(Array.isArray(test)).toBe(true);
    });
  });
  // TODO: test every controllers
});
