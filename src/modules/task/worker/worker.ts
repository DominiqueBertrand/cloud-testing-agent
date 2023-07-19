import { HttpException, HttpStatus } from '@nestjs/common';
import { TestRunner } from '../middleware/testRunner';
import { workerData } from 'worker_threads';

async function taskWorker(task) {
  if (!task) {
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  } else {
    console.log('t', task.collection);
    await TestRunner(task.collection, task.environment);
    return task;
  }
}
taskWorker(workerData.value);

// parentPort?.postMessage(taskWorker(workerData.value));
