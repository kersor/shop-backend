import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Укажите точный адрес фронтенда
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Теперь это будет работать легально
  });

  app.setGlobalPrefix('api');
  const PORT = process.env.PORT ?? 8080;

  await app.listen(PORT);
  console.log('Server job in port:', PORT);
}
bootstrap();
