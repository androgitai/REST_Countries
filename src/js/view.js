const colorModeButton = document.querySelector('.btn-mode');
const countriesEl = document.querySelector('.countries');
const regionSelector = document.querySelector('.region-select');
const searchField = document.querySelector('.searchbar');

console.log(regionSelector);
////////Dark mode
colorModeButton.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', `${theme === 'light' ? 'dark' : 'light'}`);
});
////////

export const searchCountriesHandler = function (handler) {
  searchField.addEventListener('submit', e => {
    e.preventDefault();
    regionSelector.selectedIndex = '0';
    handler();
  });
};

export const countriesFilterHandler = function (handler) {
  regionSelector.addEventListener('change', () => handler(regionSelector.value));
};

export const getQuery = function () {
  const query = document.querySelector('.search-input').value;
  clearInput();
  return query;
};

const clearInput = function () {
  const query = (document.querySelector('.search-input').value = '');
};

const generateMarkup = function (data) {
  return data
    .map(
      country => `
    <div class="card">
      <img class="card-img" src="${country.flag}" alt="Country Flag" />
      <div class="card-details">
        <h2 class="card-country">${country.name}</h2>
        <p class="population"><span>Population:</span>${country.population}</p>
        <p class="region"><span>Region:</span>${country.region}</p>
        <p class="capital"><span>Capital:</span>${country.capital ? country.capital : 'None'}</p>
      </div>
    </div>
    `
    )
    .join('');
};

const clearCountries = function () {
  countriesEl.innerHTML = '';
};

export const renderCountries = function (data) {
  const markup = generateMarkup(data);
  clearCountries();
  countriesEl.insertAdjacentHTML('afterbegin', markup);
};
