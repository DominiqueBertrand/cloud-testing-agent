export interface IPmSchedule {
  id: string;
  ref?: string;
  createdAt: Date;
  updatedAt?: Date;
  schedule: Schedule;
}
export class Schedule {
  cron: string;
  name: string;

  constructor(cron: string, name: string) {
    this.cron = cron;
    this.name = name;
  }
}
