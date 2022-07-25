const express = require('express')
const userController = require('../controllers/user')

const router = express.Router()


router.post('/signup', userController.postSignup)

router.post('/login', userController.postLogin)

module.exports = router























// const express=require('express');
// var bcrypt = require('bcryptjs');
// const router=express.Router();

// const con=require('../database/databse')
//  router.post('/register',async (req,res,next)=>{
//     console.log(req.body);
//     let hash=await bcrypt.hash(req.body.password,10);
//     console.log(hash);

//         var sql=`SELECT * FROM userinfo WHERE email = '${req.body.email}'`;
//         con.query(sql,(err,result)=>{
//             if (err) throw err;
//             if (result.length>0){
//                 console.log("email already present");
//               res.status(500).send("user already registered");
//             }
//             else{
//                 let sql = `INSERT INTO userinfo (email, name, contact ,password ) VALUES ('${req.body.email}', '${req.body.name}','${req.body.number}','${hash}')`;
//                 con.query(sql,(err,result)=>{
//                     if(err)throw err;
//                     else{
//                         console.log("1 record inserted");
//                         res.status(201).send();
//                     }
//                 })
//             }


//         })
//     })

    
// module.exports=router;


