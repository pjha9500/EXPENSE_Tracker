let data=document.getElementById('form');
data.addEventListener('submit', async (e)=>{
    e.preventDefault();
    console.log(document.getElementById('email').value)
    if(document.getElementById('email').value==='')
    {
        document.getElementById('email').placeholder='pleae enter you email';

    }
    else{
        console.log(document.getElementById('email').value);
        

        axios({
            method:'post',
            url:'http://localhost:3000/login/password',
            data:{email:document.getElementById('email').value},
        }).then(()=>console.log(res)).catch((err)=>{console.log(err)});
    }
   

})