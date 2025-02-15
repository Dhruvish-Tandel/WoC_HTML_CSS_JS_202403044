function logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('isLoggedin');
    window.location.replace('login.html');
}


window.onload = function () {
    if (!localStorage.getItem("isLoggedin")) {
        window.location.replace('login.html');
    }
}



const form = document.getElementById('inquiryForm');
const submitButton = document.getElementById('submit');

function checkFields() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const message = document.getElementById('message').value.trim();


    if (fullName && email && phoneNumber && message) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

form.addEventListener('input', checkFields);

checkFields();


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
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom
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
    yesButton.style=" background-color: yellow;color:black;width: 50px;margin: 10px;border-radius:10px;";
    yesButton.onclick = () => {
        addMessage("You can contact us at +91 7046525524.Thankyou!", 'bot');
        
    };
  
  
    const noButton = document.createElement('button');
    noButton.style="background-color: green;color:black;width: 50px;margin: 10px;border-radius:10px;";
    noButton.textContent = 'No';
    noButton.onclick = () => {
        addMessage("Thank you for chatting with us.Have a great day!", 'bot');
       
       
    };
  
  
    buttonDiv.appendChild(yesButton);
    buttonDiv.appendChild(noButton);
    
  
    chatBody.appendChild(buttonDiv);
   
  }