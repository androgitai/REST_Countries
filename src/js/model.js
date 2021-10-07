import { getCountriesJSON } from './helpers';
import { API_URL } from './config';

export let state = [];

export const getCountriesData = async function (country = '') {
  try {
    const data = await getCountriesJSON(`${API_URL}${country ? `/name/${country}` : 'all'}`);
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
    const res = await getCountriesJSON(`${API_URL}alpha?codes=${cca3}`);
    if (!res | (res.status === 404) | (res.status === 400)) throw new Error('Country not found', res.message);
    const [data] = res;

    let borders;
    if (data.borders) {
      const dataBorders = await getCountriesJSON(`${API_URL}alpha?codes=${data.borders}`);
      if (!dataBorders | (dataBorders.status === 404)) throw new Error('No Border countries', dataBorders.message);
      borders = dataBorders.map(country => {
        return {
          name: country.name.common,
          cca3: country.cca3,
        };
      });
    }

    state = {
      name: data.name.common,
      population: data.population,
      region: data.region,
      capital: data.capital?.[0],
      flag: data.flags.svg,
      nativeName: data.name.nativeName ? Object.values(data.name.nativeName)[0].official : data.name.official,
      subRegion: data.subregion,
      tld: data.tld ? data.tld[0] : '',
      currencies: data.currencies ? Object.keys(data.currencies) : '',
      languages: data.languages ? Object.values(data.languages) : '',
      borders: borders ? borders : '',
      cca3: data.cca3,
    };
  } catch (error) {
    throw error;
  }
};

// export const searchCountryNeightbours = async function () {
//   try {
//     const dataBorders = await getCountriesJSON(`${API_URL}alpha?codes=${state[0].borders}`);
//     if (!data | (data.status === 404)) throw new Error('No Border countries', data.message);
//     console.log(dataBorders);
//   } catch (error) {
//     throw error;
//   }
// };

export const filterCountries = function (region) {
  const fileteredCountries = state.filter(country => country.region.toLowerCase() === region);
  return fileteredCountries;
};
