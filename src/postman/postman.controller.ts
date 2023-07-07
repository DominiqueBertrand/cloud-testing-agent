import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostmanService } from './postman.service';
import { tests } from './postman.model';

@Controller('postman')
@ApiTags('Postman')
@Controller('postman')
export class PostmanController {
  constructor(private postmanService: PostmanService) {}

  @Post('collections_list')
  @ApiOperation({ summary: 'Generate a list of all collections' })
  addCollectionsList(): object {
    return this.postmanService.insertCollectionsList();
  }

  @Get('collections_list')
  @ApiOperation({ summary: 'Get a list of all collections' })
  getCollectionsList() {
    return this.postmanService.getCollectionsList();
  }

  @Post('environnement_list')
  @ApiOperation({ summary: 'Generate a list of all environnements' })
  addEnvironnementList(): object {
    return this.postmanService.insertEnvironnementList();
  }

  @Get('environnement_list')
  @ApiOperation({ summary: 'Get a list of all environnements' })
  getEnvironnementList() {
    return this.postmanService.getEnvironnementList();
  }

  @Post('create_newman')
  @ApiOperation({ summary: 'Create newman test' })
  addTest(@Body('id') id: string, @Body('gobal_env_id') env_id: string, @Body('tests') test: tests): object {
    return this.postmanService.insertTest(id, env_id, test);
  }

  @Get('test')
  @ApiOperation({ summary: 'Get a list of all tests' })
  getAllTest() {
    return this.postmanService.getTests();
  }

  //TODO
  // @Get('test/:id')
  // @ApiOperation({ summary: 'Get a test by ID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found test',
  //   type: PostmanModel,
  // })
  // getTest(@Param('id') testID: string) {
  //   return this.postmanService.getSingleTest(testID);
  // }
}
