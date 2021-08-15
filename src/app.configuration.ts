import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

export const appConfiguration = (configService: ConfigService) => ({
  cors: {
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Headers',
      'DNT',
      'X-CustomHeader',
      'Keep-Alive',
      'User-Agent',
      'X-Requested-With',
      'If-Modified-Since',
      'Cache-Control',
      'Content-Type',
    ],
  },
});

export const initializeSwagger = (
  app: NestExpressApplication,
  configService: ConfigService,
  logger: Logger,
) => {
  const appBaseUrl = configService.get('app.baseUrl');

  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('CRUD methods for users')
    .setVersion('1.0.0')
    .addTag('users')
    .setBasePath(appBaseUrl)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const writeSwaggerJson = (path: string, document) => {
    fs.writeFileSync(
      `${path}/swagger.json`,
      JSON.stringify(document, null, 2),
      {
        encoding: 'utf8',
      },
    );
  };
  writeSwaggerJson(`${process.cwd()}`, document);
  // openapi-generator-cli generate -i swagger.json -g typescript-axios -o client-sdk (generate openapi client sdk)
  SwaggerModule.setup('api', app, document);
  logger.log(`Swagger running on ${appBaseUrl}/api...`);
};
