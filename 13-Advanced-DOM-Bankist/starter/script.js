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
  const clickedElement = event.target.closest('.btn');
  if (clickedElement) {
    //not null
    // get child div that match button data
    const contentOrder = clickedElement.getAttribute('data-tab');
    // add operations__content--active to perations__content operations__content-- that matches contentOrder
    // get content that matches order
    const contentElements = [...this.parentElement.children];
    contentElements.forEach(function (element) {
      element.classList.remove('operations__content--active');
      if (element.classList.contains(`operations__content--${contentOrder}`)) {
        element.classList.add('operations__content--active');
      }
    });

    // remove operations__tab--active from inactive button and add it to active
    // get all children of tab container
    const buttons = [...this.children];
    buttons.forEach(button => {
      button.classList.remove('operations__tab--active');
      clickedElement.classList.add('operations__tab--active');
    });
  }
});

// ///////////////////////////////////////////
//reveal sections with animation as they scroll into view
// hide all sections at first
const sections = document.querySelectorAll('.section');
// sections.forEach(section => section.classList.add('section--hidden'));

// reveal sections as they get in view
function sectionsObserverCallback(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionsObserverOptions = {
  root: null,
  threshold: 0.15,
};

const sectionsObserver = new IntersectionObserver(
  sectionsObserverCallback,
  sectionsObserverOptions
);

sections.forEach(section => sectionsObserver.observe(section));
// ///////////////////////////////////////////
// lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');

function lazyImageObserverCallback(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // remove blur after image loading
  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );
  observer.unobserve(entry.target);
}
const lazyImagesObserver = new IntersectionObserver(lazyImageObserverCallback, {
  root: null,
  threshold: 0,
  rootMargin: '-100px',
});

lazyImages.forEach(img => lazyImagesObserver.observe(img));
// ///////////////////////////////////////////
// slider
const sliderBtnRight = document.querySelector('.slider__btn--right');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
let currentSlide = 0;

moveSlides(slides, 0);

sliderBtnRight.addEventListener('click', function () {
  currentSlide = currentSlide >= slides.length - 1 ? 0 : ++currentSlide;
  moveSlides(slides, currentSlide);
});
sliderBtnLeft.addEventListener('click', function () {
  currentSlide = currentSlide === 0 ? slides.length - 1 : --currentSlide;
  moveSlides(slides, currentSlide);
});

function moveSlides(slides, order) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - order)}%)`;
  });
}
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
