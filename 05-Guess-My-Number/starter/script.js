"use strict";

const writeToUser = function (message) {
  document.querySelector(".result-hint").textContent = message;
};
let score = 20;

const logScore = (playerCondition) =>
  (document.querySelector(".result-score").textContent =
    playerCondition !== "lost" ? `Score: ${score--}` : `Score: 0`);

logScore();

const correctNumber = Math.trunc(Math.random() * 20) + 1;

console.log(correctNumber);

const check = document.querySelector(".button-check");
const userInput = document.querySelector(".user-input");
check.addEventListener("click", function () {
  const guess = Number(userInput.value);
  if (score > 0) {
    if (!guess) {
      writeToUser("Pick a number!");
    } else if (guess === correctNumber) {
      writeToUser("Correct!!!");
      document.querySelector("body").style.backgroundColor = "#80B918";
      document.querySelector(".display").style.width = "20rem";
    } else if (guess < correctNumber) {
      writeToUser("Too low");
    } else writeToUser("Too high");

    logScore();
  } else {
    writeToUser("You LOST!");
    logScore("lost");
    document.querySelector("body").style.backgroundColor = "#E76F51";
  }
});
