const router = require('express').Router();
const  User  = require('../models/User').User;
const userController = require("../controllers/auth");
const  myBlog  = require('../models/User').myBlog;
const findBlogs = require("../middleware/findBlogs");
const jwt = require("jsonwebtoken");
const auth = require('../controllers/auth');
const crud = require('../controllers/crud');
const upload = require('../middleware/multer');
// const authCheck = require("../middleware/authCheck");


// router.get('/', authCheck, (req, res) => {
//     // This route will only be accessible if the JWT is valid (authCheck middleware passed).
//     res.send('Welcome to the protected route!');
//   });

router.get('/', (req, res) => {
    res.render('index', {title: 'MyBlog'});
});

// signup
router.get('/signup', auth.singupGet);

router.post('/signup', auth.singupPost);

// login
router.get('/login', auth.loginInGet);

router.post('/login', auth.loginInPost);

// get blog w/ image
router.get('/createblog', auth.getCreateBlog);

// post all blogs w/ image

router.post('/createblog', upload, auth.postCreatedBlog);

router.get('/blogs', crud.getGalleryBlogs);

// get route to show the fullview page by _id

router.get('/fullview/:id', crud.getFullViewById);


module.exports = router;