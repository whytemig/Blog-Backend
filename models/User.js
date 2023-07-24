const mongoose = require('mongoose');
const {isEmail} = require('validator');
const { Schema } = mongoose;
// const bcrypt = require("bcrypt");



const userSchema = new mongoose.Schema({
   // _id: Schema.Types.ObjectId,
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
    minlength: [6, 'Password must be minimum of 6 characters'],
   },
   blog: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'myBlog' }]
});

const blogSchema = new mongoose.Schema({
   title: {
    type: Schema.Types.ObjectId, ref: 'User',
    type: String,
    require: [true, 'Please enter the title of your blog']
   },
   description: {
    type: Schema.Types.ObjectId, ref: 'User',
    type: String,
    require: [true, 'Please enter a description for your blog']
   },
   content:{
    type: String,
    require: [true, 'Please enter context for your blog']
   },
   date: {
    type: Date,
    default: new Date
  },
  img:{
      type: "string"
  },
  votes: {
    type: Number,
    default: 0
  },
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});


const User = mongoose.model('User', userSchema);
const myBlog = mongoose.model('Blogs', blogSchema);

module.exports = {User:User, myBlog:myBlog};
