import { NestFactory } from "@nestjs/core";
import { AirQualityModule } from "./air-quality.module";
import { AppConfigService } from "./services/app-config.service";

async function bootstrap() {
  const app = await NestFactory.create(AirQualityModule);
  const appConfig = app.get(AppConfigService);
  await app.listen(appConfig.PORT ?? 3000);
}

bootstrap();
