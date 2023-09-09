import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AirQuality, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { AppConfigService } from './app-config.service';
import { Result } from '../models/Result';

@Injectable()
export class AirQualityService {
  private readonly logger = new Logger(AirQualityService.name);
  private _apiUrl = '';

  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly appConfig: AppConfigService,
  ) {
    this._apiUrl = `${this.appConfig.API_BASE_URL}/nearest_city?key=${this.appConfig.API_KEY}`;
  }

  async getNearestAirQuality(
    lat = 48.856613,
    lng = 2.352222,
  ): Promise<{ Result: Result }> {
    try {
      const params = `&lat=${lat}&lon=${lng}`;
      const apiResponse = await this.httpService.axiosRef
        .get(`${this._apiUrl}${params}`)
        .then((response) => response.data);
      const { pollution } = apiResponse.data.current;
      const Result = {
        Pollution: {
          ...pollution,
        },
      };
      this.logger.log('Successfully received the response from api');
      await this.createAirQuality(pollution);
      return { Result };
    } catch (err) {
      this.logger.error(`Error[${err.code}]: ${err.message}`);
      throw new HttpException(err.message, err.code);
    }
  }

  async createAirQuality(
    data: Prisma.AirQualityCreateInput,
  ): Promise<AirQuality> {
    try {
      this.logger.log('Creating new record of air quality');
      return this.prisma.airQuality.create({
        data,
      });
    } catch (err) {
      this.logger.error(`Error[${err.code}]: ${err.message}`);
      throw new HttpException(err.message, err.code);
    }
  }

  getTimeWithMostPollutedParisZone() {
    return this.prisma.airQuality.findFirst({
      select: {
        ts: true,
      },
      orderBy: [
        {
          aqius: 'desc',
        },
        {
          aqicn: 'desc',
        },
      ],
    });
  }
}
