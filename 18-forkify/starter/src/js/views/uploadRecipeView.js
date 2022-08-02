'use strict';
import icons from 'url:../../img/icons.svg';
import View from './view';
import fracty from 'fracty';

class UploadRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _addRecipeButton = document.querySelector('.nav__btn--add-recipe');
  _closeRecipeButton = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  _addRecipeWindow = document.querySelector('.add-recipe-window');
  _data;
  _errorMessage = `¯\\_(ツ)_/ <br>Oh oh! something went wrong, try again!`;
  _successMessage = '';

  switchFormAndOverlay() {
    this._overlay.classList.toggle('hidden');
    this._addRecipeWindow.classList.toggle('hidden');
  }

  addShowRecipeFormHandler() {
    [this._addRecipeButton, this._closeRecipeButton, this._overlay].forEach(
      ev => ev.addEventListener('click', this.switchFormAndOverlay.bind(this))
    );
  }

  addUploadRecipeHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new UploadRecipeView();
