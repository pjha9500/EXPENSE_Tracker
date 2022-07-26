const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();


exports.authenticateToken = (req, res, next)=> {
    try{
        const token=req.header('authorization')

        console.log(token)

        const userId=jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(userId)
        User.findByPk(userId).then(user=>{
            console.log(JSON.stringify(user))
            req.user=user;
            next();
        })
        .catch(err=>{
            throw new Error(err)
        })
    }

    catch(err){
        console.log(err)
         res.status(404).JSON({sucess:false})
    }
}