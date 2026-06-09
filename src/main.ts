import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const PORT = process.env.PORT;

  await app.listen(PORT ?? 3000);
}
bootstrap();
