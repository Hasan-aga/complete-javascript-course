'use strict';

class SearchValue {
  #parentElement = document.querySelector('.search');

  get query() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.clearView();
    return query;
  }

  clearView() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  addSearchHandler(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchValue();
