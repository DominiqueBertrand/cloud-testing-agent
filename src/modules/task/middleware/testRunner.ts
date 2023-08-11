import { PmCollection, PmEnvironment, PmReport } from '@src/entities';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import newman, { NewmanRunSummary } from 'newman';
import { TestReport } from '../dto/test-report';
import { PoolRunWorkerDto } from '../dto';
import { ICollection } from '@src/modules/pmCollection/pmCollection.type';
import { IEnvironment } from '@src/modules/pmEnvironment/pmEnvironment.type';

async function newmanRunner(collection: ICollection, environment: IEnvironment): Promise<NewmanRunSummary> {
  // run and return Promise newman test result
  const _collection: object = JSON.parse(collection.toString());
  const _environment: object = JSON.parse(environment.toString());

  return new Promise((resolve, reject) => {
    newman.run(
      {
        collection: _collection,
        environment: _environment,
        reporters: 'cli',
      },
      (err, summary) => {
        if (err) {
          reject(err);
        } else {
          resolve(summary);
        }
      },
    );
  });
}

function testParser(test: newman.NewmanRunSummary): TestReport {
  const report: TestReport = { stats: test.run.stats, failure: test.run, execution: test.run.executions };
  return report;
}

function failedTestParser(error: unknown): TestReport {
  const report: TestReport = { stats: { error } };
  return report;
}

// TODO : task to type
export async function TestRunner(
  task: PoolRunWorkerDto,
  collection: PmCollection,
  environment: PmEnvironment,
): Promise<PmReport> {
  try {
    if (!collection?.collection || !environment?.environment) {
      throw Error;
    }
    const testResult: newman.NewmanRunSummary = await newmanRunner(collection.collection, environment.environment);
    const report: TestReport = testParser(testResult);
    if (testResult.run.executions.length === 0) {
      return new PmReport(task, report, TestStatus.FAILED);
    } else {
      return new PmReport(task, report, TestStatus.SUCCESS);
    }
  } catch (error) {
    console.error(error);
    return new PmReport(task, failedTestParser(error), TestStatus.FAILED);
  }
}
