// js/register.js
import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';

const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value.trim();
      const confirmPwd = document.getElementById("confirm-password").value.trim();

      // Password match validation
      if (password !== confirmPwd) {
       alert("❌ Passwords do not match.");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("user registered:", user);
        alert("✅ Signup succesful! Redirecting to login...");

        {
          window.location.href = 'index.html';
        }

      } catch (error) {
         if (error.code === "auth/email-already-in-use") {
    alert("⚠️ This email is already registered. Please login instead.");
    
         } else {
           console.error("Error during signup:", error);
          alert(error.message);
         }
      }
    });
  }