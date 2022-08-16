import { getFavMovie } from './idb/indexedDB';

const favMovies = document.getElementById('display-fav');

getFavMovie(favMovies);
