if(!localStorage.getItem('token'))
{
    window.location='../login/login.html';
}
function showonScreen(expAmount, expCategory, expDescription, expDate){
    let newExpense = `
            ${expAmount} : ${expCategory} : ${expDescription} : ${expDate}
        `
        // console.log(newExpense);
        let li=document.createElement('li');
        li.className = "list-group-item";
        li.innerHTML=newExpense;
        
        let del=document.createElement('button');
        del.className="btn btn-danger btn-sm float-right delete",
        del.innerHTML="X";
        li.appendChild(del);
        // console.log(li);
        document.getElementById('items').appendChild(li);

}

let logsout=document.getElementById('logout');

logsout.addEventListener('click',()=>{
    localStorage.removeItem('token');
    location.reload();
})





let token=localStorage.getItem('token');
window.addEventListener('DOMContentLoaded',()=>{

    axios({
        method:'get',
        url:'http://localhost:3000/home/getExpenses',
         headers: {"Authorization" : token} ,
    }).then((res)=>{
        
        let data=res.data.expenses
        for(let i=0;i<data.length;i++)
        {
            showonScreen(data[i].amount,data[i].category,data[i].description,data[i].createdAt.slice(0,10))

        }
    }
    ).catch((err)=>{console.log(err)});
    
})

let user=document.getElementById('user');
let details=JSON.parse(localStorage.getItem('userDetails'));
console.log(details.name);
user.innerHTML=`${details.name}`;

let form=document.getElementById('addForm');
class Data{
    constructor(amount,description,category)
    {
        this.amount=amount;
        this.category=category;
        this.description=description;
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let amount=document.getElementById('amount').value;
    let description=document.getElementById('description').value;
    let category=document.getElementById('category').value;
    let details=new Data(amount,description,category);
    console.log(details);
    let data=[];
    data.push(details);
    console.log(data);
    axios({
        method:'post',
        url:'http://localhost:3000/home/addExpense',
        data:data,
        headers: {"Authorization" : token}
    }).then((res)=>{console.log(res);
        showonScreen(amount,category,description,"Today")}).catch((err)=>{console.log(err)});
    
})




let rzp=document.getElementById('rzp');
console.log(rzp);


rzp.addEventListener('click' , async (e) =>{
    // console.log("hello");
    const response  = await axios.get('http://localhost:3000/premiummembership', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "7003442036"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:3000/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}

)