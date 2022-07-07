'use strict';

// switch theme
const lightColor = '#9b5de5';
const darkColor = '#003566';

const lightActivePlayerColor = '#ff99c8';
const darkActivePlayerColor = '#ffc300';

const darkBg =
  'linear-gradient(to right, #001d3d, #113865, #245591, #3674bf, #4895ef)';
const lightBg =
  'linear-gradient(to right, #d0f4de, #b0f0ee, #a4e6ff, #bbd6ff, #e4c1f9)';

const checkbox = document.getElementById('checkbox');

function setProp(propName, propValue) {
  document.documentElement.style.setProperty(propName, propValue);
}

checkbox.addEventListener('change', e => {
  if (e.currentTarget.checked) {
    setProp('--color', lightColor);
    setProp('--bg', lightBg);
  } else {
    setProp('--color', darkColor);
    setProp('--bg', darkBg);
  }
});
