const express=require('express');
const app=express();
const bodyparser=require('body-parser');
var cors = require('cors');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use(cors());

//routes
const signupRoutes=require('./routes/singup');
const loginroutes=require('./routes/login');


app.use(signupRoutes);
app.use(loginroutes);



app.listen(3000);






































































































































// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database:'expensetracker',
//     password: "Pjha@11810995"
//   })
// app.get('/register',(req,res,next)=>{
//     res.send("hello");
// })
// app.post('/register',async (req,res,next)=>{
//     console.log(req.body);
//     let hash=await bcrypt.hash(req.body.password,10);
//     console.log(hash);
//     con.connect(function(err){
//         if (err) throw err;
//         console.log("Connected!");
//         // let hash=bcrypt.hash(req.body.password,10);
//         var sql = `INSERT INTO userinfo (email, name, contact ,password ) VALUES ('${req.body.email}', '${req.body.name}','${req.body.number}','${hash}')`;
//         con.query(sql, function (err, result) {
//             if (err) {console.log('useralready present');
//                         res.status(500).send();}
//             else{
//                 console.log("1 record inserted");
//                 res.status(201).send();
//             }
            
//             });
//     })

    
// })
// app.post('/login',async(req,res,next)=>{
//     // console.log(req.body);
//     con.connect(async function(err){
//         if(err)throw err;
//         console.log('Connected!');
//         con.query(`SELECT * FROM userinfo WHERE email = '${req.body.email}'`, async function (err, result) {
//             if (err)
//             {
//                 res.status(404).json("user not found");
//             }
//             else{
//                 console.log(result);
//                 let isvalid=await bcrypt.compare(req.body.password,result[0].password);
//                 if(isvalid)
//                 {
//                     res.status(200).json('Successfully logged in');
//                 }
//                 else{
//                     res.status( 401).json("user isn't authorised");
//                 }
                
//             }
//           });
//     })
    

    
// })

// app.listen(3000);



// // con.connect(function(err) {
// //     if (err) throw err;
// //     console.log("Connected!");
// //     var sql = `INSERT INTO user (email, name ) VALUES ('${req.body.email}', '${req.body.name}')`;
// //     con.query(sql, function (err, result) {
// //       if (err) throw err;
// //       console.log("1 record inserted");
// //     });
// //   });
// // res.status(200);
// // res.redirect('/booking');~