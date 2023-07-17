const router = require('express').Router();
const  User  = require('../models/users');
const  myBlog  = require('../models/Blog');
const { singupPost, singupGet, loginInGet, loginInPost, getCreateBlog, postCreatedBlog } = require('../controllers/auth');
const upload = require('../controllers/middleware/multer');


router.get('/', (req, res)=>{
    res.render('index', {title: 'MyBlog'})
})

// signup
router.get('/signup', singupGet);

router.post('/signup', singupPost);

router.get('/createblog', createBlog);

router.post('/createdblog', upload.single('image'), createdBlog);

// login
router.get('/login', loginInGet);

router.post('/login', loginInPost);

// get blog w/ image
router.get('/createblog', getCreateBlog)

// post all blogs w/ image

router.post('/createblog', upload, postCreatedBlog)


module.exports = router;