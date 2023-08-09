import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CreateOrUpdateElementDto } from './dto';
// import { PmCollection, PmEnvironment, Task } from '@src/entities';
// import { IEnvironment } from '../pmEnvironment/pmEnvironment.type';
// import { Collection } from '@mikro-orm/core';

describe('TaskController', () => {
  let moduleRef: TestingModule;
  let taskController: TaskController;
  // let taskId: string;

  // const iEnvironment : IEnvironment = {

  //   id: '8202f7a9-c7ba-4316-b333-3e015a270e48',
  //   name: 'test',
  //   values: [
  //     {
  //       key: 'url',
  //       value: 'https://test.com',
  //       type: 'default',
  //       enabled: true,
  //     },
  //     {
  //       key: 'login',
  //       value: 'test@test.fr',
  //       type: 'default',
  //       enabled: true,
  //     },
  //     {
  //       key: 'password',
  //       value: 'password',
  //       type: 'default',
  //       enabled: true,
  //     },
  //   ],
  // }

  // const pmCollection: PmCollection = {
  //   collection: {
  //     collection: {
  //       info: {
  //         _postman_id: 'f919110f-0000-0000-0000-d291b47527b5',
  //         name: 'TEST',
  //         schema: 'https://schema.com/collection.json',
  //         _exporter_id: '00000000',
  //       },
  //       event: [
  //         {
  //           listen: 'prerequest',
  //           script: {
  //             type: 'text/javascript',
  //             exec: [''],
  //           },
  //         },
  //         {
  //           listen: 'test',
  //           script: {
  //             type: 'text/javascript',
  //             exec: [''],
  //           },
  //         },
  //       ],
  //       variable: [
  //         {
  //           key: 'variable',
  //           value: 'value',
  //           type: 'string',
  //         },
  //       ],
  //     },
  //   },
  //   ref: '',
  // };
  // const pmEnvironment : PmEnvironment= new PmEnvironment(
  //     id: '8202f7a9-c7ba-4316-b333-3e015a270e48',
  //     environment: iEnvironment,
  //     name = "toto",
  // )
  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            create: jest.fn().mockImplementation((task: CreateOrUpdateElementDto) => Promise.resolve({ ...task })),
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
  // describe('create', () => {
  //   it('should return an array"', async () => {
  //     try {
  //       const test: Task = new Task(collection : pmCollection, environment: mockTask.environment);
  //       console.log('test : ', test);
  //       taskId = test.id;
  //     } catch {
  //       console.error();
  //     }
  //     expect(test).not.toEqual(null);
  //   });
  // });
  // TODO: test every controllers
});
