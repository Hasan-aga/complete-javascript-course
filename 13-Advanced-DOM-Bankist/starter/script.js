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

const linksParent = document.querySelector('.nav__links');
linksParent.addEventListener('click', function (event) {
  event.preventDefault();
  if (
    event.target.classList.contains('nav__link') &&
    !event.target.classList.contains('nav__link--btn')
  ) {
    const destinationID = event.target.getAttribute('href');
    const destinationElement = document.querySelector(destinationID);
    destinationElement.scrollIntoView({ behavior: 'smooth' });
  }
});
// ///////////////////////////////////////////
// tabbed navigation

// select parent
const tabContainer = document.querySelector('.operations__tab-container');
// add event listener to parent for a button click
tabContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn')) {
    // get child div that match button data
    const contentOrder = event.target.getAttribute('data-tab');
    // add operations__content--active to perations__content operations__content-- that matches contentOrder
    // get content that matches order
    const children = [...this.parentElement.children];
    console.log('btn clc', contentOrder, children);
    children.forEach(function (element) {
      element.classList.remove('operations__content--active');
      if (element.classList.contains(`operations__content--${contentOrder}`)) {
        element.classList.add('operations__content--active');
      }
    });
  }
});

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
