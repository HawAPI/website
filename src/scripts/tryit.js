const API_URL = 'https://hawapi.theproject.id/api/v1/';

window.onload = () => {
  // Dialog
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

    dialog.showModal();
  });

  dialogCloseBtn.addEventListener('click', () => {
    dialog.close();
  });

  // Copy button
  document.getElementById('copy').addEventListener('click', () => {
    navigator.clipboard.writeText(API_URL + input.value);
  });

  // Clear button
  document.getElementById('clear').addEventListener('click', () => {
    input.value = '';
  });
};

async function fetchData(query) {
  return await fetch(API_URL + query, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
      return;
    });
}
