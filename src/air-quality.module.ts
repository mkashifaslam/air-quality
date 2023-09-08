import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { PrismaService } from "./services/prisma.service";
import { AirQualityController } from "./AirQualityController";
import { AirQualityService } from "./services/AirQualityService";
import { AppConfigService } from "./services/app-config.service";
import { TasksService } from "./services/tasks.service";

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true
    })],
  controllers: [AirQualityController],
  providers: [AppConfigService, AirQualityService, PrismaService, TasksService]
})
export class AirQualityModule {
}
