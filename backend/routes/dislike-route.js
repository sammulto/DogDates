"use strict";

const express = require("express");
const { check } = require("express-validator");

const controller = require("../controllers/dislike-controller");

const router = express.Router();

//add the disliked user's uid to disliked list
router.patch(
  "/:uid",
  [check("uid").not().isEmpty()],
  controller.addUidToDislikeList
);

module.exports = router;
