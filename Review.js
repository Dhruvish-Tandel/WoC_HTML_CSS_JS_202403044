
function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const carouselInner = document.querySelector('.carousel-inner');


  reviews.forEach(review => {
    const newdiv = document.createElement('div');
    newdiv.classList.add('carousel-item');
    newdiv.innerHTML = `
        <h5>${review.message}</h5>
        <div class="stars" id="stars">
          ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
        </div>
        <h4><b>${review.name}</b></h4>
      `;
    carouselInner.appendChild(newdiv);
  });


}

window.onload = loadReviews;



document.getElementById('reviewForm').addEventListener('submit', function (event) {
  event.preventDefault();


  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;
  const rating = document.getElementById('rating').value;


  const review = {
    name: name,
    message: message,
    rating: rating
  };


  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(review);


  localStorage.setItem('reviews', JSON.stringify(reviews));

  const newdiv = document.createElement('div');

  newdiv.classList.add('carousel-item');

  newdiv.innerHTML =
    ` <h5>${message}</h5>
      <div class="stars" id="stars">
        ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}
      </div>
      <h4><b>${name}</b></h4>`;



  const carouselInner = document.querySelector('.carousel-inner');
  carouselInner.appendChild(newdiv);

  const modal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
  modal.hide();

  
  document.getElementById('reviewForm').reset();
});

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