const movieDisplay = document.getElementById('display');

export const setError = (element, message) => {
  movieDisplay.textContent = '';

  const inputControl = element.parentElement;
  // eslint-disable-next-line no-param-reassign
  element.placeholder = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

export const setSuccess = (element) => {
  const inputControl = element.parentElement;

  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

export const setNoResult = () => {
  movieDisplay.textContent = '';

  const divNo = document.createElement('div');
  divNo.classList.add('no-response');
  const noResponse = document.createElement('h2');
  noResponse.textContent =
    'Sorry, no results were found using your input. Please try a different search.';

  divNo.appendChild(noResponse);
  movieDisplay.appendChild(divNo);
};
