import { NotFoundException } from '@nestjs/common';
import { PostmanModel } from './postman.model';
import { postAllCollectionsList, postAllEnvironnementList } from './Post/postAllCollectionsList';
import { testLauncher } from './runner/testLauncher';

export class PostmanService {
  constructor(
    private tests: PostmanModel[] = [],
    private envList: any[] = [],
    private collectionList: any[] = [],
    private testList: object[] = [],
  ) {}

  // Collections services

  insertCollectionsList() {
    const collectionList = postAllCollectionsList();

    this.collectionList.push(collectionList);

    return collectionList;
  }

  getCollectionsList() {
    return this.collectionList;
  }

  // Environnements services

  insertEnvironnementList() {
    const envlist = postAllEnvironnementList();

    this.envList.push(envlist);

    return envlist;
  }

  getEnvironnementList() {
    return this.envList;
  }

  // Tests services

  insertTest(title: string, env_id: string, test: object) {
    const testResult = testLauncher(title, env_id, test);

    if (testResult['status'] === 'finished') this.testList.push(testResult);

    return testResult;
  }

  getTests() {
    return [...this.testList];
  }

  getSingleTest(testId: string) {
    const test = this.tests.find(res => res.id == testId);
    if (!test) {
      throw new NotFoundException('No test corresponding.');
    }
    return { ...test };
  }
}
