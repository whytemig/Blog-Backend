const  myBlog  = require('../models/User').myBlog;

const getGalleryBlogs = async (req, res) =>{
    const data = await myBlog.find();
    res.render('gallery',{
        title: "My Blog",
        display: "Checkout the Latest",
        data
    });

    
};

const getFullViewById = async (req, res)=>{
const id = req.params.id;
try{
    const data = await myBlog.findById(id);
    res.render('profile', {
        title: "My Blog",
        display: "Full View",
        data
    });

}catch(err){
    console.log(err.message)
}
};

module.exports = {
    getGalleryBlogs,
    getFullViewById
};