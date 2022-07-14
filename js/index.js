import APIKey from './api-key';

const form = document.getElementById('form');
const title = document.getElementById('title');

const baseURL = 'https://www.omdbapi.com/?t=';

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.parentElement.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = (movie) => {
  const displayMovie = `<div class="display-movie">
  <div>  <img src="${movie.Poster}" alter="poster" loading="lazy"></div>
  <div><h2>Title : ${movie.Title}</h2>
  <h4>Year : ${movie.Year}</h4><p>Released Date: ${movie.Released}</p>
  </div> 
  </div>
`;
  form.parentElement.innerHTML = displayMovie;
};

async function getMovie(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  setSuccess(data);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = title.value.trim();

  if (searchTerm && searchTerm !== '') {
    getMovie(`${baseURL + searchTerm}&apikey=${APIKey}`);
    title.value = '';
  } else {
    setError(title, 'Title of the movie is required');
  }
});
