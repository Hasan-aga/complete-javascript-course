import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function controlRecipes() {
  try {
    const id = window.location.hash.slice(-5);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state);
  } catch (error) {
    console.error(`failed to get recipe: (${error})`);
    recipeView.renderError(`something went wrong ¯\_(ツ)_/¯

    ${error}`);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
