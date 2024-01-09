import { NestFactory } from '@nestjs/core';

import { AppModule } from '@src/app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MikroORM } from '@mikro-orm/core';
import { json } from 'body-parser';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication<AppModule> = await NestFactory.create(AppModule);
  // enable shutdown hooks explicitly.
  app.enableShutdownHooks();
  app.enableCors();
  //
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('service.port');
  // Set limit value for jsonParser
  const jsonLimit = configService.get('service.jsonParserLimit');
  app.use(json({ limit: jsonLimit }));
  // <-- SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Cloud Testing Agent')
    .setDescription(
      'Cloud Testing Agent is a specialized tool suite for testing and monitoring the entire application-delivery chain within the Coopengo Cloud Application Platform.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Postman/Runner', 'Operations about Postman Runner')
    .addTag('Postman/Environment', 'Operations about Postman Environment')
    .addTag('Postman/Collection', 'Operations about Postman Collection')
    .addTag('Task', 'Operations about Task')
    .addTag('Report', 'Operations about Report')
    .addTag('Auth', 'Operations about Authentication')
    .addTag('Schedule', 'Operations about Schedule')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // SWAGER -->
  // <-- MickroORM
  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  await app.get(MikroORM).getSchemaGenerator().updateSchema();
  // MickroORM -->

  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
