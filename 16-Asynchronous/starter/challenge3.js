'use strict';
const container = document.querySelector('.images');

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
      img.classList.add('parallel');
      container.insertAdjacentElement('afterbegin', img);
      resolve(img);
    });
    img.addEventListener('error', function (event) {
      reject(new Error(`failed to load image. (${event.type})`));
    });
  });
}

const loadNpause = async function () {
  try {
    const img1 = await createImage('img/img-1.jpg');
    await wait(1);
    img1.style.display = 'none';
    const img2 = await createImage('img/img-2.jpg');
    await wait(1);
    img2.style.display = 'none';
    const img3 = await createImage('img/img-3.jpg');
    await wait(1);
    img3.style.display = 'none';
  } catch (err) {
    console.error(`failed! ${err}`);
  }
};

const loadAll = async function (imagePathArray) {
  try {
    const imgs = imagePathArray.map(async path => await createImage(path));
    const actualImgs = await Promise.all(imgs);
    console.log(imgs);
    console.log(actualImgs);
  } catch (err) {
    console.error(`failed because ${err}`);
  }
};

// loadNpause();

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
