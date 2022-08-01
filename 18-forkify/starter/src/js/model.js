import { API_URL, SEARCH_URL, API_KEY } from './config';
import { getJson } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    count: undefined,
    results: [],
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
