import { ICollection } from '@src/modules/pmCollection/pmCollection.type';

export interface ITask {
  id: string;
  ref?: string;
  createdAt: Date;
  updatedAt?: Date;
  collection: ICollection;
}
