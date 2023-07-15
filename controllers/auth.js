const  User  = require("../models/users");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const errorHandle = (err) => {
  let errors = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  };

  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const singupGet = (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  res.render("signup", {
    firstName,
    lastName,
    username,
    email,
    password,
    title: "My Blog",
    display: "Sign Up"
  });
};

const singupPost = async (req, res) => {
  const id = req.params._id;
  const { firstName, lastName, username, email, password } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      id
    });
    
    // After the user has been created, a web-token is given to verify the user. 
    const token = await jwt.sign({id}, 'Mysecret', {
      expiresIn:'1h'
    });

    res.cookie('jwt', token, { httpOnly: true, maxAge: })
    

    console.log(user);
    res.redirect('/');
  } catch (err) {
    console.log(err)
    const errors = errorHandle(err);
    res.send(errors);
  }
};

const loginInGet = (req, res) => {
  res.render("", {});
};
const loginInPost = (req, res) => {
  res.render("", {});
};

module.exports = {
  singupGet,
  singupPost,
  loginInGet,
  loginInPost,
};
