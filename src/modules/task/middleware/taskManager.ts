import { Task } from '@src/entities';

export async function taskInit(collection, environment): Promise<Task> {
  const testList: Task = new Task(collection, environment);

  return testList;
}
