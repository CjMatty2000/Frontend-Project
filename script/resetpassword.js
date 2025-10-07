const resetForm = document.getElementById('resetForm');
const newPassword = document.getElementById('newPassword'); 
const confirmPassword = document.getElementById('confirmPassword'); 

resetForm.addEventListener('submit', e => {
  e.preventDefault();

  if (validateInputs()) {
    //Redirect if valid
    window.location.href = "https://www.dsm-firmenich.com/en/businesses/taste-texture-health.html";
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  let errorDisplay = inputControl.querySelector('.error');

  if (!errorDisplay) {
    errorDisplay = document.createElement('small');
    errorDisplay.classList.add('error');
    inputControl.appendChild(errorDisplay);
  }

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = element => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  if (errorDisplay) errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const isValidPassword = password => {
  // At least 8 chars, one lowercase, one uppercase, one number, one special char
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

const validateInputs = () => {
  const newPasswordValue = newPassword.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  let isValid = true;

  // Check new password
  if (newPasswordValue === '') {
    setError(newPassword, 'Password is required');
    isValid = false;
  } else if (!isValidPassword(newPasswordValue)) {
    setError(newPassword, 'Password must be at least 8 characters and include uppercase, lowercase, number & special character.');
    isValid = false;
  } else {
    setSuccess(newPassword);
  }

  // Check confirm password
  if (confirmPasswordValue === '') {
    setError(confirmPassword, 'Please confirm your password');
    isValid = false;
  } else if (confirmPasswordValue !== newPasswordValue) {
    setError(confirmPassword, 'Passwords do not match');
    isValid = false;
  } else {
    setSuccess(confirmPassword);
  }

  return isValid;
};
