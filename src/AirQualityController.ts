import { Controller, Get, Logger, Param } from "@nestjs/common";
import { AirQualityService } from "./services/AirQualityService";
import { Result } from "./models/Result";

@Controller()
export class AirQualityController {
  private readonly logger = new Logger(AirQualityController.name);

  constructor(private readonly airQualityService: AirQualityService) {
  }

  @Get("nearestCityAirQuality/:lat/:lng")
  async getNearestAirQuality(
    @Param("lat") lat: number,
    @Param("lng") lng: number): Promise<{ Result: Result }> {
    this.logger.log("lat & lng received");
    return this.airQualityService.getNearestAirQuality(lat, lng);
  }
}
