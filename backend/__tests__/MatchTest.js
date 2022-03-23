'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

let app = require('../app');
let request = require('supertest');

//genrate a random collection's name
const DB_NAME = 'testDB' + Math.floor(Math.random() * 1000000);
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
beforeAll(async () => {
  await mongoose.connect(DB_URL).catch(error => {
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
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});



describe('Test get a list of users(in uid) that are matched with the current user', () => {

  test('user1 like user2', async () => {
    return request(app).patch('/api/like/' + uid1).set('Authorization', 'Bearer ' + token1).send({
      uid: uid2
    }).expect(200).then((res) => {
      expect(res.body.matched).toEqual(false);
    })
  })

  test('user2 like user1', async () => {
    return request(app).patch('/api/like/' + uid2).set('Authorization', 'Bearer ' + token2).send({
      uid: uid1
    }).expect(200).then((res) => {
      expect(res.body.matched).toEqual(true);
    })
  })

  test('Without authorized token', async () => {
    return request(app).get('/api/match/list/' + uid1).send({
    }).expect(401);
  })

  // should be 404
  test('With non-created uid', async () => {
    return request(app).get('/api/match/list/' + "123").set('Authorization', 'Bearer ' + token1).send({
    }).expect(401);
  })

  test('With wrong uid', async () => {
      return request(app).get('/api/match/list/' + uid2).set('Authorization', 'Bearer ' + token1).send({
      }).expect(401);
  })


  test('With correct uid, user1 match with user2', async () => {
    return request(app).get('/api/match/list/' + uid1).set('Authorization', 'Bearer ' + token1).send({
    }).expect(200).then((res) =>{
      expect(res.body[0]).toEqual(uid2);
    })
  })

  test('With correct uid, user2 match with user1', async () => {
    return request(app).get('/api/match/list/' + uid2).set('Authorization', 'Bearer ' + token2).send({
    }).expect(200).then((res) =>{
      expect(res.body[0]).toEqual(uid1);
    })
  })

  // test('With correct uid, no one match with user3', async () => {
  //   return request(app).get('/api/match/list/' + uid3).set('Authorization', 'Bearer ' + token3).send({
  //   }).expect(200).then((res) =>{
  //     expect(res.body).toEqual(uid1);
  //   })
  // })
});
