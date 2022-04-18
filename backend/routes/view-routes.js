"use strict";

const express = require("express");

const controller = require("../controllers/view-controller");

const router = express.Router();

//get the list of user's liked users
router.get("/:uid", controller.getNextUser);

module.exports = router;
