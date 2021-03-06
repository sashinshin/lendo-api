const app = require('./app.js');
const request = require('supertest');
const { deleteAllDb } = require('./database/models/dbHelpers.js');
const { expect, describe } = require('@jest/globals');

jest.mock('axios');

afterAll(() => deleteAllDb());

describe('API tests', () => {

    describe('Test POST', () => {

        test('Should respond with 200 status code', async () => {
            const data = {    
                id: "e22a30af-55bf-4e1a-a186-850fb6eb49da",
                first_name: "John",
                last_name: "Doe",
            }
            const response = await request(app).post('/api/applications').send(data);
            expect(response.statusCode).toBe(200);
        });

        test('Should respond with 400 status code', async () => {
            const data = { status: 'error' };
            const response = await request(app).post('/api/applications').send(data);
            expect(response.statusCode).toBe(400);
        });

    });

    describe('Test GET', () => {

        test('Get all applications', async () => {
            const response = await request(app).get('/api/applications');
            expect(response.body[0].first_name).toEqual('John');
        });
    
        test('Get application by status', async () => {
            const response = await request(app).get('/api/applications?status=rejected');
            expect(response.body[0].status).toEqual('rejected');
        });

        test('Get specific application', async () => {
            const response = await request(app).get('/api/applications/e22a30af-55bf-4e1a-a186-850fb6eb49da');
            expect(response.body[0].id).toEqual('e22a30af-55bf-4e1a-a186-850fb6eb49da');
        });

        test('Application not found, should 404', async () => {
            const response = await request(app).get('/api/applications/e23a30af-55bf-4e1a-a186-850fb6eb49da');
            expect(response.statusCode).toEqual(404);
        });

    });

});
