import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomLogger } from './logger/custom-logger.logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [],
      isGlobal: true,
    }),
    CustomLogger
  ],
})
export class AppModule {}
