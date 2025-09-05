import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000', // если фронт локально
      'https://shop-front-taupe.vercel.app/' // если фронт на Vercel
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // если нужны куки
  });
  
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
