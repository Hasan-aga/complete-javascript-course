'use strict';

// helper functions
function displayCurrentScoreOfPlayer(player, score) {
  document.querySelector(`.${player} .current-score`).textContent = score;
}

function displayTotalScoreOfPlayer(player, score) {
  document.querySelector(`.${player} .score`).textContent = score;
}

function switchActivePlayer() {
  const newActivePlayerID =
    currentActivePlayerID === 'player0' ? 'player1' : 'player0';

  // add active-player class to other player
  document
    .getElementById(currentActivePlayerID)
    .classList.remove('active-player');
  document.getElementById(newActivePlayerID).classList.add('active-player');

  currentActivePlayerID = newActivePlayerID;
}

function resetCurrentScore() {
  currentScore = 0;
  displayCurrentScoreOfPlayer(currentActivePlayerID, currentScore);
}

function resetGame() {
  displayCurrentScoreOfPlayer('player1', 0);
  displayCurrentScoreOfPlayer('player0', 0);
  score0Element.textContent = 0;
  score1Element.textContent = 0;
}

// reset
const score0Element = document.querySelector('.player0 .score');
const score1Element = document.querySelector('.player1 .score');
const diceElement = document.querySelector('.dice');
const newGameButton = document.querySelector('.new-game');
const rollButton = document.querySelector('.roll');
const holdButton = document.querySelector('.hold');
const player0Element = document.getElementById('player0');
const player1Element = document.getElementById('player1');
let totalScores = {
  player0: 0,
  player1: 0,
};
let currentScore = 0;
let currentActivePlayerID = document.querySelector('.active-player').id;
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

  // if roll = 1, switch player else add to score
  if (roll !== 1) {
    // add roll to total score
    currentScore += roll;
    displayCurrentScoreOfPlayer(currentActivePlayerID, currentScore);
  } else {
    // reset current score
    resetCurrentScore();
    // switch player
    switchActivePlayer();
  }
});

// hold
holdButton.addEventListener('click', function () {
  // add current score to total
  totalScores[currentActivePlayerID] += currentScore;
  displayTotalScoreOfPlayer(
    currentActivePlayerID,
    totalScores[currentActivePlayerID]
  );

  //   reset current score
  resetCurrentScore();

  //   if total score > 100 player wins
  if (totalScores[currentActivePlayerID] >= 100) {
    console.log('win');
  } else {
    // switch player
    switchActivePlayer();
  }
});

// reset game
newGameButton.addEventListener('click', function () {
  resetGame();
});

// ///////////////////////////////////////////////////////
// switch theme
// ///////////////////////////////////////////////////////
const lightColor = '#9b5de5';
const darkColor = '#003566';

const lightActivePlayerColor = '#ff99c8';
const darkActivePlayerColor = '#ffc300';

const lightStandbyPlayerColor = '#ffd6e9';
const darkStandbyPlayerColor = '#fff3cc';

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
