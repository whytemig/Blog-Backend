const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
require('dotenv').config();
const app = express();
const path = require('path');
const blogRouter = require('./routes/routes');
const userBlog = require('./models/Blog.js');
const PORT = 4000 || process.env.PORT;
// const connect = require('./config/database');

// Template view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res)=> res.send('Hello'))
app.use('/blog', blogRouter)

const connect = async ()=>{
    await mongoose.connect(process.env.URI)
    .then(()=> console.log('Database Connected'))
    .catch((error)=>{console.error(error)});
    app.listen(process.env.PORT, ()=> console.log('The port is connected'));
}

connect();

module.exports = app;