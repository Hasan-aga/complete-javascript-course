"use strict";

const showButtons = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close-modal");

const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

showButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});
function hideModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

closeButton.addEventListener("click", hideModal);
overlay.addEventListener("click", hideModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideModal();
  }
});
