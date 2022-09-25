const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const user = require('../models/userModel');
const UserModel = require('../models/userModel');

const protect = asyncHandler( async (req, res, next) => {
  let token;

  // token format => Bearer 640d98f4098d(token)
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1]

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //Get User from the token
      req.user = await UserModel.findById(decoded.id).select('-password')

      //calling next piece of middleware if everything works fine uptill here
      next();
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  //if no token at all
  if(!token){
    res.status(401);
    throw new Error('Not authorized, no token')
  }
})

module.exports = {
  protect,
}