import { PmReport } from '@src/entities';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import newman, { NewmanRunSummary } from 'newman';

async function newmanRunner(collection: object, environment: object): Promise<NewmanRunSummary> {
  // run and return Promise newman test result
  return new Promise((resolve, reject) => {
    newman.run(
      {
        collection,
        environment,
        reporters: 'cli',
      },
      (err, summary) => {
        if (err) {
          reject(err);
        } else {
          resolve(summary);
          //put summary of test in static testResult
        }
      },
    );
  });
}

function testParser(test: newman.NewmanRunSummary): object[] {
  const report: Array<object> = [];
  if (test) {
    report.push({ stats: test.run.stats, failure: test.run, execution: test.run.executions });
  }
  return report;
}

export async function TestRunner(collection, environment): Promise<PmReport> {
  try {
    const testResult = await newmanRunner(JSON.parse(collection), JSON.parse(environment));
    const reportTest: object[] = testParser(testResult);
    if (testResult.run.stats.assertions.total === 0) {
      return new PmReport(reportTest, TestStatus.FAILED);
    } else {
      return new PmReport(reportTest, TestStatus.SUCCESS);
    }
  } catch (error) {
    console.error(error);
    return new PmReport([], TestStatus.FAILED);
  }
}
