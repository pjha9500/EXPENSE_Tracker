const mysql=require('mysql2');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database:'expensetracker',
    password: "Pjha@11810995"
  })


con.connect((err)=>{
    if(err)throw err;
    console.log("connected");
})
module.exports=con;