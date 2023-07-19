const  User  = require("../models/User");
// const  Blog  = require("../models/Blog");
// const User = require("../models/users");
const jwt = require("jsonwebtoken");
const validator = require('validator');
const bcrypt = require("bcrypt");
const  myBlog  = require('../models/User');
const multer = require('multer');




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
    res.redirect("/blog/login");

  } catch (err) {
    let text = err.message;

    if (validator.isEmail(email)) {
     res.redirect('/blog/login')
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
  const { title, description, content, date, votes, img  } = req.body;

  try {
    const data = new myBlog({
      title,
      description,
      content,
      date,
      votes,
      img
    });

    let imgData = data.img;

    imgData.data = req.file.buffer;
    imgData.contentType = req.file.mimetype;
    
    await data.save()

    console.log(data);
   
    res.redirect('/gallery')

  } catch (err) {
    console.log(err)
    res.send(err.message);
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

// const editBlog = async (req, res) => {
//   const id = req.params._id;
//   const { title, description, content, date, votes, img } = await Blog.findByID(id);

//   try {
//     const data = await Blog.findOne({ username });
//     console.log(title, description, content, date, votes, img);
//     res.render("edit", { title: "Edit blog", title, description, content, date, votes, img });
//   } catch (error) {
//     console.error("Error while fetching blog data:", error);
//     res.status(500).send("Internal Server Error");
//   }
// }

// const editBlog = async (req, res) => {
//   const id = req.params.id;
//   const { title, description, date, img } = req.body;
//   try {

//     const data = await myBlog.findOne({ title });
//     res.render('edit', {
//       display: "Edit Your Blog!",
//         title,
//         description,
//         date,
//         img,
//       });
//   } catch (error) {
//     console.error('Error while fetching blog data:', error);
//     res.status(500).send('Internal Server Error');
//   }
  
// };

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
