import {  Body, Controller, Get, Post, Param} from '@nestjs/common';
import { PostmanService } from './postman.service';
import { tests } from './postman.model';

@Controller('postman')
export class PostmanController {
  constructor(private postmanService: PostmanService) {}

  @Post('collections_list')
  addCollectionsList(): Object {
     const collections =  this.postmanService.insertCollectionsList()
     return collections
  }
  @Post('environnement_list')
  addEnvironnementList(): Object {
     const environment =  this.postmanService.insertEnvironnementList()
     return environment
  }

  @Get('collections_list')
  getCollectionsList() {
    return this.postmanService.getCollectionsList();
  }
  @Get('environnement_list')
  getEnvironnementList() {
    return this.postmanService.getCollectionsList();
  }

  @Post('collections')
  addCollections(): any {
     const collections = this.postmanService.insertCollections()
     return {collections}
  }
  @Get('collections')
  getAllCollections() {
    return this.postmanService.getTests();
  }

  @Post('create_newman')
  addTest(@Body('id') id: string, @Body('gobal_env_id') env_id: string, @Body('tests') test: tests): Object {
     const testRender=  this.postmanService.insertTest(id, env_id, test)
     return testRender
  }

  @Get('test')
  getAllTest() {
    return this.postmanService.getTests();
  }

  @Get('test/:id')
  getTest(@Param('id') testID :string) {
    return this.postmanService.getSingleTest(testID);
  }
}