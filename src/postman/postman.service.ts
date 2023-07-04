import { NotFoundException } from '@nestjs/common';
import { PostmanModel } from './postman.model';
import { postAllCollectionsList, postAllEnvironnementList } from './Post/postAllCollectionsList';
import { testLauncher } from './runner/testLauncher';
import crypto from 'crypto';

export class PostmanService {
  static testId: string;
  static Id: string;
  constructor(
    private envList: Array<string> = [],
    private collectionList: Array<string> = [],
    private testList: PostmanModel[] = [],
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
  insertTest(title: string, env_id: string, test: object): PostmanModel {
    const id = crypto.randomUUID();

    const testResult: PostmanModel = testLauncher(id, title, env_id, test);
    if (testResult['status'] === 'pending') {
      console.log('is pending');
      PostmanService.Id = id;
    }
    if (testResult['status'] === 'finished') {
      this.testList.push(testResult);
      PostmanService.Id = id;
    }
    return testResult;
  }

  /**
   *
   * @param none,
   * @returns array of PostmanModel => all tests
   */
  getTests(): PostmanModel[] {
    return this.testList;
  }

  /**
   *
   * @param testId,
   * @returns PostmanModel => test by id
   */
  getSingleTest(testId: string): PostmanModel {
    const test = this.testList.find(res => res.id.toString() == testId);
    if (!test) {
      throw new NotFoundException('No test corresponding.');
    }
    return test;
  }
}
