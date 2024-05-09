import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createAdmin } from './util/createAdmin'
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from "express";
import { NestExpressApplication } from '@nestjs/platform-express';

const PORT = process.env.PORT || 8000
const URL = process.env.URL || 'localhost';




const config = new DocumentBuilder()
  .setTitle('Pi_Film Admin API')
  .setDescription('Api for administration')
  .setVersion('1.0')
  .addServer(`${URL}:${PORT}`)
  .addServer('http://localhost:8000')
  .addServer(`${URL}`)
  .build();



async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.setGlobalPrefix("api");

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT);
  await createAdmin();
}
bootstrap();
