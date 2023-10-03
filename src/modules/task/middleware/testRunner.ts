import { PmCollection, PmEnvironment, PmReport } from '@src/entities';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import newman, { NewmanRunSummary } from 'newman';
import { TestReport } from '../dto/test-report';
import { PoolRunWorkerDto } from '../dto';
import { ICollection } from '@src/modules/pmCollection/pmCollection.type';
import { IEnvironment } from '@src/modules/pmEnvironment/pmEnvironment.type';

async function newmanRunner(collection: ICollection, environment: IEnvironment): Promise<NewmanRunSummary> {
  // run and return Promise newman test result
  const _collection: string = JSON.parse(JSON.stringify(collection));
  const _environment: string = JSON.parse(JSON.stringify(environment));

  return new Promise((resolve, reject) => {
    newman.run(
      {
        collection: JSON.parse(_collection),
        environment: JSON.parse(_environment),
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
    return new PmReport(task, failedTestParser(error), TestStatus.FAILED);
  }
}
