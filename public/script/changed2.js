import { auth } from "./firebase-config.js";
import { sendEmailVerification } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';

const backToLoginBtn = document.querySelector(".auth-button");
const resendLinkBtn = document.querySelector(".btn-secondary");
const successMessage = document.getElementById("success-message");


backToLoginBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});


function showToast(message) {
    successMessage.textContent = message;
    successMessage.classList.remove("hidden");
    successMessage.classList.add("slide-up", "toast");

    setTimeout(() => {
        successMessage.style.animation = "slideDown 0.5s ease forwards";
        setTimeout(() => {
            successMessage.classList.add("hidden");
            successMessage.style.animation = "";
            successMessage.textContent = "";
            successMessage.classList.remove("toast", "slide-up")
        }, 500);
    }, 3000);
}

window.addEventListener("DOMContentLoaded", () => {
    showToast("✅ Verification Link Sent Successfully");
});


resendLinkBtn.addEventListener("click", async () => {
    try {
        if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser);
            showToast("✅ Verification Link Sent Successfully");
        } else {
            alert("⚠️ No user is signed in.");
        }
    } catch (error) {
        alert("❌ " + error.message);
    }
});