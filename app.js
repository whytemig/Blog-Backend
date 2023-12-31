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
// 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', blogRouter)



// Database and server connection function.
const connect = async ()=>{
    await mongoose.connect(process.env.URI)
    .then(()=> console.log('Database Connected'))
    .catch((error)=>{console.error(error)});
    app.listen(process.env.PORT, ()=> console.log('The port is connected'));
}
connect();