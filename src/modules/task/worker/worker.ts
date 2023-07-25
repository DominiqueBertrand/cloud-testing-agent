import { HttpException, HttpStatus } from '@nestjs/common';
import { TestRunner } from '../middleware/testRunner';
// import { workerData } from 'worker_threads';
import { TaskStatus } from '../task-status.enum';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import axios from 'axios';

async function updateTask(url, id, parseEnvironment, parseCollection, taskSatus, testStatus, report?) {
  await axios({
    url: url + '/task/' + id,
    method: 'PUT',
    data: {
      collection: {
        id: parseCollection.info._postman_id,
      },
      environment: {
        id: parseEnvironment.id,
      },
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
  const parseEnvironment = JSON.parse(task.environment);
  const parseCollection = JSON.parse(task.collection);
  if (!task) {
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  } else {
    console.log('tester : ', parseCollection.info._postman_id);
    await updateTask(
      'http://127.0.0.1:7000',
      task.id,
      parseEnvironment,
      parseCollection,
      TaskStatus.IN_PROGRESS,
      TestStatus.RUNNING,
    );
    // taskService.update(task.collection, task.environment, TaskStatus.IN_PROGRESS, TestStatus.RUNNING);
    const report = await TestRunner(task.collection, task.environment);
    console.log(report);
    await updateTask(
      'http://127.0.0.1:7000',
      task.id,
      parseEnvironment,
      parseCollection,
      TaskStatus.DONE,
      report.status,
      report,
    );
    return task;
  }
}
// console.log(workerData);

module.exports = async (workerData: any) => {
  // Fake some async activity
  await taskWorker(workerData);
  return 'test';
};

// parentPort?.postMessage(taskWorker(workerData.value));
