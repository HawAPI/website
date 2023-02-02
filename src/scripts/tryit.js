const API_URL = 'https://hawapi.theproject.id/api/v1/';

window.onload = () => {
  // Check if uri has 'search' param.
  if (window.location.search !== '') {
    const inputSearch = document.querySelector('#input');
    inputSearch.value = window.location.search.replace('?search=', '');
  }

  // Dialog
  handleSearchButtonEvent();

  // Copy button
  handleCopyButtonEvent();

  // Clear button
  handleClearButtonEvent();
};

/**
 * Method to handle the click on 'Search' button.
 */
function handleSearchButtonEvent() {
  // Dialog
  const main = document.querySelector('main');
  const dialog = document.getElementById('result-dialog');
  const dialogCloseBtn = document.querySelector('.dg-btn-close');
  const searchButton = document.querySelector('#search');
  const viewer = document.querySelector('.pre-result');
  const input = document.querySelector('#input');
  const subTitle = document.querySelector('.dg-sub-title');

  searchButton.addEventListener('click', async () => {
    // If search is empty, just ignore.
    if (!input.value) return;

    subTitle.textContent = API_URL + input.value;

    // Set json data and expand all fields.
    viewer.data = await fetchData(input.value);
    viewer.expand('*');

    main.style.filter = 'blur(1rem)';
    dialog.showModal();
  });

  dialogCloseBtn.addEventListener('click', () => {
    main.style.filter = 'none';
    dialog.close();
  });
}

/**
 * Method to handle the click on 'Copy' button.
 */
function handleCopyButtonEvent() {
  document.getElementById('copy').addEventListener('click', () => {
    navigator.clipboard.writeText(API_URL + input.value);
  });
}

/**
 * Method to handle the click on 'Clear' button.
 */
function handleClearButtonEvent() {
  document.getElementById('clear').addEventListener('click', () => {
    input.value = '';
  });
}

/**
 * Method to handle the click on 'Search' button.
 *
 * **Note:** The API url is automatically included
 *
 * Query e.g:
 *  * `/api/v1/actors?nationality=Canadian&order=first_name&sort=ASC`
 *  * `/api/v1/actors?order=first_name&sort=ASC`
 *  * `/api/v1/actors?first_name=John`
 *
 * @param {string} query The path to a endpoint of the API and query params.
 * @returns json
 */
async function fetchData(query) {
  return await fetch(API_URL + query, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      const isJson = response.headers
        .get('content-type')
        ?.includes('application/json');

      let error;

      if (!isJson) {
        error = 'Content type is not json';
        throw new Error(error);
      }

      if (!response.ok) {
        error = await response.text();
        throw new Error(error);
      }

      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
      return { error: error.message };
    });
}
