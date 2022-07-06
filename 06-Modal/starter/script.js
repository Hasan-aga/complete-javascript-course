'use strict';

const showButtons = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-modal');

showButtons.forEach(button => {
  button.addEventListener('click', () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
});

closeButton.addEventListener('click', () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});
