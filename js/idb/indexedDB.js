import { openDB } from 'idb';

export const database = openDB('myDB', 1, {
  upgrade(db) {
    db.createObjectStore('searchMovie');
    db.createObjectStore('favoriteMovie');
  },
});

export async function setSearchMovie(key, data) {
  return (await database).put('searchMovie', { data }, key);
}

export async function setFavMovie(key, data) {
  return (await database).put('favoriteMovie', { data }, key);
}

export async function getComments(key) {
  return (await database).get('searchMovie', key);
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
      setFavMovie(data.imdbID, data);
      bntFav.textContent = 'Remove from fav';
      bntFav.classList.add('red-button');
    } else {
      bntFav.textContent = 'add to fav';
      bntFav.classList.remove('red-button');
    }
  });

  div.append(bntFav);
};

const removeFav = (div, key) => {
  const bntFav = document.createElement('button');
  bntFav.textContent = 'Remove from fav';
  bntFav.classList.add('red-button');
  bntFav.classList.add('fav-button');
  div.append(bntFav);

  bntFav.addEventListener('click', async () => {
    (await database).delete('favoriteMovie', key);

    // eslint-disable-next-line no-restricted-globals
    location.reload();
  });
};

const createNoteInput = (div) => {
  const noteDiv = document.createElement('div');
  noteDiv.classList.add('display-note');

  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Note about the movie...';
  textarea.classList.add('display-none');

  const comments = document.createElement('p');
  comments.classList.add('display-none');

  const bntNote = document.createElement('button');

  getComments('comments').then(({ data }) => {
    if (data) {
      comments.innerHTML = `<span> Comments: </span> ${data}`;
      textarea.value = data;
      bntNote.textContent = 'View Note';
    } else {
      bntNote.textContent = 'Add Note';
      textarea.classList.remove('display-none');
    }
  });

  bntNote.addEventListener('click', (e) => {
    const element = e.target;
    const InputElem = element.previousElementSibling.previousElementSibling;
    const InputValue = InputElem.value;
    if (element.textContent === 'Add Note') {
      if (InputValue) {
        setSearchMovie('comments', InputValue);
        InputElem.classList.add('display-none');
        element.textContent = 'View Note';
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      } else {
        InputElem.placeholder = 'Input is missing?';
        InputElem.classList.add('red-input');
      }
    } else if (element.textContent === 'View Note') {
      comments.classList.remove('display-none');
      element.textContent = 'Edit Note';
    } else {
      InputElem.classList.remove('display-none');
      comments.classList.add('display-none');
      element.textContent = 'Add Note';
    }
  });
  noteDiv.append(textarea, comments, bntNote);
  div.append(noteDiv);
};

export const getSearchMovie = async (con) => {
  (await database).get('searchMovie', 'search').then(({ data }) => {
    if (data) {
      const displayDiv = document.createElement('div');
      displayDiv.classList.add('display-div');

      createMovieDisplay(displayDiv, data);
      createNoteInput(displayDiv);
      createFavButton(displayDiv, data);

      con.append(displayDiv);
    }
  });
};

export async function getFavMovie(con) {
  (await database).getAll('favoriteMovie').then((res) => {
    if (res.length) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < res.length; i++) {
        const displayDiv = document.createElement('div');
        displayDiv.classList.add('display-div');
        console.log(res[i]);

        createMovieDisplay(displayDiv, res[i].data);
        removeFav(displayDiv, res[i].data.imdbID);

        con.append(displayDiv);
      }
    }
  });
}
