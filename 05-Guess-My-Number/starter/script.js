"use strict";

// console.log(document.querySelector(".result-hint").textContent);
// document.querySelector(".result-hint").textContent = "Start guessing...";

// document.querySelector(".display").textContent = 1;

// console.log(document.querySelector(".user-input").value);

const writeToUser = function (message) {
  document.querySelector(".result-hint").textContent = message;
};
let score = 20;

const logScore = (playerCondition) =>
  (document.querySelector(".result-score").textContent =
    playerCondition !== "lost" ? `Score: ${score--}` : `Score: 0`);

logScore();

const correctNumber = Math.trunc(Math.random() * 20) + 1;

const check = document.querySelector(".button-check");
const userInput = document.querySelector(".user-input");
check.addEventListener("click", function () {
  const guess = Number(userInput.value);
  if (score > 0) {
    if (!guess) {
      writeToUser("Pick a number!");
    } else if (guess === correctNumber) {
      writeToUser("Correct!!!");
    } else if (guess < correctNumber) {
      writeToUser("Too low");
    } else writeToUser("Too high");

    logScore();
  } else {
    writeToUser("You LOST!");
    logScore("lost");
  }
});
