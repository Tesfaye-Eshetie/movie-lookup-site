import APIKey from './api-key';

const formTitle = document.getElementById('form-title');
const formID = document.getElementById('form-ID');
const title = document.getElementById('title');
const year = document.getElementById('year');
const IMDB_ID = document.getElementById('IMDB_ID');
const plotTitle = document.getElementById('plot-title');
const plotID = document.getElementById('plot-ID');
const displayMovie = document.getElementById('display-movie');

const baseURL = 'https://www.omdbapi.com/';

const setError = (element, message) => {
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
  displayMovie.textContent = '';

  const divNo = document.createElement('div');
  divNo.classList.add('no-response');
  const noResponse = document.createElement('h2');
  noResponse.textContent =
    'Sorry, no results were found using your input. Please try a different search.';

  divNo.appendChild(noResponse);
  displayMovie.appendChild(divNo);
};

const setValue = (movie) => {
  displayMovie.textContent = '';

  const card = document.createElement('div');
  card.classList.add('card');

  const divOne = document.createElement('div');
  const poster = document.createElement('img');
  poster.src = movie.Poster;
  poster.alt = `${movie.Title} poster`;
  divOne.appendChild(poster);

  const divTwo = document.createElement('div');
  const movieTitle = document.createElement('h2');
  movieTitle.textContent = movie.Title;
  divTwo.appendChild(movieTitle);
  const movieYear = document.createElement('h4');
  movieYear.textContent = `Year: ${movie.Year}`;
  divTwo.appendChild(movieYear);

  const divRating = document.createElement('div');
  const ratings = document.createElement('h3');
  divRating.appendChild(ratings);

  if (movie.Rated !== 'R') {
    ratings.textContent = "This Movie didn't Rated";
  } else {
    ratings.textContent = 'Ratings values from various sources';
    const ul = document.createElement('ul');
    const liOne = document.createElement('li');
    liOne.textContent = `${movie.Ratings[0].Source} : ${movie.Ratings[0].Value}`;
    const liTwo = document.createElement('li');
    liTwo.textContent = `${movie.Ratings[1].Source} : ${movie.Ratings[1].Value}`;
    const liThree = document.createElement('li');
    liThree.textContent = `${movie.Ratings[2].Source} : ${movie.Ratings[2].Value}`;
    ul.appendChild(liOne);
    ul.appendChild(liTwo);
    ul.appendChild(liThree);
    divRating.appendChild(ul);
  }
  divTwo.appendChild(divRating);

  const movieRelased = document.createElement('p');
  movieRelased.textContent = `Released Date: ${movie.Released}`;
  divTwo.appendChild(movieRelased);
  const moviePlot = document.createElement('p');
  moviePlot.textContent = `Plot: ${movie.Plot}`;
  divTwo.appendChild(moviePlot);

  divOne.classList.add('div-flex');
  divTwo.classList.add('div-flex');

  card.appendChild(divOne);
  card.appendChild(divTwo);

  displayMovie.appendChild(card);
};

const getMovie = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    if (data.Response === 'False') {
      setNoResult();
    } else {
      setValue(data);
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
