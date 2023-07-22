// const  myBlog  = require('../models/User').myBlog;

// const findBlogs = async (req, res, next) => {
//   console.log('Find single user by id in database');
//   const id = req.params.id;
//   req.myBlog = await User.findByid;
//   // console.log(req.user);
//   next();
// };

// module.exports = findBlogs; 

// User.beforeSave(async (user) => {
//     if (user.changed('password')) {
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     user.password = hashedPassword;
//     }
//   });
//   return User;