import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './redis/redis-io.adapter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const redisAdapter = new RedisIoAdapter(app);
  await redisAdapter.connectToRedis();
  app.useWebSocketAdapter(redisAdapter);

  const frontendUrl = process.env.FRONTEND_URL;
  app.enableCors({
    origin: frontendUrl ? frontendUrl : true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT ?? 3000;
  const instanceId = process.env.INSTANCE_ID ?? process.env.HOSTNAME ?? 'local';
  await app.listen(port, '0.0.0.0');
  console.log(
    `spinyWheely API [${instanceId}] running on http://0.0.0.0:${port}`,
  );
  console.log(`Wheel WebSocket namespace: ws://0.0.0.0:${port}/wheel`);
}

bootstrap();
