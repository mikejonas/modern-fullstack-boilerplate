/**
 * README #2: app.module.ts - Root Application Module
 *
 * This is the root module of the NestJS application. Modules are the basic
 * building blocks that organize the application structure.
 *
 * Key concepts:
 * - @Module() decorator defines a module
 * - controllers: Array of controllers that handle HTTP requests
 * - providers: Array of services that can be injected into controllers
 * - imports: Other modules that this module depends on
 *
 * This module wires together AppController and AppService, making them
 * available throughout the application via dependency injection.
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
