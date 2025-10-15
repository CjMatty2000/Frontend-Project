const form = document.getElementById('formPassword');
const email = document.getElementById('email');

form.addEventListener('submit', e => {
  e.preventDefault();
  if (validateInputs()) {
    window.location.href = "http://127.0.0.1:5501/pages/registration.html";
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = element => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const isValidEmail = emailValue => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(emailValue).toLowerCase());
};

const validateInputs = () => {
  const emailValue = email.value.trim();
  let isValid = true;

  if (emailValue === '') {
    setError(email, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'Provide a valid email address');
    isValid = false;
  } else {
    setSuccess(email);
  }

  return isValid;
};
