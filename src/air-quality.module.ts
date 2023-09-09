import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from 'joi';
import { PrismaService } from './services/prisma.service';
import { AirQualityController } from './AirQualityController';
import { AirQualityService } from './services/AirQualityService';
import { AppConfigService } from './services/app-config.service';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        API_BASE_URL: Joi.string().required(),
        API_KEY: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  controllers: [AirQualityController],
  providers: [AppConfigService, AirQualityService, PrismaService, TasksService],
})
export class AirQualityModule {}
