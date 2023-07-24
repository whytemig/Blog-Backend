const User = require("../models/users");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const myBlog = require("../models/Blog");
const authorizeMe = require('../controllers/middleware/token');


// Get the webpage and render the variables to the ejs page.
const singupGet = (req, res) => {
  res.render("signup", {
    title: "My Blog",
    display: "Sign Up",
    errorMessage: "",
  });
};

// Post functionality for the signin page.
const singupPost = async (req, res) => {
  const id = req.params._id;
  let { firstName, lastName, username, email, password } = req.body;


  if(password.length < 6){
    res.render("signup", {
      errorMessage: 'Invalid Password',
      title: "My Blog",
      display: "Sign Up",
    });
  }else{
    
    password = await bcrypt.hashSync(password, 10);
    try {
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password,
        id,
      });
      
      

      console.log(`User Created: ${user}`)
      res.redirect("/login");
    } catch (err) {
      let text = err.message;
  
      if (validator.isEmail(email)) {
        res.redirect("/login");
      } else {
        res.render("signup", {
          errorMessage: text.split('username validation failed: '),
          title: "My Blog",
          display: "Sign Up",
        });
      }
    }
  }
 
};

// Get the login page and render the variables on the login page.
const loginInGet = (req, res) => {
  res.render("login", {
    title: "My Blog",
    display: "Login",
    errorMessage: " ",
  });
};

// find the user by id, compare password, then Authorize them to enter the official site.
const loginInPost = async (req, res) => {
  const id = req.params.id;
  const { username, password } = req.body;

  try {
    const data = await User.findOne({ username });

    if (data) {
      const hashP = bcrypt.hashSync(data.password, 10);
      let result = await bcrypt.compare(data.password, hashP);

      if (result) {
        // provide the user with a token.
        const token = await jwt.sign({ username: data.username }, "Mysecret", {
          expiresIn: "1h"
        });
        // Save token in cookie
        res.cookie("access", token, { httpOnly: true, maxAge: 3600000 });

        console.log(`{
          Authentification: ${result}, token: ${token}
        }`);
        res.redirect("/blogs");
  
      }
    } else{
      res.render("login", {
        title: "My Blog",
        display: "Login",
        errorMessage: " Invalid Credentials",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.render("login", {
      title: "My Blog",
      display: "Login",
      errorMessage: " Invalid Credentials",
    });
   
  }
};

const getCreateBlog = async (req, res) => {
  const { title, description, date, img } = req.body;

  res.render("createblog", {
    display: "Create a Blog",
    title,
    description,
    date,
    img,
  });
};

const postCreatedBlog = async (req, res) => {
  const { title, description, content, date, votes } = req.body;
  const img = req.file.filename;

  try {
    const data = new myBlog({
      title,
      description,
      content,
      date,
      votes,
      img,
    });

    await data.save();
    console.log(`Client's Blog : ${data}`);

    res.redirect("/blogs");
  } catch (err) {
    console.log(err);
    res.send(err.message);
    res.render("createblog");
  }
};

module.exports = {
  singupGet,
  singupPost,
  loginInGet,
  loginInPost,
  getCreateBlog,
  postCreatedBlog,
};
