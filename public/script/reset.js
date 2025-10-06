// js/reset.js
import { auth } from './firebase-config.js';
import { confirmPasswordReset } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';

const resetForm = document.getElementById("resetForm");
if (resetForm) {
  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const password = document.getElementById("reset-password").value.trim();
    const confirmPwd = document.getElementById("confirm-password").value.trim();

    if (password !== confirmPwd) {
      alert("❌ Passwords do not match.");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get('oobCode');

    if (!oobCode) {
      alert("⚠️ Please use the reset link sent to your email");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      alert("✅ Password changed!");
      window.location.href = 'index.html';
    } catch (error) {
      alert("❌ " + error.message);
    }
  });
}