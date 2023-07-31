import { isValidCron } from 'cron-validator';

export function checkCron(schedule) {
  if (isValidCron(schedule.cron)) {
    console.log(schedule);
    return true;
  } else return 'no';
}
