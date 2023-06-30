import { getCollectionById } from '../widgets/getCollectionById';
import { getEnvById } from '../widgets/getEnvById';
import { setDate } from '../widgets/setDate';
import { TestRunner } from './postmanRunner';

function getEnv(id: string) {
  const data: Object = getEnvById(id);

  return data;
}

function getCollection(id: string) {
  const data: Object = getCollectionById(id);

  return data;
}

// Launch newman test
export function testLauncher(title: string, env_id: string, test: object): Object {
  // get environnement and collection files in correct folders
  const envJSON: Object = getEnv(env_id);
  const collectionJSON: Object = getCollection(test[0].id_collection);
  const testChecking: Array<any> = [];
  let testsResult: Object = [];
  const id = Math.random();

  // run test
  TestRunner.newmanRunner(collectionJSON[0], envJSON[0]);
  if (!TestRunner.testResult) {
    //return object "pending" if the test is not finished
    return {
      id: id,
      title: title,
      status: 'pending',
    };
  } else {
    // map executions details
    TestRunner.testResult.run.executions.map(function (value) {
      testChecking.push({
        id: value.item.id,
        name: value.item.name,
        response: value.response.status,
        code: value.response.code,
        responseTime: value.response.responseTime,
        responseSize: value.response.responseSize,
      });
    });
    testsResult = {
      iterations: TestRunner.testResult.run.stats.iterations,
      requests: TestRunner.testResult.run.stats.requests,
      test_scripts: TestRunner.testResult.run.stats.testScripts,
      prerequest_scripts: TestRunner.testResult.run.stats.prerequestScripts,
      assertions: TestRunner.testResult.run.stats.assertions,
    };
    // return all test details
    return {
      id: id,
      title: title,
      status: 'finished',
      createdAt: setDate(),
      collectionId: test[0].id_collection,
      envId: env_id,
      run: {
        stats: testsResult,
        execution: testChecking,
      },
    };
  }
}
