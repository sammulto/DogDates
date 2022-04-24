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
let uid3 = "";
let token3 = "";

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

  await request(app).post('/api/signup').send({
    email: "abcdef@a.com",
    password: "123456",
    ownerName: "Robert",
    dogName: "Cold",
    city: "Winnipeg",
    description: "Hello, I'm Robert and my dog is Cold.",
    pictures: ["9uf234hf40.jpg"],
  }).then((res) => {
    uid3 = res.body.uid;
    token3 = res.body.token;
  });
});


//drop collection and close DB connection after tests
afterAll ( async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});



describe('Test get one user info', () => {
  test('Without authorized token', async () => {
    return request(app).get('/api/view/' + uid1).send({
    }).expect(401);
  })

  test('With wrong uid', async () => {
    return request(app).get('/api/view/' + uid2).set('Authorization', 'Bearer ' + token1).send({
    }).expect(401);
  })

  test('With correct uid, get next user(user3)', async () => {
    return request(app).get('/api/view/' + uid1).set('Authorization', 'Bearer ' + token1).send({
    }).expect(200).then((res) => {
      expect(res.body.uid).toEqual(uid3);
      expect(res.body.ownerName).toEqual("Robert");
      expect(res.body.dogName).toEqual("Cold");
      expect(res.body.city).toEqual("Winnipeg");
      expect(res.body.description).toEqual("Hello, I'm Robert and my dog is Cold.");
    })
  })

  test('With correct uid, get next user(user2)', async () => {
    return request(app).get('/api/view/' + uid1).set('Authorization', 'Bearer ' + token1).send({
    }).expect(200).then((res) => {
      expect(res.body.uid).toEqual(uid2);
      expect(res.body.ownerName).toEqual("Christina");
      expect(res.body.dogName).toEqual("Happy");
      expect(res.body.city).toEqual("Winnipeg");
      expect(res.body.description).toEqual("Hello, I'm Christina and my dog is Happy.");
    })
  })
});
