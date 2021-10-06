import { getCountriesJSON } from './helpers';
import { API_URL } from './config';

export let state = [];

export const getCountriesData = async function () {
  try {
    const data = await getCountriesJSON(`${API_URL}all`);
    if (!data) return;

    state = data.map(entry => {
      return {
        name: entry.name.official,
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
      };
    });
  } catch (error) {
    throw error;
  }
};

export const searchCountries = async function (country) {
  try {
    const data = await getCountriesJSON(`${API_URL}name/${country}`);
    if (!data | (data.status === 404)) throw new Error('Country not found', data.message);

    state = data.map(entry => {
      return {
        name: entry.name.official,
        population: entry.population,
        region: entry.region,
        capital: entry.capital?.[0],
        flag: entry.flags.svg,
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
