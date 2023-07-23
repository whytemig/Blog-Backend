const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
require('dotenv').config();
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
const blogRouter = require('./routes/routes');



// Template view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', blogRouter);

const connect = async ()=>{
    await mongoose.connect(process.env.URI)
    .then(()=> console.log('Database Connected'))
    .catch((error)=>{console.error(error)});
    app.listen(process.env.PORT, ()=> console.log('The port is connected'));
}

connect();



module.exports = app;


// app.get('/set-cookies', (req, res) => {

//     // res.setHeader('set-Cookie', 'newUser=true');
//     res.cookie('newUser', false);
//     res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}); // secure: true means we will only have a cookie when we have an https aka secure connection. httpOnly means we cannot access the cookie from the javascript. in otherwords you cant access the cookies fromt he front end. the cookies can only be transfered via the http protocal aka the client and the server not front end js

//     res.send('you got the cookies!');
// })

// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies;
//     console.log(cookies.newUser);

//     res.json(cookies);

// })
