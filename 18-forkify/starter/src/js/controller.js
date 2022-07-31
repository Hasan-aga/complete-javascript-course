import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchValue from './views/searchValue.js';
import resultsView from './views/resultsView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(-5);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state);
  } catch (error) {
    console.error(`failed to get recipe: (${error})`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchValue.query;
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.state);
  } catch (error) {
    console.error(`could not get results. ${error}`);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchValue.addSearchHandler(controlSearchResults);
};

init();

controlSearchResults();
