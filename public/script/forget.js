// Import Firebase authentication
import { auth } from "./firebase-config.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const forgetForm = document.getElementById("forgetForm");

if (forgetForm) {
  forgetForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const emailInput = document.getElementById("forget-email");
    const email = emailInput.value.trim();
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    
    if (!email) {
      alert("❌ Please enter your email address");
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      alert("❌ Please enter a valid email address");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      // Configure password reset with correct URL
      const actionCodeSettings = {
        url: window.location.origin + '/reset.html',
        handleCodeInApp: true
      };

      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      
      localStorage.setItem("lastResetEmail", email);
      
      window.location.href = "changed2.html";
      
    } catch (error) {
      // Handle different types of errors
      console.error("Password reset error:", error);
      
      let userMessage = "Failed to send reset email. ";
      
      switch (error.code) {
        case 'auth/invalid-email':
          userMessage += "The email address is not valid.";
          break;
        case 'auth/user-not-found':
          userMessage += "No account found with this email address.";
          break;
        case 'auth/too-many-requests':
          userMessage += "Too many attempts. Please try again later.";
          break;
        case 'auth/network-request-failed':
          userMessage += "Network error. Please check your internet connection.";
          break;
        default:
          userMessage += error.message;
      }
      
      alert("❌ " + userMessage);
      
    } finally {
      // Re-enable the button whether successful or not
      submitButton.disabled = false;
      submitButton.textContent = "Continue";
    }
  });
}

// Optional: Add real-time email validation
const emailInput = document.getElementById("forget-email");
if (emailInput) {
  emailInput.addEventListener('input', function() {
    // Remove any existing error styling when user starts typing
    this.style.borderColor = '#e5e7eb';
  });
}

// Optional: Add Enter key support
if (emailInput) {
  emailInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      forgetForm.dispatchEvent(new Event('submit'));
    }
  });
}