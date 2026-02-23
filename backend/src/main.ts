import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './app.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ForbiddenException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const config = AppConfig();
  let whiteList = [config.FRONTEND_URL];

  let globalPrefix = 'api';
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    origin: (origin: any, callback: any) => {
      if (!origin || whiteList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new ForbiddenException('CORS Error'))
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bookmark Manager API')
    .setDescription('API documentation for the Bookmark Manager backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, swaggerDocument);
  
  const port = Number(config.PORT) || process.env.PORT || 9000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
