const search = () =>{
    const searchbox=document.getElementById("MyInput").value.toUpperCase();
    const storeitems=document.getElementById("course-list")
    const course=document.querySelectorAll(".course")
    const cname=storeitems.getElementsByTagName("h3")

    for(var i=0;i<cname.length;i++){


        let matchcourse=course[i].getElementsByTagName('h3')[0];

        if(matchcourse){
           let textvalue = matchcourse.textContent || matchcourse.innerHTML;

           if(textvalue.toUpperCase().indexOf(searchbox)>-1){
            course[i].style.display ="";

           }
           else{
            course[i].style.display ="none";
           }
        }

    }

}