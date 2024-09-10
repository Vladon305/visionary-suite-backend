import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const port = Number(process.env.PORT) | 5000;

  await app.listen(port, () => console.log(`started on port ${port}`));
}
bootstrap();
