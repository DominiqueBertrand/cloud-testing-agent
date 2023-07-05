import { NestFactory } from '@nestjs/core';

import { AppModule } from '@src/app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import serviceConfig from '@src/config/service.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable shutdown hooks explicitly.
  app.enableShutdownHooks();
  app.enableCors();
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('service.port');
  // <-- SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Coog Cloud Agent')
    .setDescription(
      'Coog Cloud Agent is a specialized tool suite for testing and monitoring the entire application-delivery chain within the Coopengo Cloud Application Platform.',
    )
    .setVersion('1.0')
    .addTag('Postman')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // SWAGER -->
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
