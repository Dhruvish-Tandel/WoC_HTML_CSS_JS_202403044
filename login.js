const webpage=document.querySelector('.webpage');
const signuplink=document.querySelector('.signuplink');
const loginlink=document.querySelector('.loginlink');
const signupbtn=document.querySelector('.btn2');

signuplink.addEventListener('click',()=>{
    webpage.classList.add('active');
})

loginlink.addEventListener('click',()=>{
    webpage.classList.remove('active');
})




