const User = require('../models/user')
const Expense = require('../models/expense')
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.getUserDetails = (req, res, next)=>{
    let user = req.user.dataValues
    console.log(user);
    res.json({user})
}


exports.postExpense = (req,res,next)=>{
    const expense = req.body[0];
    console.log(expense);
    req.user.createExpense({
        amount: expense.amount,
        description: expense.description,
        category: expense.category
    })
    .then(result=>{
        res.status(200).json({result, msg: "Expense Added"})
    })
    .catch(err=>{
        console.log(err)
        res.status(402).json({msg: "Not added"})
    })
   
   
}

exports.getAllExpenses = (req, res, next)=>{
    req.user.getExpenses()
    .then(expenses=>{
        res.json({expenses})
    })
}

exports.getExpenseTotals = async (req, res, next)=>{
    
    const totalAmount = await Expense.findAll({
        attributes: [
          'userId',
          [Sequelize.fn('sum', Sequelize.col('amount')), 'total_amount'],
        ],
        group: ['userId'],
        raw: true
      })

    totalAmount.sort((a,b)=> b.total_amount-a.total_amount)
    
    for(let i=0; i<totalAmount.length; i++){
        let user = await User.findAll({

            attributes:['name'],
            where: {id: totalAmount[i].userId}
        })

        //console.log(user[0].name)

        totalAmount[i] = {...totalAmount[i], name: user[0].name}
    }

    console.log(totalAmount)
    res.json({totalAmount})
      
}