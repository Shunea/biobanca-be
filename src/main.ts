import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  let address;
  let ifaces = require('os').networkInterfaces();

  for (const dev in ifaces) {
    ifaces[dev].filter((details) =>
      details.family === 'IPv4' && details.internal === false
        ? (address = details.address)
        : undefined,
    );
  }

  if (process.env.NODE_ENV !== "production") {
    const config = new DocumentBuilder()
      .setTitle('Biobanca')
      .setDescription('The Biobanca API description')
      .setVersion('1.0')
      .addServer(`http://localhost:${process.env.PORT || 8080}`, 'Local server')
      .addBearerAuth()
      .build();
  
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        operationsSorter: 'method',
        tagsSorter: 'alpha',
        defaultModelsExpandDepth: -1,
      },
    });
  }

  await app.listen(process.env.PORT || 8080);
  Logger.log(`🚀 Application is running on: ${process.env.API_URL}`)
}

bootstrap();
