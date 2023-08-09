import { HttpException, HttpStatus } from '@nestjs/common';
import { TestRunner } from '../middleware/testRunner';
import { TaskStatus } from '../task-status.enum';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { PmReport } from '@src/entities';
import axios from 'axios';
import { PoolRunWorkerDto } from '../dto';

async function updateTask(
  url: string,
  id: string,
  taskSatus?: TaskStatus,
  testStatus?: TestStatus,
  report?: PmReport,
): Promise<void> {
  const options = {
    url: `${url}/task/${id}/actions/report`,
    method: 'POST',
    data: {
      status: taskSatus,
      testStatus: testStatus,
      report: report,
    },
  };
  await axios(options)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
}

export async function taskWorker(task: PoolRunWorkerDto): Promise<PoolRunWorkerDto> {
  if (!task) {
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  } else {
    await updateTask('http://127.0.0.1:7000', task.id, TaskStatus.IN_PROGRESS, TestStatus.RUNNING);
    const report: PmReport = await TestRunner(task, task?.collection, task?.environment);
    await updateTask('http://127.0.0.1:7000', task.id, TaskStatus.DONE, report.status, report);

    return task;
  }
}

//TODO : change method
module.exports = async (workerData: PoolRunWorkerDto): Promise<PoolRunWorkerDto> => {
  return await taskWorker(workerData);
};
