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
      };
    });
  } catch (error) {
    throw error;
  }
};

export const searchCountries = async function (country) {
  try {
    const data = await getCountriesJSON(`${API_URL}name/${country}`);
    if (!data) return;

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
