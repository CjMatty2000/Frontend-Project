const button = document.getElementById('button-container');
const submitButton = document.getElementById('submitbutton');


submitButton.addEventListener('click', e => {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5501/pages/auth/login.html";
});