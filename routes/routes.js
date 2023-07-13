const router = require('express').Router();
const  User  = require('../models/users')
const { singupPost, singupGet } = require('../controllers/auth')


router.get('/', (req, res)=>{
    res.render('index', {title: 'MyBlog'})
})

router.get('/signup', singupGet);

router.post('/signup', singupPost);



module.exports = router;