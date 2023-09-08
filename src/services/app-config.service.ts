import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {
  }

  get NODE_ENV(): string {
    return this.configService.get<string>("NODE_ENV");
  }

  get PORT(): number {
    return this.configService.get<number>("PORT");
  }

  get API_BASE_URL(): string {
    return this.configService.get<string>("API_BASE_URL");
  }

  get API_KEY(): string {
    return this.configService.get<string>("API_KEY");
  }
}
