const express = require('express');
const userController = require('../controllers/home');
const homeController = require('../controllers/home');
const authorizationController = require('../authorization/authorization');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { json } = require('body-parser');
let TOKEN_SECRET = 'e3f105514c224ac99102ec4c783da0dd407b706b2736f7dd85e0659f53591499c7c25ebdefdf2ed0cc112420ea02f8a753e14d9c01f97f7be2e1a36ef297f723';
require('dotenv').config();



const router = express.Router();




router.post('/login/password',(req,res,next)=>{
    console.log(req.body);
    res.send("hello");
});

router.get('/home', (req,res,next)=>{
    const token=req.header('authorization');
    const userId=jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(userId)
        User.findByPk(userId).then(user=>{
            res.send(user.dataValues);
            
            
        })
        .catch(err=>{
            throw new Error(err)
        })

});
router.post('/home/addExpense', authorizationController.authenticateToken, homeController.postExpense);
router.get('/home/getExpenses',authorizationController.authenticateToken, homeController.getAllExpenses);
router.get('/home/leaderboard', authorizationController.authenticateToken, homeController.getExpenseTotals);





module.exports = router;