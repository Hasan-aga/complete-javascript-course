import { API_URL } from './config';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(`${API_URL}${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(`faaail ${data.message}, ${res.status}`);

    const { recipe } = data;
    state.recipe = recipe;
    console.log(state.recipe);
  } catch (error) {
    console.error('error loading recipe', error);
  }
};
