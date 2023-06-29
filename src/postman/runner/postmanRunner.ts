import newman, { NewmanRunSummary } from 'newman';

export class TestRunner {
  static testResult: NewmanRunSummary;

  static async newmanRunner(collect, env): Promise<NewmanRunSummary> {

    return new Promise((resolve, reject) => {
      newman.run(
        {
          collection: collect,
          environment: env,
          reporters: 'cli',
        },
        (err, summary) => {
          if (err) {
            reject(err);
          } else {
            resolve(summary)
            console.log("summary", summary)
            this.testResult = summary
          }
        }
      )
    });
  }
}