import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('GET /api/images routes', () => {
    it('responds with 400 without image name', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/api/images?name=&height=100&width=100');
        expect(response.status).toBe(400);
    });

    it('responds with 200 if called correctly and image exist', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/api/images?name=encenadaport.jpg&height=100&width=100');
        expect(response.status).toBe(200);
    });

});

