// js/index.js
  import { auth } from './firebase-config.js';
  import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';

    const loginForm = document.getElementById("loginForm")
    const loginEmail = document.getElementById("login-email");
    const loginPassword = document.getElementById("login-password");
    const authMessage = document.getElementById("auth-message");

  if (loginForm) { 
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();
      const authMessage = document.getElementById("auth-message");

      console.log("Attempting login with:", email, password);
      
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        authMessage.textContent = "✅ Login successful Redirecting!";
        authMessage.style.color = "#28a745"; 

      } catch (error) {
        authMessage.textContent = "❌" + error.message;
        authMessage.style.color = "red";
      }
    });
  }