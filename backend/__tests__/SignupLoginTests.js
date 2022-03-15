'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

let app = require('../app');
let request = require('supertest');

//genrate a random collection's name
const DB_NAME = 'testDB' + Math.floor(Math.random()*1000000); 
const DB_URL = 'mongodb+srv://' + 
  process.env.DB_USER + ':' + 
  process.env.DB_PASSWORD + '@cluster0.hxpf1.mongodb.net/' + 
  DB_NAME + '?retryWrites=true&w=majority';

let uid1 = "";
let token1 = "";
let uid2 = "";
let token2 = "";

//setup DB before tests
beforeAll ( async ()=> {
  await mongoose.connect(DB_URL).catch( error => {
    console.log('Failed to connect to MongoDB');
    console.log(error);
  });
});


//drop collection and close DB connection after tests
afterAll ( async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});


describe('Test Create User Account', () => {
    test('Blank email', async () => {
        return request(app).post('/api/signup').send({
            email: "",
            password: "",
            ownerName: "Franklin",
            dogName: "Snow",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Snow.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(422);
    })

    test('Blank password', async () => {
        return request(app).post('/api/signup').send({
            email: "abcd@a.com",
            password: "",
            ownerName: "Franklin",
            dogName: "Snow",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Snow.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(422);
    })

    test('Password less than 6 chars', async () => {
        return request(app).post('/api/signup').send({
            email: "abcd@a.com",
            password: "12345",
            ownerName: "Franklin",
            dogName: "Snow",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Snow.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(422);
    })
    test('Blank ownerName', async () => {
        return request(app).post('/api/signup').send({
            email: "abcd@a.com",
            password: "123456",
            ownerName: "",
            dogName: "Snow",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Snow.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(422);
    })

    test('Blank dogName', async () => {
        return request(app).post('/api/signup').send({
            email: "abcd@a.com",
            password: "123456",
            ownerName: "Franklin",
            dogName: "",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Snow.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(422);
    })

    test('Blank city name', async () => {
        return request(app).post('/api/signup').send({
            email: "abcd@a.com",
            password: "123456",
            ownerName: "Franklin",
            dogName: "Snow",
            city: "",
            description: "Hello, I'm Franklin and my dog is Snow.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(422);
    })

    test('Blank description', async () => {
        return request(app).post('/api/signup').send({
            email: "abcd@a.com",
            password: "123456",
            ownerName: "Franklin",
            dogName: "Snow",
            city: "Winnipeg",
            description: "",
            pictures: ["9uf234hf40.jpg"],
        }).expect(422);
    })

    test('Blank pictures', async () => {
        return request(app).post('/api/signup').send({
            email: "abcd@a.com",
            password: "12345",
            ownerName: "Franklin",
            dogName: "Snow",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Snow.",
            pictures: [""],
        }).expect(422);
    })

    test('create a vaild account', async () => {
        return request(app).post('/api/signup').send({
            email: "abcd@a.com",
            password: "123456",
            ownerName: "Franklin",
            dogName: "Snow",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Snow.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(201).then((res) => {
            uid1 = res.body.uid;
            token1 = res.body.token;
            expect(res.body.email).toEqual("abcd@a.com");
            expect(res.body.ownerName).toEqual("Franklin");
            expect(res.body.dogName).toEqual("Snow");
            expect(res.body.city).toEqual("Winnipeg");
            expect(res.body.description).toEqual("Hello, I'm Franklin and my dog is Snow.");
        })
    })

    test('create another vaild account', async () => {
        return request(app).post('/api/signup').send({
            email: "abcde@a.com",
            password: "123456",
            ownerName: "Christina",
            dogName: "Happy",
            city: "Winnipeg",
            description: "Hello, I'm Christina and my dog is Happy.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(201).then((res) => {
            uid2 = res.body.uid;
            token2 = res.body.token;
            expect(res.body.email).toEqual("abcde@a.com");
            expect(res.body.ownerName).toEqual("Christina");
            expect(res.body.dogName).toEqual("Happy");
            expect(res.body.city).toEqual("Winnipeg");
            expect(res.body.description).toEqual("Hello, I'm Christina and my dog is Happy.");
        })
    })

    test('create a created account', async () => {
        return request(app).post('/api/signup').send({
            email: "abcd@a.com",
            password: "123456",
            ownerName: "Franklin",
            dogName: "Snow",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Snow.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(400);
    })
});



describe('Test User Login', () => {
    test('Blank email and password', async () => {
        return request(app).post('/api/auth/login').send({
            email: "",
            password: "",
        }).expect(400);
    })

    test('Blank email', async () => {
        return request(app).post('/api/auth/login').send({
            email: "",
            password: "123456",
        }).expect(400);
    })

    test('Blank password', async () => {
        return request(app).post('/api/auth/login').send({
            email: "abcd@a.com",
            password: "",
        }).expect(400);
    })

    test('Password not vaild', async () => {
        return request(app).post('/api/auth/login').send({
            email: "abcd@a.com",
            password: "12345",
        }).expect(400);
    })

    test('Wrong email format - no domain', async () => {
        return request(app).post('/api/auth/login').send({
            email: "abcd",
            password: "123456",
        }).expect(400);
    })

    test('Wrong email format - no @', async () => {
        return request(app).post('/api/auth/login').send({
            email: "abcdabc.com",
            password: "123456",
        }).expect(400);
    })

    test('Wrong email format - no prefix', async () => {
        return request(app).post('/api/auth/login').send({
            email: "@abc.com",
            password: "123456",
        }).expect(400);
    })

    test('Email not in our database', async () => {
        return request(app).post('/api/auth/login').send({
            email: "abcd@a.c",
            password: "123456",
        }).expect(400);
    })

    test('User1:Vaild email and password', async () => {
        return request(app).post('/api/auth/login').send({
            email: "abcd@a.com",
            password: "123456",
        }).expect(200);
    })

    test('User2:Vaild email and password', async () => {
        return request(app).post('/api/auth/login').send({
            email: "abcde@a.com",
            password: "123456",
        }).expect(200);
    })
});