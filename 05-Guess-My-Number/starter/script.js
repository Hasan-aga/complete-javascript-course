"use strict";

// console.log(document.querySelector(".result-hint").textContent);
// document.querySelector(".result-hint").textContent = "Start guessing...";

// document.querySelector(".display").textContent = 1;

// console.log(document.querySelector(".user-input").value);

const writeToUser = function (message) {
  document.querySelector(".result-hint").textContent = message;
};

const logScore = (score) =>
  (document.querySelector(".result-score").textContent = `Score: ${score}`);

const correctNumber = Math.trunc(Math.random() * 20) + 1;

console.log(correctNumber);

const check = document.querySelector(".button-check");
const userInput = document.querySelector(".user-input");
check.addEventListener("click", function () {
  const guess = Number(userInput.value);

  console.log(guess, Boolean(guess));
  if (!guess) {
    writeToUser("Pick a number!");
  } else if (guess === correctNumber) {
    writeToUser("Correct!!!");
  } else if (guess < correctNumber) {
    writeToUser("Too low");
  } else writeToUser("Too high");
});
