import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsService],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getContacts', () => {
    it('should return an array of contacts', () => {
      const result = service.getContacts();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return the initial contacts', () => {
      const result = service.getContacts();
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Contact 1');
      expect(result[1].name).toBe('Contact 2');
    });
  });

  describe('addContact', () => {
    it('should add a new contact and return it', () => {
      const initialCount = service.getContacts().length;
      const newContactDto = { name: 'New Contact', email: 'new@example.com' };

      const result = service.addContact(newContactDto);

      expect(result.name).toBe(newContactDto.name);
      expect(result.email).toBe(newContactDto.email);
      expect(result.id).toBeDefined();
      expect(service.getContacts().length).toBe(initialCount + 1);
      expect(service.getContacts()).toContainEqual(result);
    });

    it('should add multiple contacts sequentially with unique IDs', () => {
      const initialCount = service.getContacts().length;

      const contactA = service.addContact({
        name: 'Contact A',
        email: 'a@example.com',
      });
      const contactB = service.addContact({
        name: 'Contact B',
        email: 'b@example.com',
      });

      expect(service.getContacts().length).toBe(initialCount + 2);
      expect(contactA.id).not.toBe(contactB.id);
      expect(service.getContacts()).toContainEqual(contactA);
      expect(service.getContacts()).toContainEqual(contactB);
    });
  });
});
