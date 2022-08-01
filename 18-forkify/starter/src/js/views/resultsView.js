'use strict';
import View from './view';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _data;
  _errorMessage = `¯\\_(ツ)_/ <br>could not find results for that item`;

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data
      .map(result => {
        return `
    <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ' '
            }" href="#${result.id}">
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
