import displayMovie from './components/displayMovie';
import showMovie from './components/showMovie';
import navbar from './components/navbar';
import contact from './components/contact';

import { getSearchMovie, setFavMovie, getFavMovie } from './idb/indexedDB';

window.customElements.define('display-movie', displayMovie);
window.customElements.define('show-movie', showMovie);
window.customElements.define('nav-bar', navbar);
window.customElements.define('contact-page', contact);

const favMovies = document.getElementById('display-fav');

getFavMovie(favMovies);
