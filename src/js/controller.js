import '../style/style.scss';
import * as model from './model';
import * as view from './view';

const controlFilterCountries = function (region) {
  const filteredCountries = model.filterCountries(region);
  view.renderCountries(filteredCountries);
};

const controlCountries = async function () {
  try {
    const query = view.getQuery();
    //'Empty' search gets all countries
    view.renderSpinner();
    if (!query) {
      await model.getCountriesData();
      view.renderCountries(model.state);
      return;
    }
    await model.getCountriesData(query);
    view.renderCountries(model.state);
  } catch (error) {
    console.error(error);
    view.renderError(error.message);
    view.clearSectionCountries();
  }
};

const controlCountryDetails = async function (cca3) {
  try {
    view.clearCountriesEl();
    view.renderSpinner();
    await model.searchCountries(cca3);
    view.renderCountryDetails(model.state);
  } catch (error) {
    console.error(error);
    view.clearSectionCountries();
    view.renderError(error.message);
  }
};

const init = function () {
  controlCountries();
  view.countriesFilterHandler(controlFilterCountries);
  view.searchCountriesHandler(controlCountries);
  view.countryDetailsHandler(controlCountryDetails);
  view.goBackToMainPage(controlCountries);
  view.countryNeighbourRenderHandler(controlCountryDetails);
};
init();
