'use strict';
import icons from 'url:../../img/icons.svg';

class ResultsView {
  #parentElement = document.querySelector('.results');
  #state;
  #errorMessage = `¯\\_(ツ)_/ <br>Oh oh! something went wrong, try again!`;

  #clearView() {
    this.#parentElement.innerHTML = '';
  }

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
    this.#clearView();
    this.#state = state;
    const recipeHtml = this.#state.search.results
      .map(result => {
        return this.#generateMarkup(result);
      })
      .join('');
    this.#parentElement.insertAdjacentHTML('afterbegin', recipeHtml);
  }

  #generateMarkup(result) {
    return `
    <li class="preview">
            <a class="preview__link " href="#${result.recipe_id}">
              <figure class="preview__fig">
                <img src="${result.image_url}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `;
  }
}

export default new ResultsView();
