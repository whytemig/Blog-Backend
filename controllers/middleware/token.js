const jwt = require("jsonwebtoken");


// 1. check do we have the TOKEN
// if we have the token continue on through but if not the client is redirected to the login page. Basically denied access without a token.
const authorizeMe = (req, res, next) => {
  // getting the token from the cookie. The token is stored in the cookie.
  const token = req.cookies.access;
  let result;
  console.log(token)
  try {
    result = jwt.verify(token, "Mysecret");
    console.log(result);
    if (result) {
      next();
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.redirect("/login");
    console.log(error.message);
  }
 
};
   
module.exports = authorizeMe;
