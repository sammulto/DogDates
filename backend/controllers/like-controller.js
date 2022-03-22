"use strict";

const HttpError = require("../models/http-error");
const { viewListModel } = require("../persistence/db-schema");
const { validationResult } = require("express-validator");

const DBfailedHttpError = new HttpError(
  "Database operation failed, please try again",
  500
);

const addUidToLikeList = async (req, res, next) => {

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
  if(userUid !== tokenUid){
    return next(new HttpError("User doesn't match with the token!", 401));
  }

  const { uid:targetUid } = req.body;
  let matchedResult = false;

  //check if the target user and the current user are the same user
  if (targetUid === userUid) {
    return next(
        new HttpError("You can't like yourself.", 422)
    );
  }

  try{
    //get the liked user's View list
    let targetUserViewList = await viewListModel.findOne({ uid:targetUid }).exec();
    
    //fetch the current user's liked list
    let userViewList = await viewListModel.findOne({ uid:userUid }).exec();

    //validate if both users exist
    if (!targetUserViewList || !userViewList) {
      return next(new HttpError("User ID not found!", 404));
    }

    //check if they're match
    matchedResult = targetUserViewList.liked.includes(userUid);
    
    if(matchedResult){

      //add users to each other's match list
      targetUserViewList.matched.push(userUid);
      targetUserViewList.hasNewMatch = true;
      userViewList.matched.push(targetUid);
      userViewList.hasNewMatch = true;
      //remove current user from target user's liked list
      targetUserViewList.liked = targetUserViewList.liked.filter(
          item => item !== userUid);
      //update DB's records
      await targetUserViewList.save();
      await userViewList.save();

    }else{

      //if not match, update current user's liked list
      userViewList.liked.push(targetUid);
      await userViewList.save();
    }

  }catch(err){
    // return 500 error if DB operation fails
    console.log(err); 
    return next(DBfailedHttpError);
  }

  //send response
  res.status(200).json({ matched: matchedResult });

};

exports.addUidToLikeList = addUidToLikeList;
