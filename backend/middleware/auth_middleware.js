
const jwt = require('jsonwebtoken');
const secret = require('../config');
const decode_jwt = (req,res,next)=>{
   const token = req.headers.authorization.split(' ')[1];
   
   if(!token){
    return res.status(200).json({
         success: 'false',
         message:'Error! Token was not provided.'
    });
   }
   try{
   const decodedToken = jwt.verify(token, secret.JWT_SECRET);
   //console.log('token_value', decodedToken);
     req.token = decodedToken;
     next();
   }catch(error){
     return res.status(403).json({message: 'Failed to authenticate token'});
   }
};

module.exports = decode_jwt;