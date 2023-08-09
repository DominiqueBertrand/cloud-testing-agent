import { isValidCron } from 'cron-validator';

export function checkCron(schedule: string): boolean {
  return isValidCron(schedule);
}
