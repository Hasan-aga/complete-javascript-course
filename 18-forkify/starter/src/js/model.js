import { API_URL, SEARCH_URL, API_KEY, RESULTS_PER_PAGE } from './config';
import { getJson } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    count: undefined,
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    currentPage: 1,
    getTotalNumberOfPages() {
      return Math.ceil(this.count / this.resultsPerPage);
    },
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}${id}`);
    state.recipe = data.data.recipe;
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJson(`${SEARCH_URL}${query}&key=${API_KEY}`);
    state.search.currentPage = 1;
    state.search.query = query;
    state.search.count = data.results;
    if (Array.isArray(data.data.recipes) && data.data.recipes.length === 0)
      throw new Error(`No results for ${query}`);
    state.search.results = data.data.recipes;
  } catch (error) {
    console.error(`search failed: ${error}`);
    throw error;
  }
};

export const getResultsOfPage = function (
  page = this.state.search.currentPage
) {
  this.state.search.currentPage = page;
  const startIndex = (page - 1) * this.state.search.resultsPerPage;
  const endIndex = page * this.state.search.resultsPerPage;
  return this.state.search.results.slice(startIndex, endIndex);
};

export const updateServings = function (changeAmount) {
  const newServing =
    state.recipe.servings + changeAmount <= 0
      ? 1
      : state.recipe.servings + changeAmount;
  state.recipe.ingredients.forEach(
    ingredient => (ingredient.quantity *= newServing / state.recipe.servings)
  );
  state.recipe.servings = newServing;
};
