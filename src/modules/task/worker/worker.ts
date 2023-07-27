import { HttpException, HttpStatus } from '@nestjs/common';
// import { TestRunner } from '../middleware/testRunner';
// import { workerData } from 'worker_threads';
import { TaskStatus } from '../task-status.enum';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import axios from 'axios';
// import { PmReport } from '@src/entities';
// import { MessageChannel } from 'worker_threads';
// const { port1, port2 } = new MessageChannel();

async function updateTask(url: string, id: string, taskSatus, testStatus, report?) {
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

export async function taskWorker(task) {
  // const parseEnvironment = JSON.parse(task.environment);
  // const parseCollection = JSON.parse(task.collection);
  if (!task) {
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  } else {
    await updateTask('http://127.0.0.1:7000', task.id, TaskStatus.IN_PROGRESS, TestStatus.RUNNING);
    // taskService.update(task.collection, task.environment, TaskStatus.IN_PROGRESS, TestStatus.RUNNING);
    // const report = await TestRunner(task.collection, task.environment);
    // await updateTask('http://127.0.0.1:7000', task.id, TaskStatus.DONE, report.status, report);
    return task;
  }
}
// console.log(workerData);

module.exports = async workerData => {
  // Fake some async activity
  await taskWorker(workerData);
  return 'Worker launched';
};

// parentPort?.postMessage(taskWorker(workerData.value));
