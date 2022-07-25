const express = require('express')
const userController = require('../controllers/home')
const authorizationController = require('../authorization/autorrization')
const homeController = require('../controllers/home')
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { json } = require('body-parser');
let TOKEN_SECRET = 'e3f105514c224ac99102ec4c783da0dd407b706b2736f7dd85e0659f53591499c7c25ebdefdf2ed0cc112420ea02f8a753e14d9c01f97f7be2e1a36ef297f723';

const router = express.Router()


// router.post('/home/addExpense', authorizationController.authenticateToken);
router.get('/home/getExpenses', (req,res,next)=>{
    console.log(req.headers.authorization);
    const userid=jwt.verify(req.headers.authorization,TOKEN_SECRET);
    console.log(userid);
    User.findByPk(userid).then((user)=>{
        user.getExpenses().then(expenses=>{res.json({expenses})})
    })

})
router.post('/home/addExpenses',(req,res,next)=>{
    //  verify user using jwt token
    console.log("expense",req.body[0]);
    let expense=req.body[0];
    console.log("token",req.body[1].headers.Authorization);
    let x;
    const userId=jwt.verify(req.body[1].headers.Authorization, TOKEN_SECRET);
    User.findByPk(userId).then(user=>{
        //inser expense to expense data
        user.createExpense({
            amount: expense.amount,
            description: expense.description,
            category: expense.category
        }).then(()=>{console.log("data stored");res.status(200).json({info:"expense added"})}).catch((err)=>{console.log(err);res.status(402).json({err:"some thing went wrong"})});
    })
})



module.exports = router;