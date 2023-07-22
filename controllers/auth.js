const  User  = require("../models/User").User;
const jwt = require("jsonwebtoken");
const validator = require('validator');
const bcrypt = require("bcrypt");
const  myBlog  = require('../models/User').myBlog;
const multer = require('multer');
const fs = require('fs');
const saltRounds = 10;

// Get the webpage and render the variables to the ejs page.

const singupGet = (req, res) => {
  
  res.render("signup", {
    title: "My Blog",
    display: "Sign Up",
    errorMessage:''
  });
};


// Post functionality for the signin page.
const singupPost =  async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  let { firstName, lastName, username, email, password } = req.body;
  
  // password = await bcrypt.hashSync(password, 10);
  // console.log(password)
  try {
    let hashPassword = await bcrypt.hash(password, saltRounds);
    const user = await new User({
      firstName,
      lastName,
      username,
      email,
      password: hashPassword,
      id
    });
    await user.save();
    console.log(user);
    // After the user has been created, a web-token is given to verify the user.
    //create jwt token

    // const token = await jwt.sign({ id }, "Mysecret", {
    //   expiresIn: "2h",
    // });

    // console.log(`token: ${token}`)

    // //save token in cookie
    // res.cookie("access-token", token, { httpOnly: true, maxAge: 3600000 });
    res.redirect("/login");

  } catch (err) {
    console.log(err);
    let text = err.message;
    if (validator.isEmail(email)) {
     res.redirect('/login')
    } else{
      res.render("signup", { 
        errorMessage: text.split('user validation failed:').join(),
        title: "My Blog",
        display: "Sign Up"
      });
  }
};
}

// Get the login page and render the variables on the login page. 
const loginInGet = (req, res) => {
  res.render("login", {
    title: "My Blog",
    display: "Login" });
};


// find the user by id, compare password, then Authorize them to enter the official site. 

const loginInPost = async (req, res) => {
  const { username, password } = req.body;
// const user = await User.findOne({where: { username } })
const query = User.where({ username });
const user = await query.findOne();
console.log(user);
if (user == null) {
  res.render("login", { title: "Login", error: "User not Found" });
} else {
  // Load the hash from password db
  console.log(password, user.password);
  // const hashPassword = user.password;
  // const profileID = user.id
  await bcrypt.compare(password, user.password, function (err, result) {
    console.log("result", result);

  if (result) {
    const token = jwt.sign({foo: "bar"}, 'mySecret', {expiresIn: "1h"})
    console.log(token)
    res.cookie("token", token)
    res.redirect("/blogs");
  } else {
    res.render("login", {
      title: "Login",
      error: "Passwords do not match",
    });
  }
});
}
}
//   try {
//     const user = await User.findOne({ username });

//     if (user === null) {
//       return res.render("login", { title: "Login", error: "User not found" });
//     }

//     const result = await bcrypt.compare(password, user.password);

//     if (result) {
//       const token = jwt.sign({ foo: 'bar' }, 'mySecret', { expiresIn: '1h' });
//       // Save token in cookie
//       console.log(result);
//       res.cookie("token", token);
//       res.redirect('/');
//     } else {
//       res.render("login", {
//         title: "login",
//         error: "Passwords do not match",
//       });
//     }
//   } catch (err) {
//     // Handle any errors that occurred during the try block
//     console.error(err);
//     res.render("login", {
//       title: "login",
//       error: "An error occurred during login",
//     });
//   }
// };


const getCreateBlog = async (req, res) => {
  const { title, description, date, img } = req.body;

  res.render('createblog', {
    display: "Create a Blog",
      title,
      description,
      date,
      img,
    });
};

const postCreatedBlog = async (req, res) => {
  const { title, description, content, date, votes  } = req.body;
  const img = req.file.filename;
  // console.log(img)
  try {
    const data = new myBlog({
      title,
      description,
      content,
      date,
      votes,
     img
    });
  
    await data.save()
    console.log(data);

   
    res.redirect('/blogs')

  } catch (err) {
    console.log(err)
    res.send(err.message);
    res.render('createblog')
  }
};

// create 
const getBlogByID = (req, res) => {
  try {
    // console.log(req.params);
    // const id = req.params.id;

    const { title, description, content, date, votes, img } = req.body;
    console.log(title, description, content, date, votes, img);
    // console.log(firstName, lastName, email);

    res.render('blogs', {
      title: 'Blogs',
      description,
      content,
      date,
      votes,
      img,
    });
  } catch (error) {
    console.error('Error while fetching blog data:', error);
    res.status(500).send('Internal Server Error');
  }
};

const editBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description, date, votes, img } = req.body;
  try {
    const blog = await myBlog.findById(id);

    // Check if the blog exists
    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    res.render('editblog', {
      display: "Edit Your Blog!",
      title,
      description,
      date,
      votes,
      img,
    });
  } catch (error) {
    console.error('Error while fetching blog data:', error);
    res.status(500).send('Internal Server Error');
  }
};

// const editBlog = async (req, res) => {
//   const { title, description, content, date, votes, img  } = req.body;

//   try {

//     const { title, description, content, date, votes, img} = await myBlog.find();
//     console.log( title, description, content, date, votes, img);
//     const data = new myBlog({
//       title,
//       description,
//       content,
//       date,
//       votes,
//       img
//     });

//     let imgData = data.img;

//     imgData.data = req.file.buffer;
//     imgData.contentType = req.file.mimetype;
    
//     await data.save()

//     console.log(data);
   
//     res.render("edit", { title: "Edit User", description, content, date, votes, img })

//   } catch (err) {
//     console.log(err)
//     res.send(err.message);
//   }
// };

const editedBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const { title, description, content, date, votes, img } = req.body;
    await Blog.update({ title, description, content, date, votes, img }, { where: { id: id } });
    res.send("post request edit user");
  } catch (error) {
    console.error("Error while updating blog:", error);
    res.status(500).send("Internal Server Error");
  }
};


const deletedBlog = async (req, res) => {
  const id = req.params.id;
  try {

    user.deleteOne({ name: 'Eddard Stark' });
    const { title, description, content, date, votes, img } = req.body;
    await Blog.destroy({ where: { id: id } });
    res.send("User has been deleted!");
  } catch (error) {
    console.error("Error while deleting blog:", error);
    res.status(500).send("Internal Server Error");
  }
};



module.exports = {
  singupGet,
  singupPost,
  loginInGet,
  loginInPost,
  getCreateBlog,
  postCreatedBlog,
  getBlogByID,
  editBlog,
  editedBlog,
  deletedBlog
};


// const loginInPost = async (req, res) => {
//   const id = req.params._id;
//   const {username, password} = req.body;
 
//   try{
//   const data = await User.findOne({ username });

//   if(data){
//     const hashP = bcrypt.hashSync(data.password, 10);
//     let result = await bcrypt.compare(data.password, hashP);

//     console.log(password, hashP)

//     if(result){
//       const token = await jwt.sign({ id }, "Mysecret", {
//         expiresIn: "2h",
//       });
//       // Save token in cookie
//       res.cookie("access-token", token, { httpOnly: true, maxAge: 3600000, sameSite: 'none', secure: true });

//       console.log( result);
//       res.redirect('/');
    
//     }else{
//       console.log('incorrect password')
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   }
//   }catch(err){
//     console.log(err.message)
//   }
// }