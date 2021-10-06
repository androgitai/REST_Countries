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
    if (!query) return;
    await model.searchCountries(query);
    view.renderCountries(model.state);
  } catch (error) {
    console.error(error);
    view.renderError();
  }
};

const init = function () {
  controlCountriesRender();
  view.countriesFilterHandler(controlFilterCountries);
  view.searchCountriesHandler(controlSearchCountries);
};
init();
