'use strict';
import View from './view';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _state;
  _errorMessage = `¯\\_(ツ)_/ <br>Oh oh! something went wrong, try again!`;

  _generateMarkup() {
    return this._state.search.results
      .map(result => {
        return `
    <li class="preview">
            <a class="preview__link " href="#${result.recipe_id}">
              <figure class="preview__fig">
                <img src="${result.image_url}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                
              </div>
            </a>
          </li>
    `;
      })
      .join('');
  }
}

export default new ResultsView();
