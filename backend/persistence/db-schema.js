//this file defines the schema for MongoDB collections
"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

//this schema stores user's info
const userSchema = new Schema({
  uid: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 }, //should be the hash value of the password
  ownerName: { type: String, required: true },
  dogName: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String },
  pictures: [String],
  token: { type: String },
});

//this schema stores info related to like/dislike/match info
const viewListSchema = new Schema({
  uid: { type: String, required: true },
  hasNewMatch: { type: Boolean },
  //arrays of uid
  matched: [String],
  liked: [String],
  disliked: [String],
  unseen: [String],
});

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model("User", userSchema);
const viewListModel = mongoose.model("viewList", viewListSchema);

module.exports = {
  UserModel: UserModel,
  viewListModel: viewListModel,
};
