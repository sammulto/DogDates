"use strict";

const express = require("express");
const { check } = require("express-validator");

const controller = require("../controllers/like-controller");

const router = express.Router();

//add the liked user's uid to liked list
router.patch(
  "/:uid",
  [check("uid").not().isEmpty()],
  controller.addUidToLikeList
);

module.exports = router;
