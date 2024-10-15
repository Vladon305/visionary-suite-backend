import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Удаляет поля, не указанные в DTO
      forbidNonWhitelisted: true, // Блокирует запросы с непредусмотренными полями
      transform: true, // Автоматически преобразует входные данные в указанные типы
    }),
  );
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  const port = Number(process.env.PORT) || 4000;

  await app.listen(port, () => console.log(`started on port ${port}`));
}
bootstrap();
