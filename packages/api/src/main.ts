/**
 * README #1: main.ts - Application Entry Point
 *
 * This is the entry point of the NestJS application. It bootstraps the NestJS
 * application by creating an instance of the AppModule and starting the HTTP
 * server on the specified port (default: 3001).
 *
 * Key concepts:
 * - NestFactory.create() creates a new NestJS application instance
 * - The application listens for HTTP requests on the configured port
 * - This is the first file executed when starting the NestJS server
 */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties that are not in the DTO
      forbidNonWhitelisted: true, // Throw an error if a non-whitelisted property is sent
      transform: true, // Transform the request body to the DTO type
    }),
  );

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🚀 API running on http://localhost:${port}`);
}

bootstrap().catch((error) => {
  console.error('Error starting Nest application:', error);
  process.exit(1);
});
