import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AirQualityService } from './services/AirQualityService';
import { Result } from './models/Result';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Air-Quality')
@Controller('air-quality')
export class AirQualityController {
  private readonly logger = new Logger(AirQualityController.name);

  constructor(private readonly airQualityService: AirQualityService) {}

  @Get('nearestCityAirQuality/:lat/:lng')
  @ApiOperation({
    summary: 'Get air-quality of nearest city of given lat, lng',
  })
  @ApiResponse({
    status: 200,
    description: 'Success response',
    schema: {
      example: {
        Result: {
          Pollution: {
            ts: '2023-09-08T03:00:00.000Z',
            aqius: 76,
            mainus: 'p2',
            aqicn: 46,
            maincn: 'p1',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getNearestAirQuality(
    @Param('lat') lat: number,
    @Param('lng') lng: number,
  ): Promise<{ Result: Result }> {
    this.logger.log('lat & lng received');
    return this.airQualityService.getNearestAirQuality(lat, lng);
  }

  @Get('getMostPollutedParisZoneTime')
  @ApiOperation({
    summary: 'Get time of most polluted air-quality of Paris zone',
  })
  @ApiResponse({
    status: 200,
    description: 'Success response',
    schema: {
      example: {
        ts: '2023-09-08T03:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getMostPollutedParisZoneTime() {
    return this.airQualityService.getMostPollutedParisZoneTime();
  }
}
