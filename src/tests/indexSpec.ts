import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('test endpoint: /api', (): void => {
  it('gets /api', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api');

    expect(response.status).toBe(200);
  });
});
