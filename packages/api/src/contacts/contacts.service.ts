import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  private contacts: Contact[] = [
    { id: 1, name: 'Contact 1', email: 'c1@example.com' },
    { id: 2, name: 'Contact 2', email: 'c2@example.com' },
  ];
  private nextId = 3;

  getContacts(): Contact[] {
    return this.contacts;
  }

  addContact(dto: CreateContactDto): Contact {
    const contact: Contact = { id: this.nextId++, ...dto };
    this.contacts.push(contact);
    return contact;
  }
}
