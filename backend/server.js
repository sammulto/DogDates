//This is the entry point of the backend
'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./app');

const DB_URL = 'mongodb+srv://' + 
  process.env.DB_USER + ':' + 
  process.env.DB_PASSWORD + '@cluster0.hxpf1.mongodb.net/' + 
  process.env.DB_NAME + '?retryWrites=true&w=majority';

//start server only if DB connect successfully
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Server is running...');
    app.listen(process.env.SERVER_PORT);    
  })
  .catch( error => {
    console.log('Failed to connect to MongoDB');
    console.log(error);
  });