// import { PmTest } from '@src/entities/PmTest';
// import { TestStatus } from '@src/modules/pmReport/pmReport-status.enum';
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
          console.log(summary);
          resolve(summary);
          //put summary of test in static testResult
        }
      },
    );
  });
}
export async function TestRunner(collection, environment) {
  await newmanRunner(JSON.parse(collection), JSON.parse(environment));
  //   const testList: PmTest = new PmTest(TestStatus.RUNNING);
}
