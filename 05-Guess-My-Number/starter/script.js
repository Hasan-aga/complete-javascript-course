"use strict";

const writeToUser = function (message) {
  document.querySelector(".result-hint").textContent = message;
};
let score = 20;
let scores = [0];

const logScore = (playerCondition) =>
  (document.querySelector(".result-score").textContent =
    playerCondition !== "lost" ? `Score: ${score--}` : `Score: 0`);

function logHighestScore() {
  document.querySelector(
    ".result-highscore"
  ).textContent = `Highscore: ${Math.max(...scores)}`;
}

logScore();
logHighestScore();

let correctNumber = Math.trunc(Math.random() * 20) + 1;

console.log(correctNumber);

const check = document.querySelector(".button-check");
const userInput = document.querySelector(".user-input");
check.addEventListener("click", function () {
  const guess = Number(userInput.value);
  if (score > 0) {
    if (!guess) {
      writeToUser("Pick a number!");
    } else if (guess === correctNumber) {
      // implementing highscores
      scores.push(score);
      logHighestScore();
      // change page style
      writeToUser("Correct!!!");
      document.querySelector("body").style.backgroundColor = "#80B918";
      document.querySelector(".display").style.width = "20rem";
      document.querySelector(".display").textContent = correctNumber;
      //   start celebration animation
      document.querySelector(".celebrate-animation").classList.add("celebrate");
    } else if (guess < correctNumber) {
      writeToUser("Too low");
      logScore();
    } else {
      writeToUser("Too high");
      logScore();
    }
  } else {
    writeToUser("You LOST!");
    logScore("lost");
    document.querySelector("body").style.backgroundColor = "#E76F51";
  }
});

const playAgain = document.querySelector(".button-again");
playAgain.addEventListener("click", function () {
  correctNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  logScore();
  writeToUser("Start guessing");
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".display").style.width = "auto";
  document.querySelector(".display").textContent = "?";
  document.querySelector(".user-input").value = "";
});
