'use strict';
import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _data;

  _generateMarkup() {
    //  at page 1 with more pages
    if (this._data.currentPage === 1 && this._data.getTotalNumberOfPages() > 1)
      return ` 
      <button data-goto="${
        this._data.currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${this._data.currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}.svg#icon-arrow-right"></use>
      </svg>
      </button>`;
    // at page1 with no more pages
    if (
      this._data.currentPage === 1 &&
      this._data.getTotalNumberOfPages() === 1
    )
      return '';
    // at last page
    if (this._data.currentPage === this._data.getTotalNumberOfPages())
      return `
      <button data-goto="${
        this._data.getTotalNumberOfPages() - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}.svg#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.getTotalNumberOfPages() - 1}</span>
      </button>`;
    // at middle page
    return `
    <button data-goto="${
      this._data.currentPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}.svg#icon-arrow-left"></use>
    </svg>
    <span>Page ${this._data.currentPage - 1}</span>
    </button>
    <button data-goto="${
      this._data.currentPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${this._data.currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}.svg#icon-arrow-right"></use>
      </svg>
      </button>`;
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const destinationPage = Number(e.target.closest('button').dataset.goto);
      handler(destinationPage);
    });
  }
}

export const paginationView = new PaginationView();
