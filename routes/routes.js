const router = require('express').Router();
const  { User }  = require('../models/User');
const  { Blog }  = require('../models/Blog');
const multer = require('multer'); // module installed npm install --save multer
const { singupPost, singupGet } = require('../controllers/auth');
const { createBlog, createdBlog } = require('../controllers/auth');
const userController = require("../controllers/auth");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });
const  User  = require('../models/users')
const { singupPost, singupGet, loginInGet, loginInPost } = require('../controllers/auth')


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

// create blog
router.get()

router.post()

module.exports = router;