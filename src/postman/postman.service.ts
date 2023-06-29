import {  NotFoundException } from '@nestjs/common';
// import { TestRunner } from './runner/postmanRunner'
// import { NewmanRunSummary } from 'newman';
import { PostmanModel } from './postman.model';
import { fileFinder } from './runner/fileDetector';
import { getCollectionId } from './runner/getCollectionId';
import { postAllCollections } from './Post/postAllCollections';
import { postAllCollectionsList, postAllEnvironnementList } from './Post/postAllCollectionsList';
import { setDate } from './widgets/setDate';
import { testLauncher } from './runner/testLauncher';

export class PostmanService {

  private tests: PostmanModel[] = []
  private collection : any[] = []
  private envList : any[] = []
  private collectionList : any[] = []

  insertCollectionsList() {
    const collectionList = postAllCollectionsList()

    this.collectionList.push(collectionList)

    return collectionList
  }

  insertEnvironnementList() {
    const envlist = postAllEnvironnementList()

    this.envList.push(envlist)

    return envlist
  }


  insertCollections() {
    const collections = postAllCollections()

    this.collection.push(collections)

    return collections
  }

  getCollections() {
    return [...this.collection]
  }

  getCollectionsList() {
    return this.collectionList
  }

  getEnvironnementList() {
    return this.envList
  }

  insertTest(title: string,env_id: string, test: object) {
    const prodId = Math.random().toString()
    const collectionId = getCollectionId(title)
    const createAt = setDate()
    const newTest = new PostmanModel(prodId, title, collectionId, createAt)

    const testResult = testLauncher(title, env_id, test)
    
    this.tests.push(newTest);
    
    return testResult
  }

  getTests() {
    
    fileFinder()
    
    return [...this.tests]
  }

  getSingleTest(testId : string) {
    const test = this.tests.find((res) => res.id == testId)
    if (!test) {
      throw new NotFoundException('No test corresponding.')
    }
    return {...test}
  }
}