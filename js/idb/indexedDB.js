import { openDB } from 'idb';

export const database = openDB('myDB', 1, {
  upgrade(db) {
    db.createObjectStore('searchMovie');
    db.createObjectStore('favorite_movie', { autoIncrement: true });
  },
});

export async function setFavMovie(data) {
  const db = await openDB('myDB', 1);
  db.put('favorite_movie', { data });
  db.close();
}

const createMovieDisplay = (div, data) => {
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
  div.append(movie);
};
const createFavButton = (div, data) => {
  const bntFav = document.createElement('button');
  bntFav.textContent = 'add to fav';
  bntFav.classList.add('fav-button');
  bntFav.addEventListener('click', ({ target }) => {
    if (target.textContent === 'add to fav') {
      setFavMovie(data);
      bntFav.textContent = 'Remove from fav';
      bntFav.classList.add('red-button');
    } else {
      bntFav.textContent = 'add to fav';
      bntFav.classList.remove('red-button');
    }
  });

  div.append(bntFav);
};
const removeFav = (div) => {
  const bntFav = document.createElement('button');
  bntFav.textContent = 'Remove from fav';
  bntFav.classList.add('red-button');
  bntFav.classList.add('fav-button');
  div.append(bntFav);

  bntFav.addEventListener('click', ({ target }) => {
    const element = target;
    const favMovie = element.parentElement;
    favMovie.remove();
  });
};

const createNoteInput = (div) => {
  const noteDiv = document.createElement('div');
  noteDiv.classList.add('display-note');

  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Note about the movie...';

  const pNote = document.createElement('p');
  pNote.classList.add('display-none');

  const bntNote = document.createElement('button');
  bntNote.textContent = 'Add Note';

  bntNote.addEventListener('click', (e) => {
    const element = e.target;
    const InputElem = element.previousElementSibling.previousElementSibling;

    if (element.textContent === 'Add Note') {
      if (InputElem.value) {
        pNote.innerHTML = `<span>User Note: </span> ${InputElem.value}`;
        InputElem.classList.add('display-none');
        element.textContent = 'View Note';
      } else {
        InputElem.placeholder = 'Input is missing?';
        InputElem.classList.add('red-input');
      }
    } else if (element.textContent === 'View Note') {
      pNote.classList.remove('display-none');
      element.textContent = 'Edit Note';
    } else {
      InputElem.classList.remove('display-none');
      pNote.classList.add('display-none');
      element.textContent = 'Add Note';
    }
  });
  noteDiv.append(textarea, pNote, bntNote);
  div.append(noteDiv);
};

export const getSearchMovie = async (con) => {
  const db = await openDB('myDB', 1);
  db.get('searchMovie', 'search').then(({ search }) => {
    const data = search;
    if (data) {
      const displayDiv = document.createElement('div');
      displayDiv.classList.add('display-div');

      createMovieDisplay(displayDiv, data);
      createNoteInput(displayDiv);
      createFavButton(displayDiv, data);

      con.append(displayDiv);
    }
  });
  db.close();
};

export async function getFavMovie(con) {
  const db = await openDB('myDB', 1);
  db.getAll('favorite_movie').then((res) => {
    if (res.length) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < res.length; i++) {
        const displayDiv = document.createElement('div');
        displayDiv.classList.add('display-div');

        createMovieDisplay(displayDiv, res[i].data);
        // createNoteInput(displayDiv);
        removeFav(displayDiv);

        con.append(displayDiv);
      }
    }
  });
  db.close();
}
