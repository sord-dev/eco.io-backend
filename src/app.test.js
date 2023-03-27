const app = require('./app.js');
const supertest = require('supertest-session');

const request = supertest(app);

describe('Event Routes - /events - not logged in', () => {

    it('GET /events/all - Should get all events.', async () => {
        const response = await request.get('/events/all');

        expect(response.statusCode).toBe(200);
        expect(typeof response.body[0].event_id).toBe("number");
        expect(typeof response.body[0].description).toBe("string");
    });

    it('GET /events - Should respond with unauthorised', async () => {
        const response = await request.get('/events');

        let message = JSON.stringify({ message: 'You need to be logged in to see this route.' });

        expect(response.statusCode).toBe(401);
        expect(JSON.stringify(response.body)).toBe(message);
    });

});

describe('Auth Routes - /auth', () => {
    it('POST /auth/login - Should log me in as admin.', async () => {
        const response = await request.post('/auth/login').send({ username: "admin", password: "admin" });

        expect(response.statusCode).toBe(200);
        expect(response.body.authenticated).toBe(true);
    });

    it('GET /events - Should respond with array of user items', async () => {
        const response = await request.get('/events');

        expect(response.statusCode).toBe(200);
        expect(typeof response.body[0].event_id).toBe("number");
    });

    it('POST /auth/logout - Should log me out of the admin account', async () => {
        const response = await request.get('/auth/logout');

        expect(response.statusCode).toBe(200);
        expect(response.body.authenticated).toBe(false);
    });
});
