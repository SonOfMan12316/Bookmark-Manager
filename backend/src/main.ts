import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './app.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ForbiddenException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  let whiteList = [AppConfig().FRONTEND_URL];

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
  
  await app.listen(3000);
}
bootstrap();
