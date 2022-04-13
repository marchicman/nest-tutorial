import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // elimina dal body della richiesta eventuali campi non presenti nel DTO del controller
  }));
  await app.listen(3333);
}
bootstrap();
