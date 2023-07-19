// import { PmTest } from '@src/entities/PmTest';
// import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import { PmReport } from '@src/entities';
import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
import newman, { NewmanRunSummary } from 'newman';

async function newmanRunner(collection: object, environment): Promise<NewmanRunSummary> {
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

function testParser(test) {
  const report: Array<object> = [];
  if (test) {
    console.log(test);
    report.push({ stats: test.run.stats, failure: test.run, execution: test.run.executions });
  }
  console.log(report);
  return report;
}

export async function TestRunner(collection, environment) {
  const testResult = await newmanRunner(JSON.parse(collection), JSON.parse(environment));
  const reportTest = testParser(testResult);
  const report = new PmReport(reportTest, TestStatus.RUNNING);

  return report;
}
