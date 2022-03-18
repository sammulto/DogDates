'use strict';

const HttpError = require("../models/http-error");
const { UserModel, viewListModel } = require("../persistence/db-schema");

const DBfailedHttpError = new HttpError(
  "Database operation failed, please try again",
  500
);

const getNextUser = async (req, res, next) => {
  
  const userUid = req.params.uid;
  const tokenUid = req.userData.uid; //userData is provided by authenticator middleware
  let unseenUidList; //list of unseen user's uid
  let responseInfo; //userInfo to sent in response

  //verify if the token holder's uid matchs the req's uid
  if(userUid !== tokenUid){
    return next(new HttpError("User doesn't match with the token!", 401));
  }

  try{
    //fetch user's viewList info
    let userViewList = await viewListModel.findOne({ uid:userUid }).exec();
    const userInfo = await UserModel.findOne({ uid:userUid }).exec();

    //check if user exists in DB
    if (userViewList.length === 0 || userInfo.length === 0) {
      return next(new HttpError("UID not found!", 404));
    }

    //if the unseen user list is empty, add unseen user to the list
    if(userViewList.unseen.length === 0){

      console.log("finding unseen user");

      //get a list of uid in the current user's city
      const city = userInfo.city;
      const result = await UserModel.find({ 
        city: city, uid: { $ne: userUid} 
      }).select("uid -_id").exec();
      let uidList = result.map( item => item.uid);

      //remove the seen uid
      unseenUidList = uidList.filter(
        item => !(userViewList.liked.includes(item) ||
         userViewList.matched.includes(item) ||
         userViewList.disliked.includes(item))
      );

      userViewList.unseen = unseenUidList;
      await userViewList.save();
    }

    //check if there is any unseen user
    if(userViewList.unseen.length !== 0){

      console.log("getting unseen user");

      //remove one unseen user from the list
      const unseenUid = userViewList.unseen.pop();

      //get unseen user's info
      responseInfo = await UserModel.find({ uid: unseenUid })
        .select("-_id -email -password -token -__v").exec();
      
      if(responseInfo.length === 0){
        return next(new HttpError("User ID not found!", 404));
      }else{
        responseInfo = responseInfo[0];
      }

      //update DB record
      await userViewList.save();

      //return unseen user's info 
      res.status(200).json(responseInfo);

    }else{
     //return a 404 error
     return next(new HttpError("No unviewed user is found!", 404));
    }
    
  }catch(err){
    // return error if DB operation fails
    console.log(err); 
    return next(DBfailedHttpError);
  }
  
};

exports.getNextUser = getNextUser;