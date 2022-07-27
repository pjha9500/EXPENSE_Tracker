require('dotenv').config();

const sequelize = require('./util/database');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userLoginSignup');
const homeRoutes = require('./routes/home');
const purchaseroutes=require('./routes/purchase');


const User = require('./models/user');
const Expense = require('./models/expense');
const Order=require('./models/orders');
// var instance = new Razorpay({  key_id: 'rzp_test_Fakqx3nSrQ0o61',  key_secret: '24qLPD40ZWXjLZ96de8dVBVV',});

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);
app.use(homeRoutes);
app.use(purchaseroutes);



User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);


sequelize.sync()
.then((res)=>{
    //console.log(res)
    
}).catch(err=>console.log(err))

app.listen(3000);