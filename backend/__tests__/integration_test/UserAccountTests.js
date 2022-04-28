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
let uid2 = "";
let token2 = "";

//setup DB before tests
beforeAll ( async ()=> {
  await mongoose.connect(DB_URL).catch( error => {
    console.log('Failed to connect to MongoDB');
    console.log(error);
  });

  //add users to DB
  await request(app).post('/api/signup').send({
    email: "abcd@a.com",
    password: "123456",
    ownerName: "Franklin",
    dogName: "Snow",
    city: "Winnipeg",
    description: "Hello, I'm Franklin and my dog is Snow.",
    pictures: ["9uf234hf40.jpg"],
  }).then((res) => {
    uid1 = res.body.uid;
    token1 = res.body.token;
  });

  await request(app).post('/api/signup').send({
    email: "abcde@a.com",
    password: "123456",
    ownerName: "Christina",
    dogName: "Happy",
    city: "Winnipeg",
    description: "Hello, I'm Christina and my dog is Happy.",
    pictures: ["9uf234hf40.jpg"],
  }).then((res) => {
    uid2 = res.body.uid;
    token2 = res.body.token;
  });

});


//drop collection and close DB connection after tests
afterAll ( async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});


describe('Test update user profile', () => {
   
    test('Change user1 info: dogName', async () => {
        return request(app).patch('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({
            email: "abcd@a.com",
            ownerName: "Franklin",
            dogName: "Sun",
            city: "Winnipeg",
        }).expect(201).then((res) => {
            expect(res.body.user.dogName).toEqual("Sun");
        })
    })

    test('Change user1 info: description', async () => {
        return request(app).patch('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({
            email: "abcd@a.com",
            ownerName: "Franklin",
            dogName: "Sun",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Sun.",
            pictures: ["9uf234hf41.jpg"],
        }).expect(201).then((res) => {
            expect(res.body.user.description).toEqual("Hello, I'm Franklin and my dog is Sun.");
        })
    })

    test('Change user1 info: pictures', async () => {
        return request(app).patch('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({
            email: "abcd@a.com",
            ownerName: "Franklin",
            dogName: "Sun",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Sun.",
            pictures: ["9uf234hf42.jpg"],
        }).expect(201)
    })

    test('Change user2 info: dogName, city, description and pictures', async () => {
        return request(app).patch('/api/users/' + uid2).set('Authorization', 'Bearer ' + token2).send({
            email: "abcde@a.com",
            ownerName: "Christina",
            dogName: "Sad",
            city: "Toronto",
            description: "Hello, I'm Christina and my dog is Sad.",
            pictures: ["9uf234hf44.jpg"],
        }).expect(201).then((res) => {
            expect(res.body.user.dogName).toEqual("Sad");
            expect(res.body.user.city).toEqual("Toronto");
            expect(res.body.user.description).toEqual("Hello, I'm Christina and my dog is Sad.");
        })
    })
});




describe('Test delete user', () => {
   
    test('clean user1', async () => {
        return request(app).delete('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({
        }).expect(201);
    })

    test('clean user2', async () => {
        return request(app).delete('/api/users/' + uid2).set('Authorization', 'Bearer ' + token2).send({
        }).expect(201);
    })
});


describe('Test update user profile after delete', () => {
   
    test('Change user1 info: dogName', async () => {
        return request(app).patch('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({
            email: "abcd@a.com",
            ownerName: "Franklin",
            dogName: "Sun",
            city: "Winnipeg",
        }).expect(404);
    })

    test('Change user1 info: description', async () => {
        return request(app).patch('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({
            email: "abcd@a.com",
            ownerName: "Franklin",
            dogName: "Sun",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Sun.",
            pictures: ["9uf234hf41.jpg"],
        }).expect(404)
    })

    test('Change user1 info: pictures', async () => {
        return request(app).patch('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({
            email: "abcd@a.com",
            ownerName: "Franklin",
            dogName: "Sun",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Sun.",
            pictures: ["9uf234hf42.jpg"],
        }).expect(404)
    })

    test('Change user2 info: dogName, city, description and pictures', async () => {
        return request(app).patch('/api/users/' + uid2).set('Authorization', 'Bearer ' + token2).send({
            email: "abcde@a.com",
            ownerName: "Christina",
            dogName: "Sad",
            city: "Toronto",
            description: "Hello, I'm Christina and my dog is Sad.",
            pictures: ["9uf234hf44.jpg"],
        }).expect(404)
    })
});
