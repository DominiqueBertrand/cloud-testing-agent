import {  Body, Controller, Get, Post, Param} from '@nestjs/common';
import { PostmanService } from './postman.service';
import { tests } from './postman.model';

@Controller('postman')
export class PostmanController {
  constructor(private postmanService: PostmanService) {}

// Collections
  @Post('collections_list')
  // create a list of all collections
  addCollectionsList(): Object {
     return this.postmanService.insertCollectionsList()
  }
  
  @Get('collections_list')
  // get a list of all collections
  getCollectionsList() {
    return this.postmanService.getCollectionsList();
  }
  
// Environnements
  @Post('environnement_list')
  // create a list of all environnements
  addEnvironnementList(): Object {
     return this.postmanService.insertEnvironnementList()
  }

  @Get('environnement_list')
  // get a list of all environnements
  getEnvironnementList() {
    return this.postmanService.getEnvironnementList();
  }

// Tests
  @Post('create_newman')
  // Create newman test
  addTest(@Body('id') id: string, @Body('gobal_env_id') env_id: string, @Body('tests') test: tests): Object {
    return this.postmanService.insertTest(id, env_id, test)
  }

  @Get('test')
  // get a list of all tests
  getAllTest() {
    return this.postmanService.getTests();
  }


//TODO
  @Get('test/:id')
  // get test by ID
  getTest(@Param('id') testID :string) {
    return this.postmanService.getSingleTest(testID);
  }
}