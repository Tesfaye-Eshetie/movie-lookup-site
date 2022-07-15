import APIKey from './api-key';

const formTitle = document.getElementById('form-title');
const formID = document.getElementById('form-ID');
const title = document.getElementById('title');
const IMDB_ID = document.getElementById('IMDB_ID');
const displayMovie = document.querySelector('.display-movie');

const baseURL = 'https://www.omdbapi.com/';

const setError = (element, message) => {
  const inputControl = element.parentElement;
  // eslint-disable-next-line no-param-reassign
  element.placeholder = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = (movie) => {
  const divOne = document.createElement('div');
  const poster = document.createElement('img');
  poster.src = movie.Poster;
  poster.alt = `${movie.Title} poster`;
  divOne.appendChild(poster);

  const divTwo = document.createElement('div');
  const movieTitle = document.createElement('h2');
  movieTitle.textContent = `Title : ${movie.Title}`;
  divTwo.appendChild(movieTitle);
  const movieYear = document.createElement('h4');
  movieYear.textContent = `Year: ${movie.Year}`;
  divTwo.appendChild(movieYear);
  const movieRelased = document.createElement('p');
  movieRelased.textContent = `Released Date: ${movie.Released}`;
  divTwo.appendChild(movieRelased);

  displayMovie.appendChild(divOne);
  displayMovie.appendChild(divTwo);
};

async function getMovie(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  setSuccess(data);
}

formTitle.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = title.value.trim();

  if (searchTerm && searchTerm !== '') {
    getMovie(`${baseURL}?t=${searchTerm}&apikey=${APIKey}`);
    title.value = '';
  } else {
    setError(title, 'Title is required...');
  }
});

formID.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = IMDB_ID.value.trim();

  if (searchTerm && searchTerm !== '') {
    getMovie(`${baseURL}?i=${searchTerm}&apikey=${APIKey}`);
    IMDB_ID.value = '';
  } else {
    setError(IMDB_ID, 'IMDB_ID is required...');
  }
});
