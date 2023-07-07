import { Status } from '../postman.model';
import { TestRunner } from './newmanRunner';
import crypto from 'crypto';
import { setDate } from '../widgets/setDate';
import { getCollection, getEnv } from '../widgets/collectionParserById';
import { TestList } from '../postman.types';
// import * as fs from 'fs';

function tasksInstancer(test: object, env_id: string) {
  const testsList: Array<TestList> = [];

  for (let i = 0; i < Object.keys(test).length; i++) {
    const singleTask: TestList = {
      taskId: crypto.randomUUID(),
      createdAt: setDate(),
      modifiedAt: setDate(),
      status: Status.created,
      collectionId: test[i].id_collection,
      envId: env_id,
    };
    testsList.push(singleTask);
  }
  return testsList;
}

async function runTask(taskData: TestList): Promise<TestList> {
  const collectionJSON: object = getCollection(taskData.collectionId);
  const enironmentJSON: object = getEnv(taskData.envId);

  taskData.modifiedAt = setDate();
  taskData.status = Status.running;
  await TestRunner.newmanRunner(collectionJSON[0], enironmentJSON);
  taskData.modifiedAt = setDate();
  taskData.status = Status.finished;

  return taskData;
}

export async function testLauncher(env_id: string, test: object): Promise<object> {
  const testList: Array<TestList> = tasksInstancer(test, env_id);
  testList.forEach(function (value: TestList) {
    runTask(value);
  });

  return testList;
}
