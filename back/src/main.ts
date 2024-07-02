import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // habilitar corns para integração 
  await app.listen(3001);
}
bootstrap();
