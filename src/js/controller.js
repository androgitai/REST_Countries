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
    await model.searchCountries(query);
    console.log(model.state);
    view.renderCountries(model.state);
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  controlCountriesRender();
  view.countriesFilterHandler(controlFilterCountries);
  view.searchCountriesHandler(controlSearchCountries);
};
init();
