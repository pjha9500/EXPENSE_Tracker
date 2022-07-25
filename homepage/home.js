if(!localStorage.getItem('token'))
{
    window.location='../login/login.html';
}
function showonScreen(expAmount, expCategory, expDescription, expDate){
    let newExpense = `
            ${expAmount} : ${expCategory} : ${expDescription} : ${expDate}
        `
        // Creating new list element
        var li = document.createElement("li")
        li.className = "list-group-item"
        
        // Adding text node with input value
        li.appendChild(document.createTextNode(newExpense))

        // Creating del button element
        var delBtn = document.createElement("button")
        delBtn.className = "btn btn-danger btn-sm float-right delete"

        delBtn.appendChild(document.createTextNode("X"))

        li.appendChild(delBtn)

        itemList.appendChild(li)
}






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
            console.log(data[i]);

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
    data.push({ headers: {"Authorization" : token} });
    console.log(data);
    axios({
        method:'post',
        url:'http://localhost:3000/home/addExpenses',
        data:data
    }).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
    // axios.post('http://localhost:3000/home/addExpenses',[{details},{ headers: {"Authorization" : token} }]).then((res)=>console.log(res)).catch((err)=>console.log(err));
})