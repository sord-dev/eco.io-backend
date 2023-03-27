const app = require('./app.js');
const supertest = require('supertest');

const request = supertest(app);

describe('Event Routes - /events', () => {
   describe('Unprotected Routes', () => { 
    it('GET /events/all - Should get all events.', async () => {
        const response = await request.get('/events/all');

        expect(response.statusCode).toBe(200);
        
    });
    })

    describe('Protected Routes', () => { 
        it('GET /events - Should respond with unauthorised', async () => {
            const response = await request.get('/events');
    
            expect(response.statusCode).toBe(401);
        });
     })
});

describe('Auth Routes - /auth', () => {
    describe('Login Logout process', () => { 
     it('POST /auth/login - Should log me in.', async () => {
         const response = await request.post('/auth/login').send({username: "admin", password: "admin"});
 
         expect(response.statusCode).toBe(200);
     });

     it('POST /auth/logout - respond with "not logged in"', async () => {
        const response = await request.get('/auth/logout');

        expect(response.statusCode).toBe(400);
        expect(typeof response.body.message).toBe("string")
    });
     })
 
     
 });
 