import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const PORT = +process.env.APP_PORT || 4000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle("Wednesday Nest API")
    .setDescription("Документация к REST API")
    .setVersion(process.env.npm_package_version)
    .addTag('App')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);

  await app.listen(PORT,
    () => console.log(`Сервер запущен. Порт: ${PORT}`));
}
bootstrap();
