import { Test, TestingModule } from '@nestjs/testing';
import { PostmanController } from './postman.controller';
import { PostmanService } from './postman.service';

describe('PostmanController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PostmanController],
      providers: [PostmanService],
    }).compile();
  });

  describe('getAllTest', () => {
    it('should return an array"', () => {
      const appController = app.get(PostmanController);
      expect(Array.isArray(appController.getAllTest())).toBe(true);
    });
  });
  // TODO: test every controllers
});
