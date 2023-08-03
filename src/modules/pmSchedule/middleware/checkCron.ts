import { isValidCron } from 'cron-validator';
import { Schedule } from '../pmSchedule.type';

export function checkCron(schedule: Schedule): boolean {
  return isValidCron(schedule.cron);
}
