"use strict";

// console.log(document.querySelector(".result-hint").textContent);
// document.querySelector(".result-hint").textContent = "Start guessing...";

// document.querySelector(".display").textContent = 1;
// document.querySelector(".result-score").textContent = `Score: 1`;

// console.log(document.querySelector(".user-input").value);

const check = document.querySelector(".button-check");
const userInput = document.querySelector(".user-input");
check.addEventListener("click", function () {
  console.log(userInput.value);
});
