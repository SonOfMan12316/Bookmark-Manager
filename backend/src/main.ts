import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './app.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ForbiddenException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
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
      .setDescription('API documentation for the Bookmark Manager backend')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, swaggerDocument);
    
    const port = Number(config.PORT) || process.env.PORT || 9000;
    await app.listen(port, '0.0.0.0');
    console.log(`✅ Application is running on: http://0.0.0.0:${port}`);
    console.log(`📚 Swagger docs available at: http://0.0.0.0:${port}/${globalPrefix}/docs`);
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}
bootstrap();
