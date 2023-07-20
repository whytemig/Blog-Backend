const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
   title: {
    type: String,
    require: [true, 'Please enter the title of your blog']
   },
   description: {
    type: String,
    require: [true, 'Please enter a description for your blog']
   },
   content:{
    type: String,
    require: [true, 'Please enter context for your blog']
   },
   date: {
    type: Date,
    default: Date.now()
  },
  img:{
      type: String
  },
  votes: {
    type: Number,
    default: 0
  }
});


const myBlog = mongoose.model('myBlog', blogSchema);

module.exports = myBlog;