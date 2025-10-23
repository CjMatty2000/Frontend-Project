document.addEventListener('DOMContentLoaded', function() {
    const resetForm = document.getElementById('resetForm');
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    
    if (!email) {
        const emailField = document.getElementById('reset-email');
        if (emailField) {
            emailField.placeholder = "Enter your email";
            emailField.readOnly = false;
        }
        
        if (resetForm) {
            resetForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const manualEmail = document.getElementById('reset-email').value.trim();
                const newPassword = document.getElementById('new-password').value;
                const confirmPassword = document.getElementById('confirm-password').value;
                
                if (!manualEmail) {
                    alert("Please enter your email address.");
                    return;
                }
                
                if (newPassword.length < 6) {
                    alert("Password must be at least 6 characters long");
                    return;
                }
                
                if (newPassword !== confirmPassword) {
                    alert("Passwords don't match");
                    return;
                }
                
                const submitButton = resetForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = "Resetting...";
            
                resetPassword(manualEmail, newPassword, submitButton);
            });
        }
        return;
    }
    
    if (resetForm) {
        const emailField = document.getElementById('reset-email');
        if (emailField) {
            emailField.value = email;
            emailField.readOnly = true;
        }
        
        resetForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (newPassword.length < 6) {
                alert("Password must be at least 6 characters long");
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert("Passwords don't match");
                return;
            }
            
            const submitButton = resetForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = "Resetting...";
            
            resetPassword(email, newPassword, submitButton);
        });
    }
    
    const goBackLink = document.querySelector('a[href="login.html"]');
    if (goBackLink) {
        goBackLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = "login.html";
        });
    }
});

async function resetPassword(email, newPassword, submitButton) {
    let userDatabase;
    try {
        const response = await fetch('../data/users.json');
        userDatabase = await response.json();
    } catch (error) {
        userDatabase = JSON.parse(localStorage.getItem('userDatabase') || '{"users": []}');
    }
    
    const user = userDatabase.users.find(u => u.email === email);
    
    if (user) {
        user.password = newPassword;
        localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
        
        alert("Password reset successfully!");
        window.location.href = "changed.html";
    } else {
        alert("No account found with this email address.");
    }
    
    submitButton.disabled = false;
    submitButton.textContent = "Change Password";
}