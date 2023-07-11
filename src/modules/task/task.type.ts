import { ICollection } from '@src/modules/pmCollection/pmCollection.type';
import { TaskStatus } from './task-status.enum';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { PmReport } from '@src/entities';

export interface ITask {
  id: string;
  ref?: string;
  createdAt: Date;
  updatedAt?: Date;
  collection: ICollection;
  status: TaskStatus;
  testStatus: TestStatus;
  report: PmReport;
}
