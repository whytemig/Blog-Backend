const  User  = require("../models/User").User;
const jwt = require("jsonwebtoken");
const validator = require('validator');
const bcrypt = require("bcrypt");
const  myBlog  = require('../models/User').myBlog;
const saltRounds = 10;

// Get the webpage and render the variables to the ejs page.

const signupGet = (req, res) => {
  
  res.render("signup", {
    title: "My Blog",
    display: "Sign Up",
    errorMessage:''
  });
};


// Post functionality for the signin page.
const signupPost =  async (req, res) => {
  const _id = req.params._id
  let { firstName, lastName, username, email, password } = req.body;

  try {
    
    const hashedPassword = await bcrypt.hash(password, saltRounds);
console.log("hpw", hashedPassword)
    const user = await new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      _id
    });
    await user.save();

    // After the user has been created, a web-token is given to verify the user.
    //create jwt token

    const token = await jwt.sign({ _id: user._id }, "Mysecret", {
      expiresIn: "2h",
    });

    console.log(`token: ${token}`);

    //save token in cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }); // 2 hours expiration
    res.redirect("/login");

  } catch (err) {
    let text = err.message;
    if (validator.isEmail(email)) {
     res.redirect('/login')
    } else{
      res.render("login", { 
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
    title: "The Awesome Blog",
    display: "Login" });
};


// find the user by id, compare password, then Authorize them to enter the official site. 

const loginInPost = async (req, res) => {
  const { username, password } = req.body;
  console.log(password);
try {
  const user = await User.findOne({where: { username } });

if (!user) {
  return res.render("login", { title: "Login", error: "User not Found" });
} 
  // Load the hash from password db
  const hashPassword = user.password;
  console.log("Hashed Password from database:", hashPassword);
  console.log("form password", password);
  const passwordMatch = await bcrypt.compare(password, hashPassword);
  console.log("Password Match Result:", passwordMatch);
  
  if (passwordMatch) {
    const token = jwt.sign({ foo: "bar" }, "mySecret", { expiresIn: "1h" });
    console.log(token);
    res.cookie("token", token);
    res.redirect("/blogs");
  } else {
    res.render("login", {
      title: "Login",
      error: "Passwords do not match",
    });
  }
} catch (err) {
  console.error("Error during login:", err);
  res.status(500).render("login", { title: "Login", error: "Server error" });
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
      blog: []
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
  signupGet,
  signupPost,
  loginInGet,
  loginInPost,
  getCreateBlog,
  postCreatedBlog,
  getBlogByID,
  editBlog,
  editedBlog,
  deletedBlog
};

