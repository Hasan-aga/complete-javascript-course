import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchValue from './views/searchValue.js';
import resultsView from './views/resultsView.js';
import { paginationView } from './views/pagenationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(`failed to get recipe: (${error})`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchValue.query;
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    resultsView.render(model.getResultsOfPage(5));
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(`could not get results. ${error}`);
    resultsView.renderError(error.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchValue.addSearchHandler(controlSearchResults);
};

init();

controlSearchResults();
