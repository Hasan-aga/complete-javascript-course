'use strict';
import icons from 'url:../../img/icons.svg';

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #state;
  #errorMessage = `¯\\_(ツ)_/ <br>Oh oh! something went wrong, try again!`;
  #successMessage = '';

  renderSpinner() {
    const htmlMarkup = `
    <div class="spinner">
            <svg>
              <use href="${icons}.svg#icon-loader"></use>
            </svg>
          </div>
    `;
    this.#clearView();
    this.#parentElement.insertAdjacentHTML('afterBegin', htmlMarkup);
  }

  render(state) {
    this.#state = state;
    const recipeHtml = this.#generateMarkup();
    this.#clearView();
    this.#parentElement.insertAdjacentHTML('afterbegin', recipeHtml);
  }

  renderError(message = this.#errorMessage) {
    const htmlMarkup = `
    <div class="error">
        <div>
          <svg>
            <use href="${icons}.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this.#clearView();
    this.#parentElement.insertAdjacentHTML('afterbegin', htmlMarkup);
  }

  renderMessage(message = this.#successMessage) {
    const htmlMarkup = `
    <div class="message">
        <div>
          <svg>
            <use href="${icons}.svg#icon-smile></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this.#clearView();
    this.#parentElement.insertAdjacentHTML('afterbegin', htmlMarkup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  #clearView() {
    this.#parentElement.innerHTML = '';
  }

  #generateMarkup() {
    return `
  
    <figure class="recipe__fig">
      <img src="${this.#state.recipe.image_url}" alt="${
      this.#state.recipe.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this.#state.recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}.svg#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">45</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}.svg#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">4</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}.svg#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}.svg#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}.svg#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}.svg#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${this.#state.recipe.ingredients
          .map(ingredient => {
            return `<li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}.svg#icon-check"></use>
          </svg>
          <div class="recipe__description">
          ${ingredient}
          </div>
        </li>`;
          })
          .join('')}

       
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this.#state.recipe.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this.#state.recipe.source_url}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}.svg#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
`;
  }
}

export default new RecipeView();