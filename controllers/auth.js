const User = require("../models/users");
const jwt = require("jsonwebtoken");
const validator = require('validator');
const bcrypt = require("bcrypt");
const  myBlog  = require('../models/Blog');
const multer = require('multer');
const fs = require('fs');




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
  const id = req.params._id;
  let { firstName, lastName, username, email, password } = req.body;
  
  password = await bcrypt.hashSync(password, 10);
  console.log(password)
  
  try {
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      id
    });
    
   
    console.log(password)

    // After the user has been created, a web-token is given to verify the user.
    //create jwt token
    const token = await jwt.sign({ id }, "Mysecret", {
      expiresIn: "2h",
    });

    console.log(`token: ${token}`)

    //save token in cookie
    res.cookie("access-token", token, { httpOnly: true, maxAge: 3600000 });
    res.redirect("/login");

  } catch (err) {
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
  const id = req.params._id;
  const {username, password} = req.body;
 
  try{
  const data = await User.findOne({ username });

  if(data){
    const hashP = bcrypt.hashSync(data.password, 10);
    let result = await bcrypt.compare(data.password, hashP);

    console.log(password, hashP)

    if(result){
      const token = await jwt.sign({ id }, "Mysecret", {
        expiresIn: "2h",
      });
      // Save token in cookie
      res.cookie("access-token", token, { httpOnly: true, maxAge: 3600000, sameSite: 'none', secure: true });

      console.log( result);
      res.redirect('/');
    
    }else{
      console.log('incorrect password')
      res.status(401).json({ error: 'Invalid credentials' });
    }
  }
  }catch(err){
    console.log(err.message)
  }

}

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


  



module.exports = {
  singupGet,
  singupPost,
  loginInGet,
  loginInPost,
  getCreateBlog,
  postCreatedBlog
};
