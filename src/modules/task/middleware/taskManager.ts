import crypto from 'crypto';
import { setDate } from './setDate';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { TaskStatus } from '../task-status.enum';
import { Task } from '@src/entities';

function tasksInstancer(collection, environment, ref): Task {
  //   const testsList: Array<TaskStatus> = [];
  const id = crypto.randomUUID();
  const singleTask: Task = {
    id: id,
    createdAt: setDate(),
    updatedAt: setDate(),
    collection: collection,
    environment: environment,
    status: TaskStatus.OPEN,
    testStatus: TestStatus.RUNNING,
    report: {
      id: id,
      createdAt: setDate(),
      updatedAt: setDate(),
    },
  };
  console.log(ref);
  return singleTask;
}

export async function taskInit(collection, environment, ref): Promise<Task> {
  const testList: Task = tasksInstancer(collection, environment, ref);

  return testList;
}
