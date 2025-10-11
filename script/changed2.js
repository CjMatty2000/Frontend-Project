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

    const backToLoginBtn = document.querySelector('.auth-button');
    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', function() {
            window.location.href = "login.html";
        });
    }

    const resendLinkBtn = document.querySelector('.btn-secondary');
    if (resendLinkBtn) {
        resendLinkBtn.addEventListener('click', function() {
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
                successMessage.textContent = "📧 Verification link has been resent!";
                successMessage.classList.remove('hidden');
                successMessage.classList.add('slide-up');
                
                setTimeout(() => {
                    successMessage.classList.remove('slide-up');
                    successMessage.classList.add('hidden');
                }, 3000);
            }
        });
    }

    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.textContent = "✅ Password reset completed! Verification email sent.";
        successMessage.classList.remove('hidden');
        successMessage.classList.add('slide-up');
        
        setTimeout(() => {
            successMessage.classList.remove('slide-up');
            successMessage.classList.add('hidden');
        }, 5000);
    }
});