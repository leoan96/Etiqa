import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { appEnvironmentConfiguration } from './app.env.configuration';
import { CustomLogger } from './logger/custom-logger.logger';
import { mongooseEnvironmentConfiguration } from './module/mongoose/mongoose.configuration';
import { MongooseClient } from './module/mongoose/mongoose.provider';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [appEnvironmentConfiguration, mongooseEnvironmentConfiguration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(MongooseClient),
    CustomLogger,
    UserModule,
  ],
})
export class AppModule {}
