import APIKey from './api-key';
import displayMovie from './movie-component/displayMovie';

window.customElements.define('display-movie', displayMovie);

const baseURL = 'https://www.omdbapi.com/';

const formTitle = document.getElementById('form-title');
const title = document.getElementById('title');
const year = document.getElementById('year');
const plotTitle = document.getElementById('plot-title');

const formID = document.getElementById('form-ID');
const IMDB_ID = document.getElementById('IMDB_ID');
const plotID = document.getElementById('plot-ID');

const movieDisplay = document.getElementById('display');

const setError = (element, message) => {
  displayMovie.textContent = '';

  const inputControl = element.parentElement;
  // eslint-disable-next-line no-param-reassign
  element.placeholder = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;

  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const setNoResult = () => {
  movieDisplay.textContent = '';

  const divNo = document.createElement('div');
  divNo.classList.add('no-response');
  const noResponse = document.createElement('h2');
  noResponse.textContent =
    'Sorry, no results were found using your input. Please try a different search.';

  divNo.appendChild(noResponse);
  movieDisplay.appendChild(divNo);
};

const getMovie = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    if (data.Response === 'False') {
      setNoResult();
    } else {
      const movie = document.createElement('display-movie');
      movie.setAttribute('poster', data.Poster);
      movie.setAttribute('title', data.Title);
      movie.setAttribute('year', data.Year);
      for (let i = 0; i < data.Ratings.length; i++) {
        const x = 'rating_';
        movie.setAttribute(
          x + i,
          `${data.Ratings[i].Source} : ${data.Ratings[i].Value}`
        );
      }
      movie.setAttribute('date', data.Released);
      movie.setAttribute('plot', data.Plot);
      movieDisplay.appendChild(movie);
    }
  } catch (error) {
    console.log(error.message);
  }
};

formTitle.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = title.value.trim();
  const plotValue = plotTitle.value;
  const yearValue = year.value;

  if (searchTerm && searchTerm !== '' && yearValue && yearValue !== '') {
    getMovie(
      `${baseURL}?t=${searchTerm}&y=${yearValue}&plot=${plotValue}&apikey=${APIKey}`
    );
    title.value = '';
    year.value = '';
  } else if (searchTerm && searchTerm !== '') {
    getMovie(`${baseURL}?t=${searchTerm}&plot=${plotValue}&apikey=${APIKey}`);
    setSuccess(title);
    title.value = '';
  } else {
    setError(title, 'Title is required...');
  }
});

formID.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = IMDB_ID.value.trim();
  const plotValue = plotID.value;

  if (searchTerm && searchTerm !== '') {
    getMovie(`${baseURL}?i=${searchTerm}&plot=${plotValue}&apikey=${APIKey}`);
    setSuccess(IMDB_ID);
    IMDB_ID.value = '';
  } else {
    setError(IMDB_ID, 'IMDB_ID is required...');
  }
});
