import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './common/config/interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import queueRoute from './queue/route';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>('app');

  // Common middleware
  app.use(bodyParser.json({ limit: '10mb' }));

  // Security
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Documentation App Store API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentations', app, document);

  app.use('/queue-monitor', queueRoute);

  await app.listen(appConfig.port);
}
bootstrap();
