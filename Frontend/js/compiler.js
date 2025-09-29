/**
 * compiler.js
 * - Handles interactions on the compiler page (compiler.html).
 * - Simulates code execution via an external API (placeholder).
 * - Handles saving code snippets to localStorage.
 */

// --- Storage Helper Functions (Shared with snippets.js - consider moving to a utils file) ---
const SNIPPETS_STORAGE_KEY = 'userSnippets'; // Ensure consistency

function getSnippetsFromStorage() {
    try {
        const snippetsJson = localStorage.getItem(SNIPPETS_STORAGE_KEY);
        return snippetsJson ? JSON.parse(snippetsJson) : [];
    } catch (e) {
        console.error("Error parsing snippets from localStorage:", e);
        return [];
    }
}

function saveSnippetsToStorage(snippets) {
    try {
        localStorage.setItem(SNIPPETS_STORAGE_KEY, JSON.stringify(snippets));
    } catch (e) {
        console.error("Error saving snippets to localStorage:", e);
        showCompilerMessage("Could not save snippet data. Storage might be full or unavailable.", true);
    }
}
// --- End Storage Helpers ---


// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Element References ---
    const runButton = document.getElementById('run-button');
    const languageSelect = document.getElementById('language');
    const codeTextArea = document.getElementById('code');
    const stdinTextArea = document.getElementById('stdin');
    const outputPre = document.getElementById('output');
    const errorOutputPre = document.getElementById('error-output');
    const statusPre = document.getElementById('status');
    const compilerMessagePre = document.getElementById('compiler-message');
    const saveSnippetButton = document.getElementById('save-snippet-button');
    const messageArea = document.getElementById('compiler-message-area'); // Specific message area for this page

    // --- UI Feedback ---
    function showCompilerMessage(msg, isError = false) {
         if (messageArea) {
            messageArea.textContent = msg;
            messageArea.className = isError ? 'message error-message mb-2' : 'message success-message mb-2';
        }
    }
    function clearCompilerMessage() {
         if (messageArea) {
            messageArea.textContent = '';
            messageArea.className = 'message hidden mb-2';
        }
    }

    // --- Event Handlers ---

    /**
     * Handles the "Run Code" button click. Simulates execution.
     */
    async function handleRunCode() {
        clearCompilerMessage(); // Clear previous messages
        const language = languageSelect.value;
        const code = codeTextArea.value;
        const stdin = stdinTextArea.value;

        // Basic check if code is empty
        if (!code.trim()) {
            showCompilerMessage("Cannot run empty code.", true);
            return;
        }

        // Update UI to show "Running" state
        outputPre.textContent = '';
        errorOutputPre.textContent = '';
        compilerMessagePre.textContent = 'Compiler Messages: N/A';
        statusPre.textContent = 'Status: Running...';
        if (runButton) runButton.disabled = true; // Disable button
        if (saveSnippetButton) saveSnippetButton.disabled = true; // Also disable save while running


        console.log('Running code (Simulated Frontend):', { language, codeLength: code.length, stdin });

        // --- TODO: Replace this section with actual fetch call to backend compiler API ---
        // Simulate API Call Delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate a possible API error (uncomment to test)
        // if (Math.random() < 0.1) { // 10% chance of API error
        //     displayResults({
        //         stdout: null, stderr: "Simulated API Error: Could not connect to execution service.",
        //         compile_output: null, message: "Execution failed", status: { description: "API Error" }
        //     });
        //     if (runButton) runButton.disabled = false; // Re-enable buttons on failure
        //     if (saveSnippetButton) saveSnippetButton.disabled = false;
        //     return;
        // }


        // Simulate a successful execution response (can add simulated compile errors too)
        const simulatedResult = {
            stdout: `Simulated output for <span class="math-inline">\{language\}\:\\nInput was\: "</span>{stdin || 'none'}"\nCode length: ${code.length}\nResult: ${Math.random() * 100}`,
            stderr: (Math.random() < 0.1) ? `Simulated stderr output on line ${Math.floor(Math.random()*10+1)}` : null, // 10% chance of stderr
            compile_output: (Math.random() < 0.05) ? `Simulated compile warning/error` : null, // 5% chance of compile message
            message: 'Simulated execution successful',
            status: { description: "Accepted (Simulated)" }, // Could simulate other statuses like "Wrong Answer", "Time Limit Exceeded"
            time: (Math.random() * 0.5 + 0.01).toFixed(3), // Random time between 0.01 and 0.51
            memory: Math.floor(Math.random() * 20000 + 5000) // Random memory between 5000-25000 KB
        };
        displayResults(simulatedResult);
        // --- End of Simulation Section ---

        // Re-enable buttons after execution completes
        if (runButton) runButton.disabled = false;
        if (saveSnippetButton) saveSnippetButton.disabled = false;
    }

    /**
     * Handles the "Save Snippet" button click. Saves to localStorage.
     */
    function handleSaveSnippet() {
        clearCompilerMessage(); // Clear previous messages
        const language = languageSelect.value;
        const code = codeTextArea.value;

        if (!code.trim()) {
             showCompilerMessage("Cannot save empty code.", true);
            return;
        }

        // Prompt for title (required) and description (optional)
        const title = prompt("Enter a title for this snippet:");
        if (title === null) return; // User cancelled prompt
        if (!title.trim()) {
            showCompilerMessage("Snippet title cannot be empty.", true);
            return;
        }

        const description = prompt("Enter an optional description for this snippet:");
        // If user cancels description prompt, description will be null, handle it

        const newSnippet = {
            id: Date.now(), // Simple unique ID using timestamp
            title: title.trim(),
            language: language,
            code: code, // Keep original code whitespace
            description: (description === null) ? "" : description.trim(), // Handle cancelled prompt
            createdAt: new Date().toISOString() // ISO format timestamp
        };

        try {
            const snippets = getSnippetsFromStorage();
            snippets.push(newSnippet); // Add the new snippet
            saveSnippetsToStorage(snippets); // Save the updated array
            console.log('Snippet saved (simulated to localStorage):', newSnippet);
            showCompilerMessage(`Snippet "${escapeHTML(newSnippet.title)}" saved successfully! View it on the 'My Snippets' page.`, false);

            // Optional: Clear the compiler fields after saving
            // codeTextArea.value = '';
            // stdinTextArea.value = '';
            // statusPre.textContent = 'Status: Ready';
            // outputPre.textContent = '[Output will appear here]';
            // errorOutputPre.textContent = '[Errors will appear here]';

        } catch (error) {
            // Error handled within saveSnippetsToStorage, but log here too
            console.error("Error occurred during snippet save process:", error);
             showCompilerMessage("Failed to save snippet due to a storage error.", true);
        }
    }

    /**
     * Updates the output/results section of the UI.
     * @param {object} result - The (simulated) result object from execution.
     */
    function displayResults(result) {
        outputPre.textContent = result.stdout || ''; // Handle null/empty stdout
        errorOutputPre.textContent = result.stderr || ''; // Handle null/empty stderr
        compilerMessagePre.textContent = `Compiler Messages: ${result.compile_output || 'N/A'}`;
        // Add backend message if available in result object
        const backendMessage = result.message ? `\nBackend Message: ${result.message}` : '';
        compilerMessagePre.textContent += backendMessage;
         // Display status, time, memory safely
        const statusDesc = result.status?.description || 'Unknown';
        const timeTaken = result.time ? `${result.time}s` : 'N/A';
        const memoryUsed = result.memory ? `${result.memory} KB` : 'N/A';
        statusPre.textContent = `Status: ${statusDesc} | Time: ${timeTaken} | Memory: ${memoryUsed}`;
    }

    // Simple HTML escaping helper (needed for messages)
    function escapeHTML(str) {
       if (!str) return '';
       const div = document.createElement('div');
       div.textContent = str;
       return div.innerHTML;
    }

    // --- Attach Event Listeners ---
    if (runButton) {
        runButton.addEventListener('click', handleRunCode);
    } else {
        console.error("Run button not found!");
    }

    if (saveSnippetButton) {
        saveSnippetButton.addEventListener('click', handleSaveSnippet);
    } else {
         // Save button might be legitimately absent if user isn't logged in,
         // so only log error if it SHOULD be there (main.js handles visibility)
         // console.warn("Save Snippet button not found!");
    }

}); // End DOMContentLoaded