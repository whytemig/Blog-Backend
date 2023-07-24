const jwt = require("jsonwebtoken");

const authCheck = async (req, res, next) => {
    let token = req.cookies.token;
    console.log(token);
    console.log("Auth check middleware has fired", token);
    // now that token has been made it needs to be verified. verify jwt
    // if jwt is valid then next()
    // if jwt is not valid then show error
    let decoded = null;
    try {

        //If the user is decoded (user is in the database), then save the id of that user so that they can access stuff on the site
      decoded = jwt.verify(token, 'mySecret'); 
      console.log("decoded JWT:", decoded);
      
    } catch (error) {
      console.log(error);
    }
    if (decoded) {
        req.user = {id:decoded.foo}
      next();
    } else {
      res.render('login', {
      title: 'My Blog',
      error: 'You must be logged in to view this page',
  });
    }
  };

module.exports = authCheck;
