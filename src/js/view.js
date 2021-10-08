import Numeral from 'numeral';
import icons from '../img/icons.svg';

const colorModeButton = document.querySelector('.btn-mode');
const btnBack = document.querySelector('.btn-primary');
const regionSelector = document.querySelector('.region-select');
const searchField = document.querySelector('.searchbar');
const searchBar = document.querySelector('.section-search');
const sectionSearch = document.querySelector('.search');
const sectionCountry = document.querySelector('.country');
const countriesEl = document.querySelector('.countries-container');

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

export const countryNeighbourRenderHandler = function (handler) {
  sectionCountry.addEventListener('click', e => {
    const btn = e.target.closest('.btn-secondary');
    if (!btn) return;
    const btnData = btn.dataset.country;
    handler(btnData);
  });
};

export const renderSpinner = function () {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  clearSectionCountries();
  sectionCountry.insertAdjacentHTML('afterbegin', markup);
};

export const clearCountriesEl = function () {
  countriesEl.innerHTML = '';
};

export const clearSectionCountries = function () {
  sectionCountry.innerHTML = '';
};

const pageChangerForward = function () {
  searchBar.classList.add('hidden');
  btnBack.classList.remove('hidden');
};
const pageChangerBackward = function () {
  searchBar.classList.remove('hidden');
  btnBack.classList.add('hidden');
};
export const renderError = function (error) {
  clearCountriesEl();
  countriesEl.innerHTML = `
    <h2 style='color: var(--text)'>${error}</h2>
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
      <div class="card-img">
        <img src="${country.flag}" alt="Country Flag" />
      </div>  
      <div class="card-details">
        <h2 class="card-country">${country.name}</h2>
        <p class="population"><span>Population:</span>${Numeral(country.population).format('0,0')}</p>
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
  <div class="country-details">
    <img class="country-details-img" src="${data.flag}" alt="${data.name}" />
    <div class="country-details-text">
      <h3>${data.name}</h3>
      <div class="country-details-text-details">
        <p><span>Native Name: </span>${data?.nativeName}</p>
        <p><span>Population: </span>${Numeral(data.population).format('0,0')}</p>
        <p><span>Region: </span>${data.region}</p>
        <p><span>Sub Region: </span>${data.subRegion}</p>
        <p><span>Capital: </span>${data.capital}</p>
        <p><span>Top Level Domain: </span>${data.tld}</p>
        <p><span>Currencies: </span>${data.currencies}</p>
        <p><span>Languages: </span>${data.languages}</p>
      </div>
      <div class="country-details-text-borders">
        <p class="borders"><span>Border Countries:</span></p>
        ${
          data.borders
            ? data.borders
                .map(border => `<button class="btn-secondary" data-country='${border.cca3}'>${border.name}</button>`)
                .join('')
            : 'None'
        }
        
      </div>
    </div>
  </div>
  `;
};

export const renderCountries = function (data) {
  const markup = generateCountriesMarkup(data);
  clearCountriesEl();
  clearSectionCountries();
  countriesEl.insertAdjacentHTML('afterbegin', markup);
};

export const goBackToMainPage = function (handler) {
  sectionSearch.addEventListener('click', e => {
    const btn = e.target.closest('.btn-primary');
    if (!btn) return;
    clearSectionCountries();
    pageChangerBackward();
    regionSelector.selectedIndex = '0';
    handler();
  });
};

export const renderCountryDetails = function (data) {
  window.scrollTo(0, 0);
  pageChangerForward();
  const markup = generateCountryDetailsMarkup(data);
  clearCountriesEl();
  clearSectionCountries();
  sectionCountry.insertAdjacentHTML('afterbegin', markup);
};
