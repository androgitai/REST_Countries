import '../style/style.scss';
import * as model from './model';
import * as view from './view';

const controlCountriesRender = async function () {
  try {
    await model.getCountriesData();
    view.renderCountries(model.state);
  } catch (error) {
    console.error(error);
  }
};

const controlFilterCountries = function (region) {
  const filteredCountries = model.filterCountries(region);
  view.renderCountries(filteredCountries);
};

const controlSearchCountries = async function () {
  try {
    const query = view.getQuery();
    //'Empty' search gets all countries
    if (!query) {
      await model.getCountriesData();
      view.renderCountries(model.state);
      return;
    }
    await model.getCountriesData(query);
    view.renderCountries(model.state);
  } catch (error) {
    console.error(error);
    view.renderError();
  }
};

const controlCountryDetails = async function (cca3) {
  try {
    await model.searchCountries(cca3);
    view.renderCountryDetails(model.state);
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  controlCountriesRender();
  view.countriesFilterHandler(controlFilterCountries);
  view.searchCountriesHandler(controlSearchCountries);
  view.countryDetailsHandler(controlCountryDetails);
  view.goBackToMainPage(controlCountriesRender);
  view.countryNeighbourRenderHandler(controlCountryDetails);
};
init();
