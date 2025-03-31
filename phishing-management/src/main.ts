import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ פתיחת CORS ל־localhost:3002 (React)
  app.enableCors({
    origin: 'http://localhost:3002',
    credentials: true,
  });

  await app.listen(3001);
  console.log(`✅ Phishing Management Server running at http://localhost:3001`);
}
bootstrap();
