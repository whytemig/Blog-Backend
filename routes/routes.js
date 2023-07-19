const router = require('express').Router();
const  User  = require('../models/users');
const  myBlog  = require('../models/Blog');
const { singupPost, singupGet, loginInGet, loginInPost, getCreateBlog, postCreatedBlog } = require('../controllers/auth');
const {getGalleryBlogs, getFullViewById} = require('../controllers/crud')
const upload = require('../controllers/middleware/multer');


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
router.get('/createblog', getCreateBlog)

// post all blogs w/ image

router.post('/createblog', upload, postCreatedBlog);

router.get('/blogs', getGalleryBlogs);

// get route to show the fullview page by _id

router.get('/fullview/:id', getFullViewById);


module.exports = router;