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


router.get('/', (req, res)=>{
    res.render('index', {title: 'MyBlog'})
})

router.get('/signup', singupGet);

router.post('/signup', singupPost);

router.get('/createblog', createBlog);

router.post('/createdblog', upload.single('image'), createdBlog);



module.exports = router;