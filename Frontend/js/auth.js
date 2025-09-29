/**
 * auth.js
 * Handles login and registration form submissions (simulated).
 * Stores user info (including a fake token) in localStorage on success.
 * Redirects user after successful login or registration.
 */
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const messageElement = document.getElementById('message'); // Common message element for login/register pages

    // --- Helper Functions ---
    function showAuthMessage(msg, isError = false) {
        if (messageElement) {
            messageElement.textContent = msg;
            // Assign classes based on error status and remove 'hidden'
            messageElement.className = isError ? 'message error-message' : 'message success-message';
        } else {
            // Fallback if message element doesn't exist on the page
            console.warn("Message element not found on this page.");
        }
    }

    function clearAuthMessage() {
         if (messageElement) {
            messageElement.textContent = '';
            // Add 'hidden' back and remove status classes
            messageElement.className = 'message hidden';
        }
    }

    // --- Registration Logic ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission
            clearAuthMessage(); // Clear previous messages
            const registerButton = registerForm.querySelector('button[type="submit"]');
            if (registerButton) registerButton.disabled = true; // Disable button

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Frontend Validation
            if (!username || !email || !password || !confirmPassword) {
                 showAuthMessage('Please fill in all fields.', true);
                 if (registerButton) registerButton.disabled = false;
                 return;
            }
            if (password !== confirmPassword) {
                showAuthMessage('Passwords do not match!', true);
                 if (registerButton) registerButton.disabled = false;
                return;
            }
            if (password.length < 6) {
                 showAuthMessage('Password must be at least 6 characters long!', true);
                 if (registerButton) registerButton.disabled = false;
                 return;
            }

            console.log('Registering user (Simulated Frontend):', { username, email });

            // --- TODO: Replace with actual fetch call to backend registration endpoint ---
            showAuthMessage('Attempting registration...', false); // Use success style for processing message
            await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate network delay

            // --- Simulated Backend Response ---
            // Simulate potential errors (e.g., email already exists) - uncomment to test
            // if (email === 'test@example.com') {
            //     showAuthMessage('Registration failed: Email already exists (Simulated).', true);
            //     if (registerButton) registerButton.disabled = false;
            //     return;
            // }

            // Simulate Success
            showAuthMessage('Registration successful! Redirecting to login...', false);
             // In a real app, the backend might return user data, but we redirect to login here.
             setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login page
             }, 1500);

            // Note: Don't re-enable button on success if redirecting.
        });
    }

    // --- Login Logic ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearAuthMessage();
            const loginButton = loginForm.querySelector('button[type="submit"]');
            if (loginButton) loginButton.disabled = true;

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            // Frontend Validation
            if (!email || !password) {
                 showAuthMessage('Please enter both email and password.', true);
                 if (loginButton) loginButton.disabled = false;
                 return;
            }

            console.log('Logging in user (Simulated Frontend):', { email });

            // --- TODO: Replace with actual fetch call to backend login endpoint ---
            showAuthMessage('Attempting login...', false);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

            // --- Simulated Backend Response ---
            // Simulate potential errors (e.g., invalid credentials) - uncomment to test
            // if (password !== 'password123') { // Example: Check against a hardcoded password
            //     showAuthMessage('Login failed: Invalid email or password (Simulated).', true);
            //      if (loginButton) loginButton.disabled = false;
            //     return;
            // }

            // Simulate Success - Create fake user data and token
            const simulatedUserData = {
                // Generate a slightly more realistic fake ID
                _id: 'user_' + Math.random().toString(36).substring(2, 9),
                // Create a username from the email prefix
                username: email.split('@')[0] || 'User',
                email: email,
                // Generate a simple fake token
                token: 'fake_jwt_token_' + Date.now() + Math.random().toString(16).substring(2)
            };

            // Store user info in localStorage
            localStorage.setItem('userInfo', JSON.stringify(simulatedUserData));
            console.log('Login successful, user info stored:', simulatedUserData);

            showAuthMessage('Login successful! Redirecting...', false);

            // Redirect to dashboard after successful login
            setTimeout(() => {
                // Optional: Redirect to a previously intended page if stored by main.js protection
                // const intendedDestination = localStorage.getItem('redirectAfterLogin');
                // localStorage.removeItem('redirectAfterLogin'); // Clean up
                // window.location.replace(intendedDestination || 'dashboard.html');

                // Default redirect to dashboard
                window.location.replace('dashboard.html');
            }, 1000);
             // Note: Don't re-enable button on success if redirecting.
        });
    }

}); // End DOMContentLoaded