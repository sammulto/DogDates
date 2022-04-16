"use strict";

const express = require("express");

const controller = require("../controllers/match-controller");

const router = express.Router();

//get the list of user's matched users
router.get("/list/:uid", controller.getMatchedList);

//get the uid's info with email address
router.get("/:uid", controller.getMatchedUserInfo);

module.exports = router;
