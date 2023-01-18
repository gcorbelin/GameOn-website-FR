// DOM Elements
const firstInput = document.getElementById("first");
const lastInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const checkbox1Input = document.getElementById("checkbox1");
const checkbox2Input = document.getElementById("checkbox2");

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

  console.log(isFormValid);
}

/*
 * Show/Hide error message related to elem (DOM element) depending on isValid value (bool)
 */
function handleError(elem, isValid) {
  let errorcontainer = document.getElementById(
    elem.getAttribute("aria-describedby")
  );
  if (isValid) {
    errorcontainer.classList.add("d-none");
  } else {
    errorcontainer.classList.remove("d-none");
    isFormValid = false;
  }
}

function validateLength(string) {
  if (string.length > 2) {
    return true;
  }
  return false;
}

function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

function validateDate(date) {
  console.log(date);
  // First we check the format
  var regEx = /^\d{4}-\d{2}-\d{2}$/; // Date format yyyy-mm-dd as per HTML5 specs
  if (!date.match(regEx)) return false; // Invalid format
  // Then we check the value to revent errors like 0000-00-00, 2015-01-40
  var d = new Date(date);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === date; // Check if date value and is the same as input value
}

function validateNumber(number) {
  let num = parseInt(number);
  if (!isNaN(number) && num >= 0) {
    return true;
  }
  return false;
}

// Check radio selected :
// If document.querySelector('input[name="location"]:checked'); returns !null then return true, else return false

// Check checkbox selected
// If document.getElementById('checkbox1').checked returns !null then return true, else return false
