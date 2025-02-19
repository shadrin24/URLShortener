import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Разрешить запросы только с фронтенда
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Если есть аутентификация
  });

  await app.listen(process.env.PORT ?? 8080);

}
bootstrap();
