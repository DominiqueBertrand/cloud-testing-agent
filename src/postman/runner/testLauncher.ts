import { PostmanModel } from '../postman.model';
import { getCollectionById } from '../widgets/getCollectionById';
import { getEnvById } from '../widgets/getEnvById';
import { TestRunner } from './postmanRunner';

function getEnv(id: string): object {
  const data: object = getEnvById(id);

  return data;
}

function getCollection(id: string): object {
  const data: object = getCollectionById(id);

  return data;
}

// Launch newman test
export async function testLauncher(
  id: string,
  date: string,
  title: string,
  env_id: string,
  test: object,
): Promise<PostmanModel> {
  // get environnement and collection files in correct folders
  const envJSON: object = getEnv(env_id);
  const collectionJSON: object = getCollection(test[0].id_collection);
  const testChecking: Array<any> = [];
  let testsResult: object = [];

  // run test and set TestRunner.testResult
  await TestRunner.newmanRunner(collectionJSON[0], envJSON[0]);

  // check if the summary in the promise is empty
  if (!TestRunner.testResult) {
    //return object "pending" if the test is not finished
    return {
      id: id,
      title: title,
      status: 'pending',
      createdAt: date,
      collectionId: '',
      envId: '',
      run: {},
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
      createdAt: date,
      collectionId: test[0].id_collection,
      envId: env_id,
      run: {
        stats: testsResult,
        execution: testChecking,
      },
    };
  }
}
