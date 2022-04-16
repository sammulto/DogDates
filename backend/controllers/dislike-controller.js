"use strict";

const HttpError = require("../models/http-error");
const { viewListModel } = require("../persistence/db-schema");
const { validationResult } = require("express-validator");

const DBfailedHttpError = new HttpError(
  "Database operation failed, please try again",
  500
);

const addUidToDislikeList = async (req, res, next) => {
  //reqeust input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const userUid = req.params.uid;
  const tokenUid = req.userData.uid; //userData is provided by authenticator middleware

  //verify if the token holder's uid matchs the req's uid
  if (userUid !== tokenUid) {
    return next(new HttpError("User doesn't match with the token!", 401));
  }

  const { uid: targetUid } = req.body;

  //check if the target user and the current user are the same user
  if (targetUid === userUid) {
    return next(new HttpError("You can't dislike yourself.", 422));
  }

  try {
    //fetch the current user's disliked list
    let userViewList = await viewListModel.findOne({ uid: userUid }).exec();

    //get the disliked user's View list
    let targetUserViewList = await viewListModel
      .findOne({ uid: targetUid })
      .exec();

    //validate if the users exist
    if (!userViewList || !targetUserViewList) {
      return next(new HttpError("User ID not found!", 404));
    }

    //update current user's disliked list
    userViewList.disliked.push(targetUid);
    await userViewList.save();
  } catch (err) {
    // return 500 error if DB operation fails
    console.log(err);
    return next(DBfailedHttpError);
  }

  //send response
  res.status(200).json({ message: "Dislike list updated!" });
};

exports.addUidToDislikeList = addUidToDislikeList;
