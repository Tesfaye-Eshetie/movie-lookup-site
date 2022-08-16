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
  bntFav.addEventListener('click', ({ target }) => {
    if (target.textContent === 'add to fav') {
      setFavMovie(data);
      bntFav.textContent = 'Remove from fav';
    } else {
      bntFav.textContent = 'add to fav';
    }
  });

  div.append(bntFav);
};

const createNoteInput = (div) => {
  const noteDiv = document.createElement('div');
  noteDiv.classList.add('display-note');

  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Note about the movie...';
  const bntNote = document.createElement('button');
  bntNote.textContent = 'Add Note';

  bntNote.addEventListener('click', (e) => {
    const element = e.target;
    const pNote = document.createElement('p');
    if (element.textContent === 'Add Note') {
      const InputElem = element.previousElementSibling;
      if (InputElem.value) {
        pNote.textContent = InputElem.value;
        pNote.classList.add('display-none');
        noteDiv.appendChild(pNote);
        InputElem.remove();
        element.textContent = 'View Note';
      } else {
        InputElem.placeholder = 'Input is missing?';
        InputElem.classList.add('red-input');
      }
    } else if (element.textContent === 'View Note') {
      pNote.classList.add('display-block');
      element.textContent = 'Edit Note';
    } else {
      element.textContent = 'Add Note';
    }
  });
  noteDiv.append(textarea, bntNote);
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
    console.log(data);
  });
  db.close();
};

export async function getFavMovie(con) {
  const db = await openDB('myDB', 1);
  db.getAll('favorite_movie').then((res) => {
    if (res.length) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < res.length; i++) {
        const movie = document.createElement('display-movie');
        movie.setAttribute('poster', res[i].data.Poster);
        movie.setAttribute('title', res[i].data.Title);
        movie.setAttribute('year', res[i].data.Year);
        for (let j = 0; j < res[i].data.Ratings.length; j++) {
          const x = 'rating_';
          movie.setAttribute(
            x + j,
            `${res[i].data.Ratings[j].Source} : ${res[i].data.Ratings[j].Value}`
          );
        }
        movie.setAttribute('date', res[i].data.Released);

        const bntFav = document.createElement('button');

        bntFav.textContent = 'Remove from fav';
        bntFav.addEventListener('click', () => {
          // setFavMovie(data);
        });

        con.append(movie);
      }
    }
    console.log(res);
  });
  db.close();
}
