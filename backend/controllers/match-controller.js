"use strict";

const HttpError = require("../models/http-error");
const { UserModel, viewListModel } = require("../persistence/db-schema");
const { validationResult } = require("express-validator");

const DBfailedHttpError = new HttpError(
  "Database operation failed, please try again",
  500
);

const getMatchedList = async (req, res, next) => {

  const userUid = req.params.uid;
  const tokenUid = req.userData.uid; //userData is provided by authenticator middleware

  //verify if the token holder's uid matchs the req's uid
  if(userUid !== tokenUid){
    return next(new HttpError("User doesn't match with the token!", 401));
  }

  try{

    //fetch the current user's match list
    let userViewList = await viewListModel.findOne({ uid:userUid }).exec();

    //validate if the user exists
    if (userViewList.length === 0) {
      return next(new HttpError("User ID not found!", 404));
    }

    //send response
    res.status(200).json(userViewList.matched);

  }catch(err){
    // return 500 error if DB operation fails
    console.log(err); 
    return next(DBfailedHttpError);
  }

};

const getMatchedUserInfo = async (req, res, next) => {

    const targetUid = req.params.uid;

    try{
  
      //fetch the target user's info
      const matchedUserInfo = await UserModel.find({ uid: targetUid })
      .select("-_id -password -token -__v").exec();
  
      //validate if the user exists
      if (matchedUserInfo.length === 0) {
        return next(new HttpError("User ID not found!", 404));
      }
  
      //send response
      res.status(200).json(matchedUserInfo);
  
    }catch(err){
      // return 500 error if DB operation fails
      console.log(err); 
      return next(DBfailedHttpError);
    }
  
  };

  
exports.getMatchedList = getMatchedList;
exports.getMatchedUserInfo = getMatchedUserInfo;