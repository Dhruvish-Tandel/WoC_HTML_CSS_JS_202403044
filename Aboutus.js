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

  window.addEventListener('scroll', function() {
    const targetContent1 = document.getElementById('target-content_1');
    const targetContent2 = document.getElementById('target-content_2');
    const scrollPosition = window.scrollY; 
    const triggerPosition1 = -4; 
    const triggerPosition2=500;

    if (scrollPosition >= triggerPosition1) {
      targetContent1.classList.add('visible');
      targetContent1.classList.remove('hidden');
    } else {
      targetContent1.classList.remove('visible');
      targetContent1.classList.add('hidden');
    }

    if (scrollPosition >= triggerPosition2) {
      targetContent2.classList.add('visible');
      targetContent2.classList.remove('hidden');
    } else {
      targetContent2.classList.remove('visible');
      targetContent2.classList.add('hidden');
    }
  });