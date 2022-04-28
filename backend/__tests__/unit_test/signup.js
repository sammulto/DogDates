'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

let app = require('../../app');
let request = require('supertest');

//genrate a random collection's name
const DB_NAME = 'testDB' + Math.floor(Math.random()*1000000); 
const DB_URL = 'mongodb+srv://' + 
  process.env.DB_USER + ':' + 
  process.env.DB_PASSWORD + '@cluster0.hxpf1.mongodb.net/' + 
  DB_NAME + '?retryWrites=true&w=majority';

let uid1 = "";
let token1 = "";

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