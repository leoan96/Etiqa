import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filter/http-exception.filter';
import { MongoExceptionFilter } from './filter/mongodb-exception.filter';
import { CustomLogger } from './logger/custom-logger.logger';
import * as express from 'express';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useLogger(app.get(CustomLogger));

  const config = app.get(ConfigService);

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const port = +config.get<String>('SERVER_PORT');
  await app.listen(port);
  logger.log(`Server running on port ${port}...`);
}
bootstrap();

process.on('uncaughtException', (error) => {
  logger.error(
    `UNCAUGHT EXCEPTION - keeping process alive:\n ${
      error.stack
    }\n ${JSON.stringify(error)}`,
  );
});
