const  User  = require("../models/User");
const  Blog  = require("../models/Blog");

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
    display: "Sign Up",
  });
};

const singupPost = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  try {
    const data = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    res
      .send({data})
      .status(201)
  } catch (err) {
    const error = errorHandle(err);
    res.send(error);
  }
};

const loginInGet = (req, res) => {
  res.render("", {});
};
const loginInPost = (req, res) => {
  res.render("", {});
};

const createBlog = async (req, res) => {
  const { title, description, date, img } = req.body;
  res.render('createblog', {
      title,
      description,
      date,
      img,
    });
};

const createdBlog = async (req, res) => {
  const { title, description, date,img, meta } = req.body;
  try {
    const data = await Blog.create({
      title,
      description,
      date,
      img,
      meta
    });
    res
      .send({data})
      .status(201)
  } catch (err) {
    const error = errorHandle(err);
    res.send(error);
  }
};

module.exports = {
  singupGet,
  singupPost,
  loginInGet,
  loginInPost,
  createBlog,
  createdBlog
};
