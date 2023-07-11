import { TestStatus } from './pmReport-status.enum';

export interface IPmReport {
  id: string;
  ref?: string;
  createdAt: Date;
  updatedAt?: Date;
  testStatus: TestStatus;
  report: object;
}
