const User = require('../models/user');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
let TOKEN_SECRET = 'e3f105514c224ac99102ec4c783da0dd407b706b2736f7dd85e0659f53591499c7c25ebdefdf2ed0cc112420ea02f8a753e14d9c01f97f7be2e1a36ef297f723';

exports.postSignup = async (req, res, next)=>{
    let userDetails = req.body
    console.log(userDetails);

    let existingUser = await User.findAll({where:{email: userDetails.email}})
    console.log(existingUser);
    if(existingUser.length === 0){
        const hashedPassword =  bcrypt.hashSync(userDetails.password, saltRounds);
        let newUser = await User.create({
            name: userDetails.name,
            email: userDetails.email,
            phoneNumber: userDetails.number,
            password: hashedPassword
        })
        res.json({flag: true, msg: "User created"})
    }else{
        res.json({flag: false, msg: "user already exists"})
    }
    
}

exports.postLogin = async(req,res,next)=>{

    const email = req.body.email
    const password = req.body.password
    console.log(req.body);

    let users = await User.findAll({where:{email: email}})
    console.log(users);

    if(users.length>0){
        const dbid = users[0].id
        const dbpass = users[0].password
        const dbname = users[0].name
        const dbemail = users[0].email

        const match = await bcrypt.compare(password, dbpass)

        if(match){
            const token = jwt.sign(dbid, TOKEN_SECRET);
            res.status(200).json({msg:'Login successful', token: token, email: dbemail, name: dbname })
        }else{
            res.status(401).json({msg: 'User not autorized'})
        }
    }else{
        res.status(404).json({msg: 'User not found'})
    }
}