/**
 * main.js
 * - Handles global UI updates based on login status (navigation, CTAs).
 * - Implements client-side page protection redirects.
 * - Handles logout functionality.
 * - MUST be included on ALL pages, AFTER other specific JS files.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Element References ---
    // Navigation elements
    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register');
    const navCompiler = document.getElementById('nav-compiler');
    const navDashboard = document.getElementById('nav-dashboard');
    const navTutorials = document.getElementById('nav-tutorials');
    const navChallenges = document.getElementById('nav-challenges');
    const navSnippets = document.getElementById('nav-snippets');
    const userInfoNav = document.getElementById('user-info');
    const usernameDisplayNav = document.getElementById('username-display'); // Corrected ID if needed
    const logoutButton = document.getElementById('logout-button');

    // Other elements potentially updated by login status
    const saveSnippetButton = document.getElementById('save-snippet-button'); // On compiler page
    const usernameDisplayBody = document.querySelectorAll('.username-display-body'); // For dashboard etc.
    const guestCta = document.getElementById('guest-cta'); // On index page
    const userCta = document.getElementById('user-cta'); // On index page

    // --- Check Login Status ---
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    const isLoggedIn = userData && userData.token; // Simple check for token existence

    /**
     * Updates the navigation and other UI elements based on login status.
     */
    function updateUIBasedOnLoginStatus() {
        // Get username safely
        const username = (isLoggedIn && userData.username) ? userData.username : 'User';

        if (isLoggedIn) {
            // --- User IS Logged In ---
            if (navLogin) navLogin.classList.add('hidden');
            if (navRegister) navRegister.classList.add('hidden');
            if (navCompiler) navCompiler.classList.remove('hidden');
            if (navDashboard) navDashboard.classList.remove('hidden');
            if (navTutorials) navTutorials.classList.remove('hidden');
            if (navChallenges) navChallenges.classList.remove('hidden');
            if (navSnippets) navSnippets.classList.remove('hidden');

            if (userInfoNav) {
                userInfoNav.classList.remove('hidden');
                if (usernameDisplayNav) usernameDisplayNav.textContent = username;
            }

            if (saveSnippetButton) saveSnippetButton.classList.remove('hidden');
            usernameDisplayBody.forEach(el => el.textContent = username);
            if (guestCta) guestCta.classList.add('hidden');
            if (userCta) userCta.classList.remove('hidden');

        } else {
            // --- User IS NOT Logged In ---
            if (navLogin) navLogin.classList.remove('hidden');
            if (navRegister) navRegister.classList.remove('hidden');
            if (navCompiler) navCompiler.classList.add('hidden');
            if (navDashboard) navDashboard.classList.add('hidden');
            if (navTutorials) navTutorials.classList.add('hidden');
            if (navChallenges) navChallenges.classList.add('hidden');
            if (navSnippets) navSnippets.classList.add('hidden');

            if (userInfoNav) userInfoNav.classList.add('hidden');

            if (saveSnippetButton) saveSnippetButton.classList.add('hidden');
            usernameDisplayBody.forEach(el => el.textContent = 'Guest');
            if (guestCta) guestCta.classList.remove('hidden');
            if (userCta) userCta.classList.add('hidden');
        }

        // Set active class on current page link (simple version based on filename)
        const currentPage = window.location.pathname.split('/').pop() || 'index.html'; // Default to index
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            // Check if the link's href matches the current page filename
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        // Special case for index.html if path is '/'
        if (window.location.pathname === '/' || currentPage === 'index.html') {
             const homeLink = document.querySelector('nav ul li a[href="index.html"]');
             if(homeLink) homeLink.classList.add('active');
        }

    }

    /**
     * Handles user logout.
     */
    function logout() {
        localStorage.removeItem('userInfo');
        console.log('User logged out (simulated)');
        // Redirect to login page immediately after logout
        // Use replace to prevent issues with the back button revisiting protected pages
        window.location.replace('login.html');
    }

    // Add logout listener if button exists
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    } else if (isLoggedIn) {
         // If user is logged in but logout button isn't found (maybe an HTML error)
         console.warn("Logout button not found, but user appears logged in.");
    }

    // --- Client-Side Page Protection ---
    // Get the current page filename (e.g., "compiler.html")
    const currentPagePath = window.location.pathname.split('/').pop();
    const protectedPages = [
        'compiler.html',
        'dashboard.html',
        'snippets.html',
        'tutorials.html', // Assuming tutorials are protected
        'challenges.html', // Assuming challenges list is protected
        'attempt-challenge.html'
    ];

    // If the current page is considered protected AND the user is not logged in, redirect.
    // Check currentPagePath is not empty (handles root '/') and is in the protected list.
    if (currentPagePath && protectedPages.includes(currentPagePath) && !isLoggedIn) {
        console.warn(`Access denied to ${currentPagePath}. User not logged in. Redirecting to login...`);

        // Optional: Store the page the user was trying to access to redirect back after login.
        // localStorage.setItem('redirectAfterLogin', currentPagePath + window.location.search); // Include query params like ?id=...

        // Redirect using replace()
        window.location.replace('login.html');
    } else {
         // --- Initial UI Update ---
         // Only update UI if not redirecting, otherwise the update is wasted
         updateUIBasedOnLoginStatus();
    }

}); // End DOMContentLoaded