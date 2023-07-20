const multer = require('multer');
const router = require('express').Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/image');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+"_"+file.originalname);
    }
});


const upload = multer({ 
    storage: storage 
}).single('image');


module.exports = upload;