'use strict';
import View from './view';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _data;
  _errorMessage = `¯\\_(ツ)_/ <br>can't find any bookmarks!`;
  _successMessage = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data.length > 0
      ? this._data
          .map(
            bookmark =>
              `
    <li class="preview">
        <a class="preview__link ${
          bookmark.id === id ? 'preview__link--active' : ''
        }" href="#${bookmark.id}">
            <figure class="preview__fig">
            <img src="${bookmark.image_url}" alt="${bookmark.tite}" />
            </figure>
            <div class="preview__data">
            <h4 class="preview__name">
                ${bookmark.title}
            </h4>
            <p class="preview__publisher">${bookmark.publisher}</p>
            </div>
        </a>
    </li> 
`
          )
          .join('')
      : `<div class="message">
            <div>
                <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
                </svg>
            </div>
            <p>
                No bookmarks yet. Find a nice recipe and bookmark it :)
            </p>
        </div>`;
  }
}

export const bookmarksView = new BookmarksView();
