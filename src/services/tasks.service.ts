import { HttpException, Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { AirQualityService } from "./AirQualityService";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly airQualityService: AirQualityService) {
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    try {
      this.logger.log("Called every minute");
      await this.airQualityService.getNearestAirQuality();
      this.logger.log("Successfully inserted a new air quality record in db");
    } catch (err) {
      this.logger.error(`Error[${err.code}]: ${err.message}`);
      throw new HttpException(err.message, err.code);
    }
  }
}
