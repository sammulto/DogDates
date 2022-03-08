const HttpError = require("../models/http-error");
const { UserModel } = require("../persistence/db-schema");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const DBfailedHttpError = new HttpError(
  "Database operation failed, please try again",
  500
);

const getUserList = async (req, res, next) => {
  //hide the sensitive properties from query results 
  const users = await UserModel.find().select('-password -token -email -_id -__v').exec();
  res.status(201).json(users);
};

const getUserById = async (req, res, next) => {
  const uid = req.params.uid;

  let user = false;
  try {
    let result = await UserModel.find({ uid: uid }).select('-password -token -email -_id -__v').exec();
    if (result.length !== 0) {
      user = result[0];
    }
  } catch (error) {
    throw DBfailedHttpError;
  }
  //return error if uid is not valid
  if (!user) {
    return next(new HttpError("User does not exist!", 404));
  }

  res.status(201).json(user);
};

const updateUserById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const uid = req.params.uid;
  const inputUid = req.params.uid;
  const tokenUid = req.userData.uid;

  //verify if the token holder's uid matchs the req's uid
  if(inputUid !== tokenUid){
    return next(new HttpError("User doesn't match with the token!", 404));
  }

  //get params from request body
  const { ownerName, dogName, city, description, email } = req.body;
  let user = null;
  let picturePath = "default";
  if(req.file){
    console.log(req.file);
    picturePath = req.file.path;
  }

  //update user info
  const result = await UserModel.find({ uid: inputUid }).exec();
  if (result.length !== 0) user = result[0];

  //return error if uid is not valid
  if (!user){

    return next(new HttpError("User does not exist!", 404));
  
    //user exists, replace the fields in the database
  }else {

    //if req contains a password, handle password update
    let hashedPassword = user.password;
    if(req.body.password){
      try {
        hashedPassword = await bcrypt.hash(req.body.password, 10);
      } catch (error) {
        return next(new HttpError("Something went wrong, please try again.", 500));
    }

    //if req contains an image, handle image update
    let picturePath = user.picturePath;
    if(req.file.path){
      picturePath = req.file.path;
    }

  }
    UserModel.findByIdAndUpdate(
      user._id,
      { 
        email:email,
        ownerName: ownerName, 
        city: city, 
        dogName: dogName, 
        description:description, 
        pictures: picturePath,
        password: hashedPassword
      },
      function (error) {
        if (error) return next(DBfailedHttpError);
      }
    );

    //update user's content
    user.email = email;
    user.ownerName = ownerName;
    user.city = city;
    user.dogName = dogName;
    user.description = description;
    user.pictures = [picturePath];

    //send response
    res.status(201).json({ msg: "user updated.", user });
  }
};

const deleteUserById = async (req, res, next) => {
  const inputUid = req.params.uid;
  const tokenUid = req.userData.uid;

  //verify if the token holder's uid matchs the req's uid
  if(inputUid !== tokenUid){
    return next(new HttpError("User doesn't match with the token!", 404));
  }

  let user = null;

  const result = await UserModel.find({ uid: inputUid }).exec();
  if (result.length !== 0) user = result[0];

  //return error if uid is not valid
  if (!user) {
    return next(new HttpError("User does not exist!", 404));
  }

  //remove user from fakeDB
  UserModel.findOneAndDelete({ _id: user._id }, function (error) {
    if (error) return next(DBfailedHttpError);
  });

  //send response
  res.status(201).json({ msg: "user deleted.", user });
};

exports.getUserById = getUserById;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
exports.getUserList = getUserList;
