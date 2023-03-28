const app = require('./app.js');
const fs = require('fs')
const supertest = require('supertest-session');

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

    it('POST /auth/logout - Should log me out of the admin account', async () => {
        const response = await request.get('/auth/logout');

        expect(response.statusCode).toBe(200);
        expect(response.body.authenticated).toBe(false);
    });
});


// creating test database
const { Pool } = require('pg');
const makeid = require('./helpers/makeid.js');

// initialising test database with test db url
let db = new Pool({
    connectionString: "postgres://ixcaudug:VDR2bn6KlbHgKwI6TmRAvAMmZESR5VIJ@trumpet.db.elephantsql.com/ixcaudug"
});

// seeding database with the testing data
const sql = fs.readFileSync(process.cwd() + '/src/config/setup.sql').toString();
db.query(sql)
    .then(data => {
        db.end();
        console.log("Set-up complete.");
    })
    .catch(error => console.log(error));

describe('Database Tests - /event', () => {
    it('POST /auth/login - Should log me in as admin.', async () => {
        const response = await request.post('/auth/login').send({ username: "admin", password: "admin" });

        expect(response.statusCode).toBe(200);
        expect(response.body.authenticated).toBe(true);
    });

    it('POST /event - Should create a new event as an admin.', async () => {
        let payload = {
            upvotes: 99, title: "This is a test event.", description: "I repeat, this is a test event. This description is just dummy text in order to make it look like there is some kind of even being described. If you've read this far I don't know wheather to commend or question you...", location: "London"
        };
        const response = await request.post('/events').send(payload);


        expect(response.statusCode).toBe(201);
    });

    it('GET /auth/logout - Should log user out.', async () => {
        const response = await request.get('/auth/logout');

        expect(response.statusCode).toBe(200);
        expect(response.body.authenticated).toBe(false);
    });

    it('POST X2 /auth/register - Should register, and login user.', async () => {
        // create random username and register account
        let hash = makeid(4)
        let username = "test_user" + hash;
        const response = await request.post('/auth/register').send({ username, email: "whocares@gmail.com", password: "test_password" });

        expect(response.statusCode).toBe(201);

        // login with the created credentials
        let response2 = await request.post('/auth/login').send({ username, password: "test_password" });

        expect(response2.statusCode).toBe(200);
        expect(response2.body.authenticated).toBe(true);
    });
});