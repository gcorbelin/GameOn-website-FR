// Show/hide mobile nav
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
const firstInput = document.getElementById("first");
const lastInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const radiosLegend = document.getElementById("location-legend");
const checkbox1Input = document.getElementById("checkbox1");
const checkbox2Input = document.getElementById("checkbox2");

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

// Form validation
let isFormValid;

// submit form event
function validate(event) {
  event.preventDefault();
  isFormValid = true;

  // First Name check
  let isFirstNameValid = validateLength(firstInput.value);
  handleError(firstInput, isFirstNameValid);

  // Last Name check
  let isLastNameValid = validateLength(lastInput.value);
  handleError(lastInput, isLastNameValid);

  // Email check
  let isEmailValid =
    validateLength(emailInput.value) && validateEmail(emailInput.value);
  handleError(emailInput, isEmailValid);

  // Birthdate check
  let isBirthdateValid = validateDate(birthdateInput.value);
  handleError(birthdateInput, isBirthdateValid);

  // Quantity check
  let isQuantityValid = validateNumber(quantityInput.value);
  handleError(quantityInput, isQuantityValid);

  // Radios check
  let isRadioValid = validateRadio('input[name="location"]:checked');
  handleError(radiosLegend, isRadioValid);

  // CGU check
  let isCGUValid = validateCGU(checkbox1Input);
  handleError(checkbox1Input, isCGUValid);

  if (isFormValid) {
    form.classList.add("d-none");
    confirmation.classList.remove("d-none");
  }
}

// Show/Hide error message related to elem (DOM element) depending on isValid value (bool)
function handleError(elem, isValid) {
  let errorcontainer = document.getElementById(
    elem.getAttribute("aria-describedby")
  );
  if (isValid) {
    elem.classList.remove("has-error");
    errorcontainer.classList.add("d-none");
  } else {
    elem.classList.add("has-error");
    errorcontainer.classList.remove("d-none");
    isFormValid = false;
  }
}

// Check input value length
function validateLength(string) {
  if (string.length >= 2) {
    return true;
  }
  return false;
}

// Check email format
function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

// Check date format
function validateDate(date) {
  // First we check the format
  var regEx = /^\d{4}-\d{2}-\d{2}$/; // Date format yyyy-mm-dd as per HTML5 specs
  if (!date.match(regEx)) return false; // Invalid format
  // Then we check the value to revent errors like 0000-00-00, 2015-01-40
  var d = new Date(date);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === date; // Check if date value and is the same as input value
}

// Check if value is a number
function validateNumber(number) {
  let num = parseInt(number);
  if (!isNaN(number) && num >= 0) {
    return true;
  }
  return false;
}

// Check if a radio is checked
function validateRadio(radios) {
  if (document.querySelector(radios)) {
    return true;
  }
  return false;
}

// Check if a specific checkbox is checked
function validateCGU(checkbox) {
  if (checkbox.checked) {
    return true;
  }
  return false;
}
