let data=document.getElementById('form');
data.addEventListener('submit', async (e)=>{
    e.preventDefault();
    console.log(document.getElementById('email').value)
    if(document.getElementById('email').value==='')
    {
        document.getElementById('email').placeholder='pleae enter you email';

    }
   

})