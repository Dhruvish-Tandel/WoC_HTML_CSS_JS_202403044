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


const index=localStorage.getItem("index");
const userId = `user${index}`; 


let userData = JSON.parse(localStorage.getItem(userId)) || {
    coinBalance: 1000,
    purchasedItems: {},
    courseProgress: {}
};


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('coinBalance').innerText = userData.coinBalance;

    
    for (let i = 1; i <= 6; i++) {
        const itemPurchased = userData.purchasedItems[`course${i}`];
        if (itemPurchased) {
            const itemElement = document.getElementById(`course${i}`);
            const purchaseButton = itemElement.querySelector('button');
            const postPurchaseButtons = itemElement.querySelector('.post-purchase');

            purchaseButton.style.display = 'none'; 
            postPurchaseButtons.style.display = 'block'; 
        }
    }

    const isCourseListOpen = localStorage.getItem('isCourseListOpen') === 'true';
    const savedItemName = localStorage.getItem('savedItemName');
    if (isCourseListOpen && savedItemName) {
        openCourse(savedItemName);
    }
});

function purchaseItem(price, itemId) {
    if (userData.coinBalance >= price) {
        userData.coinBalance -= price;
        userData.purchasedItems[itemId] = true; 
        


        localStorage.setItem(userId, JSON.stringify(userData));
        document.getElementById('coinBalance').innerText = userData.coinBalance;

        
        const itemElement = document.getElementById(itemId);
        const purchaseButton = itemElement.querySelector('button');
        const postPurchaseButtons = itemElement.querySelector('.post-purchase');
       
        purchaseButton.style.display = 'none'; 
        postPurchaseButtons.style.display = 'block'; 

        alert("Purchase successful! You have bought a course for " + price + " coins.");
    } else {
        alert("Not enough coins!");
        
       
       
    }
}

function enroll(courseName) {
    alert("You have enrolled in " + courseName + "!");
}

function openCourse(courseName) {
    const courses = {
        'course 1': ['Financial Management', 'Data Organisation', 'Payroll Processing','Tax Compliance','Reporting'],
           'course 2': ['Content marketing', 'Social Media marketing', 'Content marketing','Email marketing','PPC Advertising'],
     'course 3': ['Basics', 'Mastering Financial', 'Simplifying Payroll','Unlocking Insights','Advanced Features'],
     'course 4': ['Myob Essentials', 'Mastering Financial', 'Simplifying Payroll','Unlocking Insights','Advanced Features'],
     'course 5': ['Introduction', 'Managing Transactions', 'Payroll Management','Financial Reporting','Advanced Features[Troubleshooting]'],
     'course 6': ['Introduction', 'Managing Transactions', 'Inventory Management','Financial Reporting','Advanced Features[Troubleshooting]']
    };

    
    const courseList = courses[courseName];

    
    const coursesElement = document.getElementById('courses');
    coursesElement.innerHTML = '';
    courseList.forEach((couse, index) => {
        const li = document.createElement('li');
        const checkboxId = `${courseName}-${index}`;
        li.innerHTML = `<input type="checkbox" id="${checkboxId}" onchange="updateProgressBar('${courseName}')" /> ${couse}`;
        coursesElement.appendChild(li);

        
        const isChecked = userData.courseProgress[checkboxId] === true;
        document.getElementById(checkboxId).checked = isChecked;
    });

   
    updateProgressBar(courseName);

  

    document.querySelector('.cpage').style.display = 'none';
    document.getElementById('courseList').style.display = 'block';

    localStorage.setItem('isCourseListOpen', 'true');
    localStorage.setItem('savedItemName', courseName); 
}



function updateProgressBar(courseName) {
    const checkboxes = document.querySelectorAll(`#courses input[type="checkbox"]`);
    const totalCourses = checkboxes.length;
    const checkedCourses = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

    
    for(let i=0;i<totalCourses;i++){
        if(checkboxes[i].checked && i>0 && !checkboxes[i-1].checked){
          checkboxes[i].checked=false;
          alert("Select the checkbox in Sequence.");
          return;
        }

    }

    const progressPercentage = (checkedCourses / totalCourses) * 100;


    document.getElementById('progress').style.width = progressPercentage + '%';

   
    checkboxes.forEach(checkbox => {
        userData.courseProgress[checkbox.id] = checkbox.checked;
    });


    localStorage.setItem(userId, JSON.stringify(userData));
}

function resetProgress() {
    
    userData.courseProgress = {};
    
   
    localStorage.setItem(userId, JSON.stringify(userData));

   

    const checkboxes = document.querySelectorAll(`#courses input[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

 

    updateProgressBar();

   
}

function backTocourse() {
  

    document.querySelector('.cpage').style.display = '';
    document.getElementById('courseList').style.display = 'none';
    localStorage.setItem('isCourseListOpen','false');
    localStorage.removeItem('savedItemName'); 
}

function sortCourses(criteria, order) {
    const courseList = document.getElementById('course-list');
    const courses = Array.from(courseList.getElementsByClassName('course'));

    courses.sort((a, b) => {
      const aValue = criteria === 'title' ? a.getAttribute('data-title') : parseInt(a.getAttribute('data-price'));
      const bValue = criteria === 'title' ? b.getAttribute('data-title') : parseInt(b.getAttribute('data-price'));

      return order === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    courseList.innerHTML = '';
    courses.forEach(course => courseList.appendChild(course));
  }

  function filterCourses(type) {
    const courseList = document.getElementById('course-list');
    const courses = Array.from(courseList.getElementsByClassName('course'));

  
    courses.forEach(course => {
      course.style.display = 'block'; 
    });

   
    if (type === 'paid') {
      courses.forEach(course => {
        if (course.getAttribute('data-type') !== 'paid') {
          course.style.display = 'none'; 
        }
      });
    } else if (type === 'free') {
      courses.forEach(course => {
        if (course.getAttribute('data-type') !== 'free') {
          course.style.display = 'none'; 
        }
      });
    }
  }

 
  function logout(){
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('isLoggedin');
    window.location.replace('login.html');
  }


window.onload =function(){
  if(!localStorage.getItem("isLoggedin")){
      window.location.replace('login.html');
  }
}


function toggleChat() {
  const chatbot = document.getElementById('chatbot');
  chatbot.style.display = chatbot.style.display === 'none' || chatbot.style.display === '' ? 'flex' : 'none';
}

function sendMessage() {
  const userInput = document.getElementById('user-input');
  const userMessage = userInput.value;
  if (userMessage.trim() !== '') {
    addMessage(userMessage, 'user');
    userInput.value = '';
    respondToUser (userMessage);
  }
}

function addMessage(message, sender) {
  const chatBody = document.getElementById('chat-body');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  messageDiv.innerHTML = message;
  chatBody.appendChild(messageDiv);
  chatBody.scrollTop = chatBody.scrollHeight; 
}

function respondToUser (message) {
  const lowercase_message=message.toLowerCase();
  const responses = {
      "tally": "The Tally course costs 500 and takes 3 months.Do you want to continue the conversation.",
      "digitalmarketing": "The DigitalMarketing course is Free and takes 1 month.Do you want to continue the conversation.",
      "xero": "The Xero course costs 200 and takes 2 months.DO you want to continue the conversation.",
      "myob": "The Myob course is Free and takes 1 month.Do you want to continue the conversation.",
      "qbooks": "The Qbooks course costs 100 and takes 3 months.Do you want to continue the conversation.",
      "sage" : "The Sage course costs 300 and takes 3 months.Do you want to continue the conversation.",
      "default": "Sorry, I couldn't find that course. Please choose from the available courses <br>-Tally <br>-Digital marketing<br>-Xero <br>-Sage<br>-Qbook<br>-Myob"
  };

  const response = responses[lowercase_message] || responses["default"];
  setTimeout(() => {
      addMessage(response, 'bot');
      if (response!=responses["default"]) {
          addYesNoButtons();
      }
  }, 1000); 
}

function addYesNoButtons() {
  const chatBody = document.getElementById('chat-body');
  

  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'button-container';
  buttonDiv.style="text-align: center;"
 


  const yesButton = document.createElement('button');
  yesButton.textContent = 'Yes';
  yesButton.style=" background-color: aqua;color:yellow;width: 50px;margin: 10px;";
  yesButton.onclick = () => {
      addMessage("You can contact us at +91 7046525524.Thankyou!", 'bot');
      
  };


  const noButton = document.createElement('button');
  noButton.style=" background-color: aqua;color:yellow;width: 50px;margin: 10px;";
  noButton.textContent = 'No';
  noButton.onclick = () => {
      addMessage("Thank you for chatting with us.Have a great day!", 'bot');
     
     
  };


  buttonDiv.appendChild(yesButton);
  buttonDiv.appendChild(noButton);
  

  chatBody.appendChild(buttonDiv);
 
}