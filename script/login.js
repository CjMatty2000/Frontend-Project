const form = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
  e.preventDefault();

  if (validateInputs()) {
    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (!storedUser) {
      alert('No registered user found. Please sign up first.');
      return;
    }

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (emailValue === storedUser.email && passwordValue === storedUser.password) {
      alert('Login successful!');
      window.location.href = "/class.html";
    } else {
      alert('Invalid email or password. Please try again.');
    }
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

const isValidEmail = email => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const isValidPassword = password => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

const validateInputs = () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
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

  if (passwordValue === '') {
    setError(password, 'Password is required');
    isValid = false;
  } else if (!isValidPassword(passwordValue)) {
    setError(password, 'Password must be at least 8 characters and include uppercase, lowercase, number & special character.');
    isValid = false;
  } else {
    setSuccess(password);
  }

  return isValid;
};

