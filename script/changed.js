document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    
    if (email) {
        const emailElement = document.getElementById('user-email');
        if (emailElement) {
            emailElement.textContent = email;
            emailElement.href = `mailto:${email}`;
        }
    }
    
    setTimeout(() => {
        window.location.href = "changed2.html?email=" + encodeURIComponent(email || '');
    }, 3000);

    const continueButton = document.querySelector('.auth-button, .btn-secondary, [type="submit"]');
    if (continueButton) {
        continueButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = "changed2.html?email=" + encodeURIComponent(email || '');
        });
    }
    
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.textContent = "✅ Password changed successfully!";
        successMessage.classList.remove('hidden');
        successMessage.classList.add('slide-up');
    }
});