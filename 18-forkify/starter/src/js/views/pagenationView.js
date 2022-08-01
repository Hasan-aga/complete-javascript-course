'use strict';
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _data;

  _generateMarkup() {
    //  at page 1 with more pages
    if (this._data.currentPage === 1 && this._data.getTotalNumberOfPages() > 1)
      return `at page 1 with ${this._data.getTotalNumberOfPages()} more pages`;
    // at page1 with no more pages
    if (
      this._data.currentPage === 1 &&
      this._data.getTotalNumberOfPages() === 1
    )
      return 'at page 1 with NO more pages';
    // at last page
    if (this._data.currentPage === this._data.getTotalNumberOfPages())
      return 'at last page';
    // at middle page
    return 'at middle page';
  }
}

export const paginationView = new PaginationView();
