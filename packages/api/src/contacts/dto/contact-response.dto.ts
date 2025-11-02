import { Contact } from '../entities/contact.entity';

export class ContactResponseDto {
  success: boolean;
  data: Contact;
  error: null;
}

export class ContactsResponseDto {
  success: boolean;
  data: Contact[];
  error: null;
}
