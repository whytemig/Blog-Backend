const  myBlog  = require('../models/Blog');

const getGalleryBlogs = (reg, res) =>{
    res.render('gallery',{
        title: "My Blog",
        display: "Checkout the Latest"

    });
};




module.exports = getGalleryBlogs;