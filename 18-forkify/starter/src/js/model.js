import { API_URL, SEARCH_URL, API_KEY, RESULTS_PER_PAGE } from './config';
import { getJson } from './helper';

export const state = {
  recipe: {},
  bookmarks: [],
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
    let recipe;
    //if recipe to be loaded exists in bookmarks -> load it from bookmarks instead of api call
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      recipe = state.bookmarks.find(
        bookmarkedRecipe => bookmarkedRecipe.id === id
      );
    } else {
      const data = await getJson(`${API_URL}${id}`);
      recipe = data.data.recipe;
    }
    const alreadyBookmarked = this.state.bookmarks.find(
      bookmark => bookmark.id === recipe.id
    );
    state.recipe = alreadyBookmarked ? alreadyBookmarked : recipe;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJson(`${SEARCH_URL}${query}`);
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

export const switchBookmark = function () {
  this.state.recipe.bookmark = this.state.recipe.bookmark ? false : true;
  const indexOfBookmark = this.state.bookmarks.indexOf(this.state.recipe);
  this.state.recipe.bookmark
    ? this.state.bookmarks.push(this.state.recipe)
    : this.state.bookmarks.splice(indexOfBookmark, 1);
  saveBookmarksToLocal();
  this.state.search.results.forEach(storedRecipe => {
    if (storedRecipe.id === this.state.recipe.id)
      storedRecipe.bookmark = storedRecipe.bookmark ? false : true;
  });
};

const saveBookmarksToLocal = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const getBookmarksFromLocal = function () {
  state.bookmarks = [...JSON.parse(localStorage.getItem('bookmarks'))];
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(
        ingPair => ingPair[0].startsWith('ingredient') && ingPair[1] !== ''
      )
      .map(ing => {
        const ingredients = ing[1].replaceAll(' ', '').split(',');
        if (ingredients.length < 3)
          throw new Error(
            'Wrong ingriedients format, please use correct format: &ltquantity, unit, description&gt'
          );
        const [quantity, unit, description] = ingredients;
        return {
          quantity: quantity ? Number(quantity) : null,
          unit,
          description,
        };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);
  } catch (error) {
    throw error;
  }
};
