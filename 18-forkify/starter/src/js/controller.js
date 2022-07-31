import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    console.error(`failed to get recipee: (${error})`);
  }
};

controlRecipes();
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
