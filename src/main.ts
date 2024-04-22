import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 8000
const URL = process.env.URL || 'localhost';

const config = new DocumentBuilder()
  .setTitle('G_Film Admin API')
  .setDescription('Api for administration')
  .setVersion('1.0')
  .addServer('http://localhost:8000')
  .addServer(`${URL}`)
  .addServer(`${URL}:${PORT}`)
  .build();



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(PORT);
}
bootstrap();
