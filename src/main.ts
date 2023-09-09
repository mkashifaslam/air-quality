import { NestFactory } from '@nestjs/core';
import { AirQualityModule } from './air-quality.module';
import { AppConfigService } from './services/app-config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AirQualityModule);
  const appConfig = app.get(AppConfigService);

  const config = new DocumentBuilder()
    .setTitle('Iqair Air Quality')
    .setDescription('The Air-Quality Rest APIs')
    .setVersion('1.0')
    .addTag('rest-apis')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(appConfig.API_PREFIX, app, document);
  app.setGlobalPrefix(appConfig.API_PREFIX);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: appConfig.APP_VERSION,
  });
  await app.listen(appConfig.PORT ?? 3000);
}

bootstrap();
