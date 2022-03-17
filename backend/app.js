//main app for the backend
'use strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const HttpError = require('./models/http-error');
const authenticator = require('./middleware/authenticator');
const usersRoutes = require('./routes/users-routes');
const likeRoutes = require('./routes/like-routes');
const matchRoutes = require('./routes/match-routes');
const authRoutes = require('./routes/auth-routes');
const signupRoutes = require('./routes/signup-routes');
const viewRoutes = require('./routes/view-routes');

const app = express();

//attach headers to responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Origin, X-Requested-With, Content-Type'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  // handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).send();
  }
  next();
});

//parse reqest body into JSON object
app.use(bodyParser.json());

//parse multipart/form-data
app.use('/upload/pictures', express.static(path.join('upload', 'pictures')));

//handle user signup and authentication
app.use('/api/signup', signupRoutes);
app.use('/api/auth',authRoutes);

//validate user's token before proceding to the protected API routes
app.use(authenticator);


/////////////////////////////////////////
// The following routes are protected  //
/////////////////////////////////////////

app.use('/api/users', usersRoutes);
app.use('/api/view',viewRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/match', matchRoutes);

//handle pictures request
app.use('/upload/pictures', express.static(path.join('upload', 'pictures')));

//handle errors
//unsupported route error
app.use((req, res, next)=> {
    const error = new HttpError('This route is undefined!', 400);
    next(error);
});

//other errors
app.use((err, req, res, next) => {
  if(req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(err);
  }
    res.status(err.code || 500)
    res.json({error: err.message || 'Something went wrong!'});
  });

  
module.exports = app;

