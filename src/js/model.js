import { getCountriesJSON } from './helpers';
import { API_URL } from './config';

export let state = [];

export const getCountriesData = async function () {
  try {
    const data = await getCountriesJSON(`${API_URL}all`);
    if (!data) return;

    state = data.map(entry => {
      return {
        name: entry.name.common,
        population: entry.population,
        region: entry.region,
        capital: entry.capital?.[0],
        flag: entry.flags.svg,
        cca3: entry.cca3,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const searchCountries = async function (cca3) {
  try {
    const data = await getCountriesJSON(`${API_URL}alpha?codes=${cca3}`);
    if (!data | (data.status === 404)) throw new Error('Country not found', data.message);

    state = data.map(entry => {
      return {
        name: entry.name.common,
        population: entry.population,
        region: entry.region,
        capital: entry.capital?.[0],
        flag: entry.flags.svg,
        nativeName: entry.name.nativeName ? Object.values(entry.name.nativeName)[0].official : entry.name.official,
        subRegion: entry.subregion,
        tld: entry.tld ? entry.tld[0] : '',
        currencies: entry.currencies ? Object.keys(entry.currencies) : '',
        languages: entry.languages ? Object.values(entry.languages) : '',
        borders: entry.borders ? entry.borders : '',
        cca3: entry.cca3,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const filterCountries = function (region) {
  const fileteredCountries = state.filter(country => country.region.toLowerCase() === region);
  return fileteredCountries;
};
