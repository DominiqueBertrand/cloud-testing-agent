import { isValidCron } from 'cron-validator';

export function checkCron(schedule) {
  if (isValidCron(schedule.cron)) {
    return true;
  } else return 'no';
}
