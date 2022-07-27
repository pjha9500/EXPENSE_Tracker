// function showonScreen(expAmount, expCategory, expDescription, expDate){
//     let newExpense = `
//             ${expAmount} : ${expCategory} : ${expDescription} : ${expDate}
//         `
//         // console.log(newExpense);
//         let li=document.createElement('li');
//         li.className = "list-group-item";
//         li.innerHTML=newExpense;
        
//         let del=document.createElement('button');
//         del.className="btn btn-danger btn-sm float-right delete",
//         del.innerHTML="X";
//         li.appendChild(del);
//         // console.log(li);
//         document.getElementById('items').appendChild(li);

// }
let token=localStorage.getItem('token');
window.addEventListener('DOMContentLoaded',()=>{

    axios({
        method:'get',
        url:'http://localhost:3000/home',
         headers: {"Authorization" : token} ,
    }).then((user)=>{
        console.log(user.data.user.isPremium)
        
        // let data=res.data.expenses
        // for(let i=0;i<data.length;i++)
        // {
        //     showonScreen(data[i].amount,data[i].category,data[i].description,data[i].createdAt.slice(0,10))

        // }
    }
    ).catch((err)=>{console.log(err)});
    
})
