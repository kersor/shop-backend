import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.enableCors({
    origin: 'http://localhost:3000', // Укажите точный адрес фронтенда
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Теперь это будет работать легально
  });

  const uploadsPath = 'uploads';
  if (!existsSync(uploadsPath)) {
    mkdirSync(uploadsPath, { recursive: true });
  }

  app.useStaticAssets('uploads', {
    prefix: '/uploads/',
  });
  
  app.setGlobalPrefix('api');
  const PORT = process.env.PORT ?? 8080;

  await app.listen(PORT);
  console.log('Server job in port:', PORT);
}
bootstrap();
