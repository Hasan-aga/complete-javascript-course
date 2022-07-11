'use strict';

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  header.addEventListener('click', () => (header.style.color = 'blue'));
})();
