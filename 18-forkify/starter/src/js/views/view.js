'use strict';
import icons from 'url:../../img/icons.svg';

export default class View {
  _parentElement = document.querySelector('.recipe');
  _data;

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

  /**
   *
   * @param {Object | Object[]} state the data to be rendered (e.g. recipe)
   * @description renders input as html element that is child of the class's _parentElement prop
   */
  render(state) {
    this._data = state;
    const recipeHtml = this._generateMarkup();
    this._clearView();
    this._parentElement.insertAdjacentHTML('afterbegin', recipeHtml);
  }

  update(state) {
    //update data with new one
    this._data = state;
    //get new markup
    const recipeHtml = this._generateMarkup();
    const newElements = Array.from(
      document
        .createRange()
        .createContextualFragment(recipeHtml)
        .querySelectorAll('*')
    );
    //get current rendered markup
    const renderedELements = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    //compare the two
    renderedELements.forEach((renderedElement, index) => {
      //change rendered markup where change has occured
      //only change nodes where first child is text
      if (
        !renderedElement.isEqualNode(newElements[index]) &&
        newElements[index].firstChild?.nodeValue.trim() !== ''
      )
        renderedElement.textContent = newElements[index].textContent;

      // Updates changed ATTRIBUES
      if (!renderedElement.isEqualNode(newElements[index]))
        Array.from(newElements[index].attributes).forEach(attr =>
          renderedElement.setAttribute(attr.name, attr.value)
        );
    });
  }
}
