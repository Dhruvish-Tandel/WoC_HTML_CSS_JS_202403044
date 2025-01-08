let image=document.querySelector('.image');
let images=["img2.webp","logo.webp"]
setInterval(function(){
    let rnd=Math.floor(Math.random()*images.length);
    image.src=images[rnd];
},1000);

let progressbar=document.querySelector(".circular");
let valuecircular=document.querySelector('.value-circular');

let progressvalue=0;
let progressEndvalue=1000;
let speed=100;

let progress= setInterval(()=>{

    progressvalue+=20;
    valuecircular.textContent=`${progressvalue}+`;
    progressbar.style.background= `conic-gradient(

    
#11998E , #38EF7D ${progressvalue*0.36}deg,

     #FFFFFF ${progressvalue*0.36}deg
    )`;
    if(progressvalue==progressEndvalue){
        clearInterval(progress);
    }

},speed);

