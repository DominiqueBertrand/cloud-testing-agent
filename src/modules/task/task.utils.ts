import { Task } from '@src/entities';
import { ITask } from './task.type';
import { IPmCollection } from '../pmCollection/pmCollection.type';
import { IPmEnvironment } from '../pmEnvironment/pmEnvironment.type';

export const sanitizeTask = (task: Task): ITask => {
  if (!task?.environment?.id || !task?.collection?.id) {
    return task;
  } else {
    const collection: IPmCollection = {
      id: task?.collection?.id,
    };
    const environment: IPmEnvironment = {
      id: task?.environment?.id,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ['collection']: _, ['environment']: __, ...rest } = task;
    const newTask: ITask = { ...rest, collection, environment };

    return newTask;
  }
};
