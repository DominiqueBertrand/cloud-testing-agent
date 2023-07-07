import { Status } from './postman.model';

type PostmanTest = object;

export { PostmanTest };

type TestList = {
  taskId: string;
  createdAt: string;
  modifiedAt: string;
  status: Status;
  collectionId: string;
  envId: string;
};
export { TestList };
