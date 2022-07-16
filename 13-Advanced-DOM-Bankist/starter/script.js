'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// ////////////////////////////////////////////
// smooth scrolling
const scrollButton = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

scrollButton.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.nav__link').forEach(element =>
  element.addEventListener('click', event => {
    event.preventDefault();
    const scrollDestination = document.querySelector(
      element.getAttribute('href')
    );
    console.log(scrollDestination);
    scrollDestination.scrollIntoView({ behavior: 'smooth' });
  })
);

// ///////////////////////////////////////////
// ///////////////////////////////////////////
// ///////////////////////////////////////////
// ///////////////////////////////////////////
////event propagation demo
// function getRandomInt(min = 0, max = 255) {
//   return Math.floor(Math.random() * (max - min + 1) - min);
// }

// function getRandomColor() {
//   return `rgb(${getRandomInt()},${getRandomInt()},${getRandomInt()})`;
// }
// // event bubbling

// scrollButton.onclick = function (event) {
//   this.style.backgroundColor = getRandomColor();
// };

// document.querySelector('.header__title').onclick = function (event) {
//   if (event.target === scrollButton)
//     this.style.backgroundColor = getRandomColor();
// };
