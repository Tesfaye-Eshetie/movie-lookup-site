import { API_URL, IMG_PATH } from './api-key';

const AllMovies = document.getElementById('main-page');

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  }
  if (vote >= 5) {
    return 'orange';
  }
  return 'red';
}

const showMovies = (movies) => {
  movies.forEach((movie) => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
          <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
          <div class="movie-info">
              <h3>${movie.title}</h3>
              <span class="${getClassByRate(movie.vote_average)}">${
      movie.vote_average
    }</span>
          </div>
          <div class="overview">
              <h3>Overview</h3>
              ${movie.overview}
          </div>
      `;
    AllMovies.appendChild(movieEl);
  });
};

const getMovies = async (url) => {
  try {
    const res = await fetch(url);
    const { results } = await res.json();
    showMovies(results);
  } catch (error) {
    console.log(error.message);
  }
};

getMovies(API_URL);
