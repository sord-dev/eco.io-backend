const app = require('./app.js');
const supertest = require('supertest-session');
const { createTestDBEnv, destroyTestDBEnv } = require('./config/postgresdb.js');

const request = supertest(app);

describe('Event Routes - /events - not logged in', () => {
    it('GET /events/all - Should return with 401 unauthorised.', async () => {
        const response = await request.get('/events/all');

        expect(response.statusCode).toBe(401);
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

    it('GET /auth/logout - Should log me out of the admin account', async () => {
        const response = await request.get('/auth/logout');

        expect(response.statusCode).toBe(200);
        expect(response.body.authenticated).toBe(false);
    });
});

describe('User Routes - /users', () => {
    // create temp tables
    beforeEach(async () => await createTestDBEnv())

    // drop temporary tables
    afterEach(async () => await destroyTestDBEnv())

    it('POST /auth/login - Should log me in as admin.', async () => {
        const response = await request.post('/auth/login').send({ username: "admin", password: "admin" });

        expect(response.statusCode).toBe(200);
        expect(response.body.authenticated).toBe(true);
    });

    it('GET /users/top - Should respond with array of users ranked by events attended', async () => {
        const response = await request.get('/users/top');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('GET /users/bookings - Should respond with array of users bookings', async () => {
        const response = await request.get('/users/bookings');

        expect(response.statusCode).toBe(200);
        expect(response.body[0].username).toBe("admin");
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /users/bookings - Should respond with 201 created succesfully', async () => {
        const response = await request.post('/users/bookings').send({ user_id: 1, event_id: 1 });

        expect(response.statusCode).toBe(201);
        expect(typeof response.body.booking_id).toBe("number");
    });

    it('GET /auth/logout - Should log me out of the admin account', async () => {
        const response = await request.get('/auth/logout');

        expect(response.statusCode).toBe(200);
        expect(response.body.authenticated).toBe(false);
    });
});

describe('DB TESTS - /events + /auth', () => {
    // create temp tables
    beforeEach(async () => await createTestDBEnv())

    // drop temporary tables
    afterEach(async () => await destroyTestDBEnv())

    it('POST X2 ["/auth/register", "/auth/login"] - Should register a new admin, then log me in as the new admin', async () => {
        const response = await request.post('/auth/register').send({ username: "admin4", email: "pan@gmail.com", password: "admin", isAdmin: true });

        expect(response.statusCode).toBe(201);

        const response2 = await request.post('/auth/login').send({ username: "admin4", password: "admin" });

        expect(response2.statusCode).toBe(200);
        expect(response2.body.authenticated).toBe(true);
    });

    it('POST X2, DEL ["/auth/login", "/events", "/events"] - Should log me in as admin and create an event, then delete the event', async () => {
        const response = await request.post('/auth/login').send({ username: "admin", password: "admin" });

        expect(response.statusCode).toBe(200);
        expect(response.body.authenticated).toBe(true);

        const response2 = await request.post('/events').send({
            upvotes: 99,
            title: "This is a test event.",
            description: "I repeat, this is a test event. This description is just dummy text in order to make it look like there is some kind of even being described. If you've read this far I don't know wheather to commend or question you...",
            location: "London"
        });

        expect(response2.statusCode).toBe(201);
        expect(response2.body.approved).toBe(false);

        console.log(response2.body);

        let tempEventID = response2.body.event_id;

        const response3 = await request.del(`/events/${tempEventID}`);

        expect(response3.statusCode).toBe(200);
        expect(typeof response3.body.event_id).toBe("number");
        expect(typeof response3.body.approved).toBe("boolean");
    });

});