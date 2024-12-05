const { createUser } = require('../services/users');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const { getFriends } = require('../controllers/users');
const userService = require('../services/users');
const { mockRequest, mockResponse } = require('mock-req-res');
const request = require('supertest');
const app = require('../app'); 
const mongoose = require('mongoose');
const Article = require('../models/article');
const express = require('express');
const http = require('http');  // Add this import

// Mock the User model
jest.mock('../models/users');
//creatUser
describe('createUser Service', () => {
    it('should create a new user when username does not exist', async () => {
        // Mock no existing user
        User.findOne.mockResolvedValue(null);
        
        // Mock save method to return a new user object
        User.prototype.save = jest.fn().mockResolvedValue({
            userName: 'testUser',
            firstName: 'Test',
            lastName: 'User',
            profilePic: 'testPic.jpg',
        });

        // Mock bcrypt.hash to return a hashed password
        bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

        // Call the createUser function and check the results
        const result = await createUser('testUser', 'password123', 'Test', 'User', 'testPic.jpg');
        
        // Assert that the correct methods were called with the expected arguments
        expect(User.findOne).toHaveBeenCalledWith({ userName: 'testUser' });
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        expect(result).toHaveProperty('userName', 'testUser');
    });

    it('should throw an error if username already exists', async () => {
        // Mock existing user
        User.findOne.mockResolvedValue({ userName: 'testUser' });

        // Test that the createUser function throws an error if the user already exists
        await expect(createUser('testUser', 'password123', 'Test', 'User', 'testPic.jpg'))
            .rejects.toThrow('User already exists');
    });
});


// __tests__/controller/userController.test.js

describe('getFriends Controller', () => {
    it('should return friends list when user is authenticated and authorized', async () => {
        const req = mockRequest({ user: { userName: 'testUser', friends: ['friendId'] }, params: { id: 'targetUserName' } });
        const res = mockResponse();

        res.status = jest.fn().mockReturnValue(res);  // mock status method
        res.json = jest.fn();  // mock json method

        // Mock the service to return a list of friends
        userService.getAuthorizedFriends = jest.fn().mockResolvedValue([{ userName: 'friend1' }, { userName: 'friend2' }]);

        // Call the controller
        await getFriends(req, res, jest.fn());

        // Assert that the response was sent with status 200 and correct data
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ userName: 'friend1' }, { userName: 'friend2' }]);
    });

    it('should throw 401 error if user is not authenticated', async () => {
        const req = mockRequest({ user: null, params: { id: 'targetUserName' } });
        const res = mockResponse();
        const next = jest.fn();

        // Call the controller
        await getFriends(req, res, next);

        // Assert that the next middleware is called with a 401 error
        expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 401, message: 'User not authenticated' }));
    });

    it('should throw 403 error if user is not authorized to access friends', async () => {
        const req = mockRequest({ user: { userName: 'testUser', friends: [] }, params: { id: 'targetUserName' } });
        const res = mockResponse();
        const next = jest.fn();

        // Mock the service to throw a 403 error
        const error = new Error('Not Friends');
        error.status = 403;
        userService.getAuthorizedFriends = jest.fn().mockRejectedValue(error);

        // Call the controller
        await getFriends(req, res, next);

        // Assert that the next middleware is called with a 403 error
        expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 403, message: 'Not Friends' }));
    });



    it('should throw 404 error if target user is not found', async () => {
        const req = mockRequest({ user: { userName: 'testUser' }, params: { id: 'nonExistentUser' } });
        const res = mockResponse();
        const next = jest.fn();

        // Mock the service to throw a 404 error
        const error = new Error('User not found');
        error.status = 404;
        userService.getAuthorizedFriends = jest.fn().mockRejectedValue(error);

        await getFriends(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 404, message: 'User not found' }));
    });
});

describe('getRequests Service', () => {
    it('should return friend requests when requests exist', async () => {
        User.find = jest.fn().mockResolvedValue([
            { userName: 'friend1' },
            { userName: 'friend2' }
        ]);

        const user = { userName: 'testUser', requestsFriends: ['friend1', 'friend2'] };

        const requests = await userService.getRequests(user);

        expect(requests).toEqual([
            { userName: 'friend1' },
            { userName: 'friend2' }
        ]);
    });

   it('should return null if no requests are found', async () => {
    User.find = jest.fn().mockResolvedValue([]);

    const user = { userName: 'testUser', requestsFriends: [] };

    const result = await userService.getRequests(user);
    expect(result).toEqual([]);});


    it('should throw an error if there is a database issue', async () => {
        User.find = jest.fn().mockRejectedValue(new Error('Database error'));

        const user = { userName: 'testUser', requestsFriends: ['friend1'] };

        await expect(userService.getRequests(user)).rejects.toThrow('Failed to fetch friend requests');
    });
});

let server;  // Declare server in the outer scope

// Mock authentication middleware and login controller for testing
jest.mock('../controllers/login', () => ({
  isLoggedIn: (req, res, next) => {
    req.user = {
      _id: 'mockUserId',
      userName: 'testUser',
      friends: [],
      requestsFriends: []
    };
    next();
  },
  processLogin: (req, res) => {
    res.status(200).json({ token: 'mockToken' });
  }
}));

describe('Integration Tests for Users API', () => {
  beforeAll(async () => {
    // Establish database connection
    await mongoose.connect(process.env.TEST_CONNECTION_STRING || 'mongodb://localhost:27017/testdb');

    // Create HTTP server for supertest
    server = http.createServer(app);
  });

  afterAll(async () => {
    // Close server and database connection
    if (server) server.close();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear collections before each test
    await User.deleteMany({});
    await Article.deleteMany({});
  });

  test('POST / - create a new user', async () => {
    const newUser = {
      userName: 'testUser',
      password: 'testPassword',
      firstName: 'Test',
      lastName: 'User',
      profilePic: 'http://example.com/pic.jpg',
    };

    const res = await request(server).post('/api/users').send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.userName).toBe(newUser.userName);
  });

  test('GET /:id - retrieve a user', async () => {
    const user = new User({
      userName: 'testUser',
      password: 'hashedPassword',
      firstName: 'Test',
      lastName: 'User',
      profilePic: 'http://example.com/pic.jpg',
    });
    await user.save();

    const res = await request(server)
      .get(`/api/users/${user.userName}`)
      .set('Authorization', 'Bearer fakeToken'); 
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
  });

  test('PATCH /:id - update a user', async () => {
    const user = new User({
      userName: 'testUser',
      password: 'hashedPassword',
      firstName: 'Test',
      lastName: 'User',
      profilePic: 'http://example.com/pic.jpg',
    });
    await user.save();

    const updatedData = {
      firstName: 'UpdatedTest',
    };

    const res = await request(server)
      .patch(`/api/users/${user.userName}`)
      .set('Authorization', 'Bearer fakeToken') 
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe(updatedData.firstName);
  });

  test('DELETE /:id - delete a user', async () => {
    const user = new User({
      userName: 'testUser',
      password: 'hashedPassword',
      firstName: 'Test',
      lastName: 'User',
      profilePic: 'http://example.com/pic.jpg',
    });
    await user.save();

    const res = await request(server)
      .delete(`/api/users/${user.userName}`)
      .set('Authorization', 'Bearer fakeToken'); 
    expect(res.statusCode).toBe(200);

    const deletedUser = await User.findOne({ userName: user.userName });
    expect(deletedUser).toBeNull();
  });
});
