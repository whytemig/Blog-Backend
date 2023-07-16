const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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


// pre save it (password) and then hash it using bcrypt before saving it to the DB. This could be a middleware as well. 
userShema.pre('save', async function(next) {
   this.password = await bcrypt.hashSync(this.password, saltRounds);
   next();
});

// variable storing the model with the data. 
const User = mongoose.model('user', userShema);

module.exports = User;