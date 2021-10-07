const colorModeButton = document.querySelector('.btn-mode');
const countriesEl = document.querySelector('.countries-container');
const regionSelector = document.querySelector('.region-select');
const searchField = document.querySelector('.searchbar');
const searchBar = document.querySelector('.section-search');
const btnBack = document.querySelector('.btn-primary');
const sectionCountry = document.querySelector('.country');
const sectionSearch = document.querySelector('.search');

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

export const countryDetailsHandler = function (handler) {
  countriesEl.addEventListener('click', e => {
    const country = e.target.closest('.card');
    if (!country) return;
    const countryName = country.dataset.country;
    handler(countryName);
  });
};

export const renderError = function () {
  clearCountriesEl();
  countriesEl.innerHTML = `
    <h2 style='color: var(--text)'>No country found with that query!
    Please try again!</h2>
    `;
};

export const getQuery = function () {
  const query = document.querySelector('.search-input').value;
  clearInput();
  return query;
};

const clearInput = function () {
  document.querySelector('.search-input').value = '';
};

const generateCountriesMarkup = function (data) {
  return data
    .map(
      country => `
    <div class="card" data-country="${country.cca3}"">
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

const generateCountryDetailsMarkup = function (data) {
  return `
  <div class="countries-details">
    <img class="countries-details-img" src="${data.flag}" alt="${data.name}" />
    <div class="countries-details-text">
      <h3>${data.name}</h3>
      <div class="countries-details-text-details">
        <p><span>Native Name: </span>${data?.nativeName}</p>
        <p><span>Population: </span>${data.population}</p>
        <p><span>Region: </span>${data.region}</p>
        <p><span>Sub Region: </span>${data.subRegion}</p>
        <p><span>Capital: </span>${data.capital}</p>
        <p><span>Top Level Domain: </span>${data.tld}</p>
        <p><span>Currencies: </span>${data.currencies}</p>
        <p><span>Languages: </span>${data.languages}</p>
      </div>
      <div class="countries-details-text-borders">
        <p class="capital"><span>Border Countries:</span></p>
        ${
          data.borders
            ? data.borders
                .map(border => `<button class="btn-secondary" data-country='${data.border}'>${border}</button>`)
                .join('')
            : ''
        }
        
      </div>
    </div>
  </div>
  `;
};
const clearCountriesEl = function () {
  countriesEl.innerHTML = '';
};

const clearSectionCountries = function () {
  sectionCountry.innerHTML = '';
};

const pageChangerNav = function () {
  searchBar.classList.toggle('hidden');
  btnBack.classList.toggle('hidden');
};

export const renderCountries = function (data) {
  const markup = generateCountriesMarkup(data);
  clearCountriesEl();
  countriesEl.insertAdjacentHTML('afterbegin', markup);
};

export const goBackToMainPage = function (handler) {
  sectionSearch.addEventListener('click', e => {
    const btn = e.target.closest('.btn-primary');
    if (!btn) return;
    clearSectionCountries();
    pageChangerNav();
    handler();
  });
};

export const renderCountryDetails = function (data) {
  const markup = generateCountryDetailsMarkup(data);
  clearCountriesEl();
  pageChangerNav();
  sectionCountry.insertAdjacentHTML('afterbegin', markup);
};
