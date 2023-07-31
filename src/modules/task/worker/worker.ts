import { HttpException, HttpStatus } from '@nestjs/common';
import { TestRunner } from '../middleware/testRunner';
import { TaskStatus } from '../task-status.enum';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { PmReport, Task } from '@src/entities';
import axios from 'axios';

async function updateTask(url: string, id: string, taskSatus?: TaskStatus, testStatus?: TestStatus, report?: PmReport) {
  await axios({
    url: url + '/task/' + id + '/actions/report',
    method: 'PUT',
    data: {
      status: taskSatus,
      testStatus: testStatus,
      report: report,
    },
  })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

export async function taskWorker(task: Task): Promise<object> {
  if (!task) {
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  } else {
    await updateTask('http://127.0.0.1:7000', task.id, TaskStatus.IN_PROGRESS, TestStatus.RUNNING);
    const report = await TestRunner(task.collection, task.environment);
    await updateTask('http://127.0.0.1:7000', task.id, TaskStatus.DONE, report.status, report);

    return task;
  }
}
// console.log(workerData);

module.exports = async (workerData: Task) => {
  return await taskWorker(workerData);
};
