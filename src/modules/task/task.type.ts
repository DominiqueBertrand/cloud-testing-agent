import { TaskStatus, TaskType } from './task-status.enum';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { PmCollection, PmEnvironment, PmReport, PmSchedule } from '@src/entities';
import { Collection, Ref } from '@mikro-orm/core';
import { IPmCollection } from '../pmCollection/pmCollection.type';
import { IPmEnvironment } from '../pmEnvironment/pmEnvironment.type';
import { IPmSchedule } from '../pmSchedule/pmSchedule.type';
import { IPmReport } from '../pmReport/pmReport.type';

export interface ITask {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  collection?: Ref<PmCollection> | IPmCollection;
  environment?: Ref<PmEnvironment> | IPmEnvironment;
  reports: Collection<PmReport> | IPmReport[];
  schedule?: PmSchedule | IPmSchedule;
  options?: object;
  status?: TaskStatus;
  testStatus?: TestStatus;
  type?: TaskType;
}

export interface IRunningSchedule {
  key: string;
  cron: string;
  nextTest?: string;
  lastTest?: string;
}
