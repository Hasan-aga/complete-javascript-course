export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`faaail ${data.message}, ${res.status}`);

    const { recipe } = data;
    state.recipe = recipe;
    console.log(state.recipe);
  } catch (error) {
    console.error('error loading recipe', error);
  }
};
