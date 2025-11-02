/**
 * README #4: app.controller.ts - HTTP Request Handler
 *
 * Controllers in NestJS handle incoming HTTP requests and return responses.
 * They define routes and delegate business logic to services.
 *
 * Key concepts:
 * - @Controller() decorator marks this class as a controller
 * - @Get() decorator creates a GET endpoint (maps to the root route '/')
 * - Dependency injection: AppService is injected via constructor
 * - Routes are automatically mapped (e.g., @Get() becomes GET /)
 *
 * This controller exposes a simple GET endpoint that returns a greeting.
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
