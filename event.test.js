const request = require('supertest');
const app = require('./server');

describe('Event API', () => {
    let createdEventId;

    test('should create a new event', async () => {
        const response = await request(app)
            .post('/api/events')
            .send({
                title: "New Event",
                description: "Event Description",
                date: "2024-07-01T00:00:00Z",
                location: "Event Location",
                communityId: "6681fb563806d0ea7f70efc8",
                createdBy: "66732ad79de78276a33a05f3"
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        createdEventId = response.body._id; // Save for later use
    });

    test('should fetch all events', async () => {
        const response = await request(app).get('/api/events');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('should fetch event by ID', async () => {
        const response = await request(app).get(`/api/events/${createdEventId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', createdEventId);
    });

    test('should update an event', async () => {
        const response = await request(app)
            .put(`/api/events/${createdEventId}`)
            .send({
                title: "Updated Event Title"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('title', "Updated Event Title");
    });

    test('should delete an event', async () => {
        const response = await request(app).delete(`/api/events/${createdEventId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Event deleted successfully');
    });
});


