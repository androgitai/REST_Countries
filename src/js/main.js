import '../style/style.scss';
import image from '../img/flag.jpg';

const colorModeButton = document.querySelector('.btn-mode');
const countriesEl = document.querySelector('.countries');

let state = [];

//Dark mode
colorModeButton.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute('data-theme', `${theme === 'light' ? 'dark' : 'light'}`);
});

const getCountriesJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

const getCountriesData = async function () {
  try {
    const data = await getCountriesJSON('https://restcountries.com/v3.1/all');
    console.log(data);
    state = data.map(entry => {
      return {
        name: entry.name.official,
        population: entry.population,
        region: entry.region,
        capital: entry.capital?.[0],
        flag: entry.flags.svg,
      };
    });
    console.log(state);
  } catch (error) {
    console.error(error);
  }
};

const generateMarkup = function () {
  return state
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

const renderCountries = async function () {
  await getCountriesData();
  const markup = generateMarkup();
  countriesEl.insertAdjacentHTML('afterbegin', markup);
};

const init = function () {
  renderCountries();
};
init();
