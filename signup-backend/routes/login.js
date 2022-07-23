const express=require('express');
var bcrypt = require('bcryptjs');
const router=express.Router();
const con=require('../database/databse')
const jwt = require('jsonwebtoken');


router.post('/login',async (req,res,next)=>{
    console.log(req.body);
    // let hash=await bcrypt.hash(req.body.password,10);
    // console.log(hash);

        var sql=`SELECT * FROM userinfo WHERE email = '${req.body.email}'`;
        con.query(sql,async(err,result)=>{
            if (err) throw err;
            if (result.length>0){
                
                let isvalid=await bcrypt.compare(req.body.password,result[0].password);
                if(isvalid)
                {
                    let x=Math.random();
                    const token = jwt.sign(result[0].email,`${x}`);
                    res.status(200).json({msg:'Login successful', token: token, email: result[0].email, name: result[0].name })

                }
                else{
                    res.status(401).send({msg:"user not authorized"});
                }
            }
            else{
                    res.status(404).send({msg:"user not found"});
            }


        })
    })


  module.exports=router;