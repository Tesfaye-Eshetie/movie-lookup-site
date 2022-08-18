import { APIKey } from './api-key';
import { setError, setSuccess, setNoResult } from './formValidation';
import { getSearchMovie, setSearchMovie } from './idb/indexedDB';

const baseURL = 'https://www.omdbapi.com/';
const formTitle = document.getElementById('form-title');
const title = document.getElementById('title');
const year = document.getElementById('year');
const plotTitle = document.getElementById('plot-title');

const formID = document.getElementById('form-ID');
const IMDB_ID = document.getElementById('IMDB_ID');
const plotID = document.getElementById('plot-ID');

const movieDisplay = document.getElementById('display');

const getMovie = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    if (data.Response === 'False') {
      setNoResult();
    } else {
      setSearchMovie('comments', '');
      setSearchMovie('search', data);

      // eslint-disable-next-line no-restricted-globals
      location.reload();
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

getSearchMovie(movieDisplay);
