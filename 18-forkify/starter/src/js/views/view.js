'use strict';
import icons from 'url:../../img/icons.svg';

export default class View {
  renderSpinner() {
    const htmlMarkup = `
        <div class="spinner">
                <svg>
                  <use href="${icons}.svg#icon-loader"></use>
                </svg>
              </div>
        `;
    this._clearView();
    this._parentElement.insertAdjacentHTML('afterBegin', htmlMarkup);
  }

  renderError(message = this._errorMessage) {
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

    this._clearView();
    this._parentElement.insertAdjacentHTML('afterbegin', htmlMarkup);
  }

  renderMessage(message = this._successMessage) {
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

    this._clearView();
    this._parentElement.insertAdjacentHTML('afterbegin', htmlMarkup);
  }

  _clearView() {
    this._parentElement.innerHTML = '';
  }

  render(state) {
    this._state = state;
    const recipeHtml = this._generateMarkup();
    this._clearView();
    this._parentElement.insertAdjacentHTML('afterbegin', recipeHtml);
  }
}
