import { NestFactory } from '@nestjs/core';

import { AppModule } from '@src/app.module';
import { ConfigService } from '@nestjs/config';
// import serviceConfig from '@src/config/service.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable shutdown hooks explicitly.
  app.enableShutdownHooks();
  app.enableCors();
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('service.port');

  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
