const express = require('express');
const { check } = require('express-validator');

const controller = require('../controllers/users-controller');
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

//get user list
router.get('/', controller.getUserList);

//get the user by id
router.get('/:uid', controller.getUserById);

//update user's info
router.patch('/:uid', fileUpload.single("pictures"),
  [
    check("email").normalizeEmail().isEmail(),
    check('dogName').not().isEmpty(),
    check('city').not().isEmpty(),
    check('ownerName').not().isEmpty()
  ],
  controller.updateUserById
);

//delete the user
router.delete('/:uid', controller.deleteUserById);

module.exports = router;
