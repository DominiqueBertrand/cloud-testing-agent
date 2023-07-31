export interface IPmSchedule {
  id: string;
  ref?: string;
  createdAt: Date;
  updatedAt?: Date;
  schedule: ISchedule;
}
export interface ISchedule {
  cron: string;
}
