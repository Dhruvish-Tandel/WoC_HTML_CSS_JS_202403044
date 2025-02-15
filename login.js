const webpage = document.querySelector('.webpage');
const signuplink = document.querySelector('.signuplink');
const loginlink = document.querySelector('.loginlink');
const signupbtn = document.querySelector('.btn2');

signuplink.addEventListener('click', () => {
    webpage.classList.add('active');
})

loginlink.addEventListener('click', () => {
    webpage.classList.remove('active');
})


signupbtn.addEventListener('click', (e) => {

    const password = document.querySelector('.password').value;
    const confirmpassword = document.querySelector('.confirmpassword').value;

    if (password != "") {

        if (password != confirmpassword) {
            e.preventDefault();
            alert("Password do not match");

        }





    }
}
)


function saveData(){
    let name,email,password;
    name=document.getElementById('name').value;
    email=document.getElementById('email').value;
    password=document.getElementById('password').value;

    const  confirmpassword=document.querySelector('.confirmpassword').value;

    let user_records=new Array();
   user_records=JSON.parse(localStorage.getItem("users") || "[]");

   if(name!="" && email!="" && password!="" && password==confirmpassword){
    
    if(user_records.some((v)=>{
        return v.email==email;
    })){
        alert("User already exists");

    }

    else{
        alert("Sign Up successfully!");
    user_records.push({
        "name":name,
        "email":email,
        "password":password
    })

    localStorage.setItem("users",JSON.stringify(user_records));
   }
}

}

function saveDatalogin(){

    let name,email,password;
    name=document.getElementById('namelogin').value
    email=document.getElementById('emaillogin').value;
    password=document.getElementById('passwordlogin').value;


    

    let user_loginrecords=new Array();
    user_loginrecords=JSON.parse(localStorage.getItem("users") || "[]");
    if(name!="" && email!="" && password!=""){

        const userIndex = user_loginrecords.findIndex(user => user.name === name && user.email === email && user.password === password);
        if(user_loginrecords.some((v)=>{
            return v.name==name && v.email==email && v.password==password
        })){
            
            alert("Login Successfully")
            let current_user=user_loginrecords.filter((v) =>{
                return v.name==name && v.email==email && v.password==password
            })[0]
    
            localStorage.setItem("name",current_user.name);
            localStorage.setItem("email",current_user.email);
            localStorage.setItem("password",current_user.password);
            localStorage.setItem("index",userIndex);
            localStorage.setItem("isLoggedin",'true');
            window.location.href="index.html";
         
            
           
        }

        else{
            alert("Login Fail");
          
    }
}


}