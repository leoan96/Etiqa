import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filter/http-exception.filter';
import { MongoExceptionFilter } from './filter/mongodb-exception.filter';
import { CustomLogger } from './logger/custom-logger.logger';
import * as express from 'express';
import * as httpContext from 'express-http-context';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { setCorrelationId } from '../shared/utils';
import * as helmet from 'helmet';
import { appConfiguration, initializeSwagger } from './app.configuration';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useLogger(app.get(CustomLogger));
  app.useGlobalInterceptors(new LoggingInterceptor());

  const configService = app.get(ConfigService);
  const appConfig = appConfiguration(configService);

  app.use(helmet());
  app.enableCors(appConfig.cors);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(httpContext.middleware);
  app.use(setCorrelationId);

  initializeSwagger(app, configService, logger);

  const port = +configService.get<String>('app.port');
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
