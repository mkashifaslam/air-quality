import { AirQualityController } from './AirQualityController';
import { AirQualityService } from './services/AirQualityService';
import { PrismaService } from './services/prisma.service';
import { HttpService } from '@nestjs/axios';
import { AppConfigService } from './services/app-config.service';
import { ConfigService } from '@nestjs/config';

describe('AirQualityController', () => {
  let airQualityController: AirQualityController;
  let airQualityService: AirQualityService;

  let prisma: PrismaService;
  let httpService: HttpService;
  let appConfig: AppConfigService;
  let configService: ConfigService;

  beforeEach(() => {
    prisma = new PrismaService();
    httpService = new HttpService();
    configService = new ConfigService();
    appConfig = new AppConfigService(configService);

    airQualityService = new AirQualityService(prisma, httpService, appConfig);
    airQualityController = new AirQualityController(airQualityService);
  });

  describe('getNearestAirQuality', () => {
    it('should return result of Paris air quality pollution data', async () => {
      const result = {
        Result: {
          Pollution: {
            ts: '2023-09-08T03:00:00.000Z',
            aqius: 76,
            mainus: 'p2',
            aqicn: 46,
            maincn: 'p1',
          },
        },
      };
      jest
        .spyOn(airQualityService, 'getNearestAirQuality')
        .mockImplementation(() => Promise.resolve(result));

      const controllerFuncResult =
        await airQualityController.getNearestAirQuality(48.856613, 2.352222);
      return expect(controllerFuncResult).toEqual(result);
    });
  });

  describe('getMostPollutedParisZoneTime', () => {
    it('should return result of most polluted zone time of Paris zone', async () => {
      const result = { ts: '2023-09-09T15:00:00.000Z' };
      jest
        .spyOn(airQualityService, 'getMostPollutedParisZoneTime')
        .mockImplementation(() => Promise.resolve(result));

      const controllerFuncResult =
        await airQualityController.getMostPollutedParisZoneTime();
      return expect(controllerFuncResult).toEqual(result);
    });
  });
});
