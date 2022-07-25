console.log(document.getElementById('form'));
class newuser{
    constructor(name,email,number,password)
    {
        this.name=name;
        this.email=email;
        this.number=number;
        this.password=password;
    }
}
let data=document.getElementById('form');
data.addEventListener('submit',(e)=>{
    e.preventDefault();
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let number=document.getElementById('Contact').value;
    let password=document.getElementById('password').value;
    let user=new newuser(name,email,number,password);
    console.log(user);

    axios({
        method:'post',
        url:'http://localhost:3000/signup',
        data:user
    }).then((res)=>{console.log(res.data.flag);
                    alert('successfully singned up');
                    window.location='../login/login.html'}).catch((err)=>{console.log(err);
                    alert('User already exist please login')});

})

function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }