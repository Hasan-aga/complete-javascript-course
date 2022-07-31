import { API_URL, SEARCH_URL } from './config';
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
    const { recipe } = await getJson(`${API_URL}${id}`);
    state.recipe = recipe;
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJson(`${SEARCH_URL}${query}`);
    state.search.query = query;
    state.search.count = data.count;
    state.search.results = data.recipes;
    console.log(state.search);
  } catch (error) {
    console.error(`search failed: ${error}`);
    throw error;
  }
};
