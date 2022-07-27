'use strict';
const container = document.querySelector('.images');
let currentImageElement;

function wait(seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
}

function createImage(imagePath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imagePath;
    img.addEventListener('load', function () {
      img.classList.add('images');
      container.insertAdjacentElement('afterbegin', img);
      resolve(img);
    });
    img.addEventListener('error', function (event) {
      reject(new Error(`failed to load image. (${event.type})`));
    });
  });
}

createImage('img/img-1.jpg')
  .then(img => {
    currentImageElement = img;
    return wait(2);
  })
  .then(() => {
    currentImageElement.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImageElement = img;
    return wait(2);
  })
  .then(() => {
    currentImageElement.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImageElement = img;
    return wait(2);
  })
  .then(() => (currentImageElement.style.display = 'none'))
  .catch(error => console.error(error));
