function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const body = document.body;
const modalbg = document.querySelector(".bground");
const modalContent = document.querySelector(".bground .content");
const modalBtn = document.querySelectorAll(".js-modal-btn");
const formData = document.querySelectorAll(".form-data");
const modalBtnClose = document.querySelectorAll(".js-close");
const form = document.getElementById("reserve");
const confirmation = document.getElementById("confirmation-message");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  body.classList.add("modal-opened");
  modalbg.style.display = "block";
  modalbg.classList.replace("hide", "show");
}

// close modal event
modalBtnClose.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalContent.classList.add("closing");
  window.setTimeout(function () {
    modalbg.classList.replace("show", "hide");
  }, 400);
  window.setTimeout(function () {
    modalbg.style.display = "none";
    modalContent.classList.remove("closing");
    form.classList.remove("d-none");
    confirmation.classList.add("d-none");
    body.classList.remove("modal-opened");
  }, 800);
}
