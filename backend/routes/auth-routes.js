const express = require('express');
const { check } = require('express-validator');

const controller = require('../controllers/auth-controller');

const router = express.Router();

//new user sign up
router.post('/signup', controller.createUser);

//user login
router.post('/login', [
    check('userName').not().isEmpty(),
    check('password').not().isEmpty(),
], controller.userLogin);

module.exports = router;