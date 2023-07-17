const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
   title: {
    type: String,
    require: [true, 'Please enter the title of your blog'],
   },

   description: {
    type: String,
    require: [true, 'Please enter the a description for your blog'],
   },

   date: {
    type: Date,
    default: Date.now
  },

  img:{
      data: Buffer,
      contentType: String
  },

  votes: {
    type: Number,
    default: 0
  }
  
});

module.exports = mongoose.model('Blog', blogSchema)

// Look in mongo for layout and syntax
// Title to text required 
// Description to text required 
// Date to Date.now
// Like default start at 0
// Photo. 

// Homepage is /blog 

// https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/