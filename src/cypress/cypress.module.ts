import { Controller, Get } from '@nestjs/common';
// import { newmanRunner } from './postmanRunner';

@Controller('your-microservice')
export class cypressModule {
  @Get('run-postman')
  runPostman(): string {
    // newmanRunner(); // Invoke the newmanRunner function
    return 'Postman collection run initiated';
  }
}