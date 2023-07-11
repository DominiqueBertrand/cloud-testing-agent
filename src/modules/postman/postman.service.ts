// import { NotFoundException } from '@nestjs/common';
import { postAllCollectionsList, postAllEnvironnementList } from './Post/postAllCollectionsList';
import { testLauncher } from './runner/testLauncher';

export class PostmanService {
  static testId: string;
  constructor(
    private envList: Array<string> = [],
    private collectionList: Array<string> = [],
    private testList: Array<object> = [],
  ) {}

  /**
   *
   * @param none,
   * @returns string[] => all environnements ids and names
   */
  insertCollectionsList(): string[] {
    const collectionList = postAllCollectionsList();

    this.collectionList = collectionList;

    return collectionList;
  }

  /**
   *
   * @param none,
   * @returns Array<string> => all environnements ids and names
   */
  getCollectionsList(): Array<string> {
    return this.collectionList;
  }

  /**
   *
   * @param none,
   * @returns string[] => all environnements ids and names
   */
  insertEnvironnementList(): string[] {
    const envlist: string[] = postAllEnvironnementList();

    this.envList = envlist;

    return envlist;
  }

  /**
   *
   * @param none,
   * @returns Array<string> => all environnements ids and names
   */
  getEnvironnementList(): Array<string> {
    return this.envList;
  }

  /**
   *
   * @param title: string, env_id: string, test: objec,
   * @returns PostmanModel => new test -> finish test or pending test
   */
  async insertTest(title: string, env_id: string, test: object): Promise<object> {
    const testResult: object = await testLauncher(env_id, test);
    console.log('launch test', title);
    this.testList.push(testResult);
    return testResult;
  }

  /**
   *
   * @param none,
   * @returns array of PostmanModel => all tests
   */
  getTests(): Array<object> {
    return this.testList;
  }

  /**
   *
   * @param testId,
   * @returns PostmanModel => test by id
   */
  // getSingleTest(testId: string): PostmanModel {
  //   const test = this.testList.find(res => res.Id.toString() == testId);
  //   if (!test) {
  //     throw new NotFoundException('No test corresponding.');
  //   }
  //   return test;
  // }
}
