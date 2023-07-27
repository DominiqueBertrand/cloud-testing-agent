import { ICollection } from '@src/modules/pmCollection/pmCollection.type';
import { TaskStatus, TaskType } from './task-status.enum';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { PmReport } from '@src/entities';
import { IEnvironment } from '../pmEnvironment/pmEnvironment.type';

export interface ITask {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  collection: ICollection;
  environment: IEnvironment;
  status: TaskStatus;
  testStatus: TestStatus;
  type: TaskType;
  reports: PmReport[];
}

// export enum Status {
//   created,
//   failed,
//   aborded,
//   running,
//   finished,
// }

// type PostmanTest = object;

// export { PostmanTest };

// type TaskStatus = {
//   id: string;
//   createdAt: string;
//   modifiedAt: string;
//   status: Status;
//   collectionId: string;
//   // envId: string;
// };
// export { TaskStatus };
