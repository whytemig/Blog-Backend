const router = require('express').Router();
const  User  = require('../models/User');
const  myBlog  = require('../models/User');
const { singupPost, singupGet, loginInGet, loginInPost, getCreateBlog, postCreatedBlog, getBlogByID, editBlog, editedBlog, deletedBlog } = require('../controllers/auth');
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
router.get('/createblog', getCreateBlog);

// post all blogs w/ image

router.post('/createblog', upload, postCreatedBlog);

// router.get('/blogs/:id', getBlogByID);

router.get('/editblog', editBlog);

// put or patch edit a user

router.post('/editblog', editedBlog);

// delete user by id

// router.get('/delete/:id', deletedBlog);


module.exports = router;