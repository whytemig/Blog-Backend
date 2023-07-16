const router = require('express').Router();
const  User  = require('../models/users')
const { singupPost, singupGet, loginInGet, loginInPost } = require('../controllers/auth')


router.get('/', (req, res)=>{
    res.render('index', {title: 'MyBlog'})
})

// signup
router.get('/signup', singupGet);

router.post('/signup', singupPost);

// login
router.get('/login', loginInGet);

router.post('/login', loginInPost);

// create blog
router.get()

router.post()

// show all blogs

module.exports = router;