const myBlog = require("../models/Blog");
const upload = require("../controllers/middleware/multer");
const fs = require("fs");
const path = require("path");

const getGalleryBlogs = async (req, res) => {
  const data = await myBlog.find();
  res.render("gallery", {
    title: "My Blog",
    display: "Checkout the Latest",
    data,
  });
};

const getFullViewById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await myBlog.findById(id);
    res.render("profile", {
      title: "My Blog",
      display: "Full View",
      data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

const geteditBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await myBlog.findById(id);
    res.render("edit", {
      title: "My Blog",
      display: "Edit The Blog",
      data,
    });

   
  } catch (err) {
    console.log(err.message);
  }
};

const posteditBlog = async (req, res) => {
  let id = req.params.id;
  const { title, description, date, img, updatedAt } = req.body;
  let new_img = "";

  if (req.file) {
    new_img = req.file.filename;
    try {
      fs.unlinkSync(path.join("image", req.body.old_image));
    } catch (err) {
      console.log(err.message);
    }
  } else {
    new_img = req.body.old_image;
  }

  try {
    const data = await myBlog.findByIdAndUpdate(id, {
      title,
      description,
      date,
      updatedAt: new Date,
      img: new_img,
    });
    res.redirect("/blogs");
  } catch (err) {
    console.log(err.message);
  }
};

const getDeleteBlog = async (req, res) => {
  let id = req.params.id;

  try {
    const data = await myBlog.findByIdAndRemove(id);

    if (!data) {
    res.redender("404");
      console.log(`Blog entry with ID: ${id}, not found.`);
    }

    // if(data.img != ''){
    //     try{
    //         fs.unlinkSync(path.join('image', data.img));
    //       }catch(err){
    //           console.log(err.message)
    //       }
    // }
   
    res.redirect('/blogs')
    console.log(`deleted: ${data}`);
  } catch (err) {
    res.redender('404');
    console.log(err.message);
  }
};

module.exports = {
  getGalleryBlogs,
  getFullViewById,
  geteditBlog,
  posteditBlog,
  getDeleteBlog,
};
