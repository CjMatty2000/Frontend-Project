const forgetForm = document.getElementById("forgetForm");

let userDatabase = { users: [] };

async function loadUsers() {
    try {
        const response = await fetch('../data/users.json');
        userDatabase = await response.json();
    } catch (error) {
        console.error('Error loading users:', error);
        userDatabase = JSON.parse(localStorage.getItem('userDatabase') || '{"users": []}');
    }
}

loadUsers();

if (forgetForm) {
    forgetForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const emailInput = document.getElementById("forget-email");
        const email = emailInput.value.trim();
        const submitButton = forgetForm.querySelector('button[type="submit"]');

        if (!email) {
            alert("Please enter your email address.");
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert("Please enter a valid email address.");
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        if (userDatabase.users.length === 0) {
            await loadUsers();
        }

        const user = userDatabase.users.find(u => u.email === email);

        if (!user) {
            alert("No account found with this email address.");
            submitButton.disabled = false;
            submitButton.textContent = "Continue";
            return;
        }

        alert(`Password reset instructions sent to ${email}`);

        window.location.href = "reset.html?email=" + encodeURIComponent(email);

        submitButton.disabled = false;
        submitButton.textContent = "Continue";
    });
}