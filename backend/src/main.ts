import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './app.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ForbiddenException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const config = AppConfig();
  let whiteList = [config.FRONTEND_URL];
    
  // Allow Railway domain for direct access
  if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    whiteList.push(`https://${process.env.RAILWAY_PUBLIC_DOMAIN}`);
  }

  let globalPrefix = 'api';
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    origin: (origin: any, callback: any) => {
      // Allow requests with no origin (like Postman, curl, or direct browser access)
      if (!origin) {
        callback(null, true);
        return;
      }
      // Allow if in whitelist
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new ForbiddenException('CORS Error'))
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
    
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bookmark Manager API')
    .setDescription('API documentation for the Bookmark Manager backend. All endpoints return JSON responses. Authentication endpoints require no token, but protected endpoints require a Bearer token in the Authorization header.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup(`${globalPrefix}/docs`, app, swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  });
    
  const port = Number(config.PORT) || process.env.PORT || 9000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
