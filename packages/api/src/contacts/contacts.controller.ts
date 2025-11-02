import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import {
  ContactResponseDto,
  ContactsResponseDto,
} from './dto/contact-response.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  getContacts(): ContactsResponseDto {
    return {
      success: true,
      data: this.contactsService.getContacts(),
      error: null,
    };
  }

  @Post()
  createContact(@Body() dto: CreateContactDto): ContactResponseDto {
    const contact = this.contactsService.addContact(dto);
    return {
      success: true,
      data: contact,
      error: null,
    };
  }
}
