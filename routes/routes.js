const router = require('express').Router();
const  User  = require('../models/users');
const  myBlog  = require('../models/Blog');
const { singupPost, singupGet, loginInGet, loginInPost, getCreateBlog, postCreatedBlog, getLogout } = require('../controllers/auth');
const {getGalleryBlogs, getFullViewById, geteditBlog, posteditBlog, getDeleteBlog} = require('../controllers/crud')
const upload = require('../controllers/middleware/multer');
const authorizeMe = require('../controllers/middleware/token');


router.get('/', (req, res)=>{
    res.render('index', {title: 'MyBlog'})
})

// signup
router.get('/signup', singupGet);

router.post('/signup', singupPost);

// login
router.get('/login', loginInGet);

router.post('/login', loginInPost); 

// log out 
router.get('/logout', getLogout); 

// get blog w/ image
router.get('/createblog',authorizeMe, getCreateBlog)

// post all blogs w/ image

router.post('/createblog', upload, postCreatedBlog);

router.get('/blogs',authorizeMe, getGalleryBlogs);

// get route to show the fullview page by _id

router.get('/fullview/:id', getFullViewById);


// get the router to edit and then post the updated.
router.get('/edit/:id', geteditBlog);

router.post('/update/:id', upload, posteditBlog);

// delete blog by id location. 

router.get('/delete/:id', getDeleteBlog);



module.exports = router;