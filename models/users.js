const mongoose = require('mongoose');
const {isEmail} = require('validator');


const userShema = new mongoose.Schema({
   firstName: {
    type: String,
    require: [true, 'Please enter your First Name'],
    lowercase: true
   },

   lastName: {
    type: String,
    require: [true, 'Please enter your Last Name'],
    lowercase: true
   },

   username: {
    type: String,
    require: [true, 'Please enter a Username'],
    unique: true
   },

   email:{
    type: String,
    require: true,
    lowercase: true,
    validate: [isEmail, 'Please provide a valid email'],
    // match: [/.+\@.+\..+/,'Enter a valid email'],
    unique: true 
   },

    password:{
    type: String,
    require: true,
    lowercase: true,
    minlength: [6, 'Password must be minimum of 6 characters'],
   }
});


// variable storing the model with the data. 
const User = mongoose.model('username', userShema);

module.exports = User;