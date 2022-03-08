let app = require('../app');
let request = require('supertest');

let uid1 = "";
let token1 = "";
let uid2 = "";
let token2 = "";

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
        }).expect(200).then((res) => {
            expect(res.body.uid).toEqual(uid1);
            uid1 = res.body.uid;
            expect(res.body.token).toEqual(token1);
            token1 = res.body.token;
        })
    })

    test('User2:Vaild email and password', async () => {
        return request(app).post('/api/auth/login').send({
            email: "abcde@a.com",
            password: "123456",
        }).expect(200).then((res) => {
            expect(res.body.uid).toEqual(uid2);
            uid2 = res.body.uid;
            expect(res.body.token).toEqual(token2);
            token2 = res.body.token;
        })
    })
});







describe('Test get a list of all user info', () => {
    test('Without authorized token', async () => {
        return request(app).get('/api/users').send({
        }).expect(401);
    })

    test('With authorized token', async () => {
        return request(app).get('/api/users').set('Authorization', 'Bearer ' + token1).send({
        }).expect(201);
    })
});







describe('Test get one user info', () => {
    test('Without authorized token', async () => {
        return request(app).get('/api/users' + uid1).send({
        }).expect(401);
    })

    test('With wrong uid', async () => {
        return request(app).get('/api/users/' + "123").set('Authorization', 'Bearer ' + token1).send({


        }).expect(404);
    })

    test('With correct uid', async () => {
        return request(app).get('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({
        }).expect(201);
    })
});







describe('Test update user profile', () => {
    test('Without authorized token and uid', async () => {
        return request(app).patch('/api/users').send({
            email: "abcd@a.com",
            ownerName: "Franklin",
            dogName: "Sun",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Sun.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(401);
    })

    test('Without authorized token and wrong uid', async () => {
        return request(app).patch('/api/users' + "123").send({
            email: "abcd@a.com",
            ownerName: "Franklin",
            dogName: "Sun",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Sun.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(401);
    })

    test('Without authorized token and uid', async () => {
        return request(app).patch('/api/users/' + uid1).send({
            email: "abcd@a.com",
            ownerName: "Franklin",
            dogName: "Sun",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Sun.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(401);
    })

    test('With wrong uid(not in database)', async () => {
        return request(app).patch('/api/users/' + "123").set('Authorization', 'Bearer ' + token1).send({
            email: "abcd@a.com",
            ownerName: "Franklin",
            dogName: "Sun",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Sun.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(404);
    })

    test('With wrong uid(not match with the token)', async () => {
        return request(app).patch('/api/users/' + uid2).set('Authorization', 'Bearer ' + token1).send({
            email: "abcde@a.com",
            ownerName: "Christina",
            dogName: "Sad",
            city: "Winnipeg",
            description: "Hello, I'm Christina and my dog is Happy.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(404)
    })

    test('With wrong uid(not match with the token)', async () => {
        return request(app).patch('/api/users/' + uid1).set('Authorization', 'Bearer ' + token2).send({
            email: "abcd@a.com",
            ownerName: "Franklin",
            dogName: "Sun",
            city: "Winnipeg",
            description: "Hello, I'm Franklin and my dog is Sun.",
            pictures: ["9uf234hf40.jpg"],
        }).expect(404)
    })

    test('Change user1 info: miss email,ownerName,dogName and city', async () => {
        return request(app).patch('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({

        }).expect(422)
    })

    test('Change user1 info: miss email', async () => {
        return request(app).patch('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({
            ownerName: "Franklin",
            dogName: "Sun",
            city: "Winnipeg",
        }).expect(422)
    })

    test('Change user1 info: miss ownerName', async () => {
        return request(app).patch('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({
            email: "abcd@a.com",
            dogName: "Sun",
            city: "Winnipeg",
        }).expect(422)
    })

    test('Change user1 info: miss dogName', async () => {
        return request(app).patch('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({
            email: "abcd@a.com",
            ownerName: "Franklin",
            city: "Winnipeg",
        }).expect(422)
    })

    test('Change user1 info: miss city', async () => {
        return request(app).patch('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({
            email: "abcd@a.com",
            ownerName: "Franklin",
            dogName: "Sun",
        }).expect(422)
    })

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
    test('Without authorized token and uid', async () => {
        return request(app).delete('/api/users/').set('Authorization', 'Bearer ').send({
        }).expect(401);
    })

    test('Without authorized token and wrong uid', async () => {
        return request(app).delete('/api/users/' + "123").set('Authorization', 'Bearer ').send({
        }).expect(401);
    })

    test('With wrong uid(not in database)', async () => {
        return request(app).delete('/api/users/' + "123").set('Authorization', 'Bearer ' + token1).send({
        }).expect(404);
    })

    test('With wrong uid(not match with the token)', async () => {
        return request(app).delete('/api/users/' + uid1).set('Authorization', 'Bearer ' + token2).send({
        }).expect(404);
    })

    test('With wrong uid(not match with the token)', async () => {
        return request(app).delete('/api/users/' + uid2).set('Authorization', 'Bearer ' + token1).send({
        }).expect(404);
    })

    test('clean user1', async () => {
        return request(app).delete('/api/users/' + uid1).set('Authorization', 'Bearer ' + token1).send({
        }).expect(201);
    })

    test('clean user2', async () => {
        return request(app).delete('/api/users/' + uid2).set('Authorization', 'Bearer ' + token2).send({
        }).expect(201);
    })
});
