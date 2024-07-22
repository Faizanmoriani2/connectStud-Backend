const request = require('supertest');
const app = require('./server'); // Ensure this path points to where your Express app is exported
const mongoose = require('mongoose');

describe('Community API', () => {
    let createdCommunityId;

    // Before all tests, ensure the database is connected and clean.
    beforeAll(async () => {
        // Connect to your test database, if different from the production one.
        // Here, ensure you connect to a test instance or mock database.
        await mongoose.connect(process.env.MONGO_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    // After all tests, disconnect from the database.
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Test case for creating a new community
    test('should create a new community', async () => {
        const response = await request(app)
            .post('/api/communities')
            .send({
                name: "Tech Enthusiasts",
                description: "A community for technology lovers",
                location: "Online",
                members: []
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name', 'Tech Enthusiasts');
        createdCommunityId = response.body._id; // Save the created community ID for later tests
    });

    // Test case for fetching all communities
    test('should fetch all communities', async () => {
        const response = await request(app).get('/api/communities');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    // Test case for fetching a community by ID
    test('should fetch a community by ID', async () => {
        const response = await request(app).get(`/api/communities/${createdCommunityId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', createdCommunityId);
    });

    // Test case for updating a community
    test('should update a community', async () => {
        const response = await request(app)
            .put(`/api/communities/${createdCommunityId}`)
            .send({
                name: "Updated Community Name"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name', "Updated Community Name");
    });

    // Test case for deleting a community
    test('should delete a community', async () => {
        const response = await request(app).delete(`/api/communities/${createdCommunityId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Community deleted successfully');
    });

    // Additional test case for fetching non-existing community
    test('should return 404 for non-existing community', async () => {
        const response = await request(app).get(`/api/communities/nonExistingId`);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error', 'Community not found');
    });
});