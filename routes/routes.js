const router = require('express').Router();
const  User  = require('../models/User').User;
const  myBlog  = require('../models/User').myBlog;
const { singupPost, singupGet, loginInGet, loginInPost, getCreateBlog, postCreatedBlog } = require('../controllers/auth');
const {getGalleryBlogs, getFullViewById} = require('../controllers/crud')
const upload = require('../middleware/multer');


router.get('/', (req, res)=>{
    res.render('index', {title: 'MyBlog'})
})

// signup
router.get('/signup', singupGet);

router.post('/signup', singupPost);

// login
router.get('/login', loginInGet);

router.post('/login', loginInPost);

// get blog w/ image
router.get('/createblog', getCreateBlog);

// post all blogs w/ image

router.post('/createblog', upload, postCreatedBlog);

router.get('/blogs', getGalleryBlogs);

// get route to show the fullview page by _id

router.get('/fullview/:id', getFullViewById);


module.exports = router;