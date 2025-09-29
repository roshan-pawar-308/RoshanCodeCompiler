document.addEventListener('DOMContentLoaded', () => {
    const snippetListDiv = document.getElementById('snippet-list');
    const loadingMessage = document.getElementById('loading-snippets');
    const snippetModal = document.getElementById('snippet-modal');
    const modalCloseButton = snippetModal.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalSnippetTitle = document.getElementById('modal-snippet-title');
    const modalLanguage = document.getElementById('modal-language');
    const modalDescription = document.getElementById('modal-description');
    const modalCode = document.getElementById('modal-code');
    const snippetMessageArea = document.getElementById('snippet-message-area');

    const SNIPPETS_STORAGE_KEY = 'userSnippets';

    function getSnippetsFromStorage() {
        try {
            const snippetsJson = localStorage.getItem(SNIPPETS_STORAGE_KEY);
            return snippetsJson ? JSON.parse(snippetsJson) : [];
        } catch (e) {
            console.error("Error parsing snippets from localStorage:", e);
            showMessage("Error loading snippets.", true);
            return [];
        }
    }

    function showMessage(msg, isError = false) {
        snippetMessageArea.textContent = msg;
        snippetMessageArea.className = isError ? 'message error-message' : 'message success-message';
    }

    function hideMessage() {
        snippetMessageArea.textContent = '';
        snippetMessageArea.className = 'message hidden';
    }

    function displaySnippets() {
        const snippets = getSnippetsFromStorage();
        loadingMessage.style.display = 'none';
        snippetListDiv.innerHTML = ''; // Clear existing content

        if (snippets.length === 0) {
            snippetListDiv.innerHTML = '<p class="info-message">No snippets saved yet. Save snippets from the <a href="compiler.html">Compiler</a> page.</p>';
            return;
        }

        snippets.forEach(snippet => {
            const snippetCard = document.createElement('div');
            snippetCard.classList.add('snippet-card');
            snippetCard.innerHTML = `
                <h3 class="snippet-title">${escapeHTML(snippet.title)}</h3>
                <p class="snippet-language">Language: ${escapeHTML(snippet.language)}</p>
                ${snippet.description ? `<p class="snippet-description">${escapeHTML(snippet.description)}</p>` : ''}
            `;
            snippetCard.addEventListener('click', () => openSnippetModal(snippet));
            snippetListDiv.appendChild(snippetCard);
        });
    }

    function openSnippetModal(snippet) {
        modalTitle.textContent = 'View Snippet';
        modalSnippetTitle.textContent = snippet.title;
        modalLanguage.textContent = snippet.language;
        modalDescription.textContent = snippet.description || 'No description provided.';
        modalCode.value = snippet.code;
        snippetModal.style.display = 'block';
    }

    function closeSnippetModal() {
        snippetModal.style.display = 'none';
    }

    // Event listener for closing the modal
    modalCloseButton.addEventListener('click', closeSnippetModal);
    window.addEventListener('click', (event) => {
        if (event.target === snippetModal) {
            closeSnippetModal();
        }
    });

    // Initial load of snippets
    displaySnippets();

    // --- Authentication / Nav Update (Similar to compiler.html) ---
    const navCompilerLink = document.getElementById('nav-compiler');
    const navDashboardLink = document.getElementById('nav-dashboard');
    const navTutorialsLink = document.getElementById('nav-tutorials');
    const navChallengesLink = document.getElementById('nav-challenges');
    const navSnippetsLink = document.getElementById('nav-snippets');
    const navLoginLink = document.getElementById('nav-login');
    const navRegisterLink = document.getElementById('nav-register');
    const userInfoDisplay = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username-display');
    const logoutButton = document.getElementById('logout-button');

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    if (isLoggedIn) {
        if (navCompilerLink) navCompilerLink.classList.remove('hidden');
        if (navDashboardLink) navDashboardLink.classList.remove('hidden');
        if (navTutorialsLink) navTutorialsLink.classList.remove('hidden');
        if (navChallengesLink) navChallengesLink.classList.remove('hidden');
        if (navSnippetsLink) navSnippetsLink.classList.remove('hidden');
        if (userInfoDisplay) userInfoDisplay.classList.remove('hidden');
        if (navLoginLink) navLoginLink.classList.add('hidden');
        if (navRegisterLink) navRegisterLink.classList.add('hidden');
        if (usernameDisplay) usernameDisplay.textContent = username || 'User';
    } else {
        if (navDashboardLink) navDashboardLink.classList.add('hidden');
        if (navTutorialsLink) navTutorialsLink.classList.add('hidden');
        if (navChallengesLink) navChallengesLink.classList.add('hidden');
        if (navSnippetsLink) navSnippetsLink.classList.add('hidden');
        if (userInfoDisplay) userInfoDisplay.classList.add('hidden');
        if (navLoginLink) navLoginLink.classList.remove('hidden');
        if (navRegisterLink) navRegisterLink.classList.remove('hidden');
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            showMessage('Logged out successfully.', false);
            window.location.href = 'index.html';
        });
    }

    // Simple HTML escaping helper
    function escapeHTML(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
});