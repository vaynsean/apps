const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

describe('User API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('msg', 'Verification email sent');
    });
  });
});
