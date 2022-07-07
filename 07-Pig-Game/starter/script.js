'use strict';

// switch theme
const lightColor = '#9b5de5';

const checkbox = document.getElementById('checkbox');

function setProp(propName, propValue) {
  document.documentElement.style.setProperty(propName, propValue);
}

checkbox.addEventListener('change', e => {
  if (e.currentTarget.checked) {
    setProp('--color', lightColor);
  } else {
  }
});
