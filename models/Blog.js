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
    default: new Date
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


const myBlog = mongoose.model('Blogs', blogSchema);

module.exports = myBlog;