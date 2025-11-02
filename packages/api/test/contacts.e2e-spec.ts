import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Contact } from '../src/contacts/entities/contact.entity';

interface ContactsResponse {
  success: boolean;
  data: Contact[];
  error: null;
}

interface ContactResponse {
  success: boolean;
  data: Contact;
  error: null;
}

describe('ContactsController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/contacts (GET)', () => {
    it('should return a success response with contacts array', () => {
      return request(app.getHttpServer())
        .get('/contacts')
        .expect(200)
        .expect((res) => {
          const body = res.body as ContactsResponse;
          expect(body).toHaveProperty('success', true);
          expect(body).toHaveProperty('data');
          expect(body).toHaveProperty('error', null);
          expect(Array.isArray(body.data)).toBe(true);
          expect(body.data.length).toBeGreaterThan(0);
        });
    });

    it('should return the initial contacts', () => {
      return request(app.getHttpServer())
        .get('/contacts')
        .expect(200)
        .expect((res) => {
          const body = res.body as ContactsResponse;
          expect(body.success).toBe(true);
          expect(body.data).toHaveLength(2);
          expect(body.data[0].name).toBe('Contact 1');
          expect(body.data[1].name).toBe('Contact 2');
        });
    });
  });

  describe('/contacts (POST)', () => {
    it('should create a new contact', () => {
      const newContact = { name: 'Test Contact', email: 'test@example.com' };

      return request(app.getHttpServer())
        .post('/contacts')
        .send(newContact)
        .expect(201)
        .expect((res) => {
          const body = res.body as ContactResponse;
          expect(body.success).toBe(true);
          expect(body.data).toMatchObject({
            name: newContact.name,
            email: newContact.email,
          });
          expect(body.data.id).toBeDefined();
          expect(body.error).toBeNull();
        });
    });

    it('should add the contact to the list', async () => {
      const newContact = { name: 'E2E Test Contact', email: 'e2e@example.com' };

      // Create a contact
      await request(app.getHttpServer())
        .post('/contacts')
        .send(newContact)
        .expect(201);

      // Verify it appears in the list
      return request(app.getHttpServer())
        .get('/contacts')
        .expect(200)
        .expect((res) => {
          const body = res.body as ContactsResponse;
          expect(body.data).toContainEqual(
            expect.objectContaining({
              name: newContact.name,
              email: newContact.email,
            }),
          );
        });
    });

    it('should handle optional email field', () => {
      return request(app.getHttpServer())
        .post('/contacts')
        .send({ name: 'Contact Without Email' })
        .expect(201)
        .expect((res) => {
          const body = res.body as ContactResponse;
          expect(body.success).toBe(true);
          expect(body.data.name).toBe('Contact Without Email');
          expect(body.data.email).toBeUndefined();
        });
    });
  });
});
