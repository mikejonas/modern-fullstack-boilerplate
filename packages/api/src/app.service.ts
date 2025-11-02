/**
 * README #3: app.service.ts - Business Logic Service
 *
 * Services in NestJS contain business logic and can be shared across controllers.
 * They are the preferred place to put complex operations, data manipulation,
 * and external API calls.
 *
 * Key concepts:
 * - @Injectable() decorator makes this class available for dependency injection
 * - Services are singletons by default (one instance shared across the app)
 * - Services can be injected into controllers, other services, or modules
 * - Business logic should live here, not in controllers
 *
 * This service provides a simple "Hello World!" greeting method.
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
