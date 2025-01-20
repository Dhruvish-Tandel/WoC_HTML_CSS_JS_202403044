
function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews'))  || [];
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
