'use strict';

// reset

const score0Element = document.querySelector('.player0 .score');
const score1Element = document.querySelector('.player1 .score');
const diceElement = document.querySelector('.dice');
const newGameButton = document.querySelector('.new-game');
const rollButton = document.querySelector('.roll');
const holdButton = document.querySelector('.hold');

score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

// roll dice
rollButton.addEventListener('click', function () {
  // create a random roll
  const roll = Math.trunc(Math.random() * 6) + 1;

  // display roll
  diceElement.classList.remove('hidden');
  diceElement.src = `dice-${roll}.png`;

  // if roll = 1, switch player
  if (roll === 1) {
    // TODO: switch user
  }
});

// switch theme
const lightColor = '#9b5de5';
const darkColor = '#003566';

const lightActivePlayerColor = '#ff99c8';
const darkActivePlayerColor = '#ffc300';

const lightStandbyPlayerColor = '#e4c1f9';
const darkStandbyPlayerColor = '#ffd60a';

const lightGlow = 'rgba(252, 246, 189, 0.747)';
const darkGlow = 'rgba(255, 242, 0, 0.81)';

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
    setProp('--active-player-color', lightActivePlayerColor);
    setProp('--standby-player-color', lightStandbyPlayerColor);
    setProp('--glow', lightGlow);
  } else {
    setProp('--color', darkColor);
    setProp('--bg', darkBg);
    setProp('--active-player-color', darkActivePlayerColor);
    setProp('--standby-player-color', darkStandbyPlayerColor);
    setProp('--glow', darkGlow);
  }
});
