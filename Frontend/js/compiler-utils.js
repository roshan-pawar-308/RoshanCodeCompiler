/**
 * compiler-utils.js
 * Shared utility functions for displaying results and escaping HTML.
 * Code execution simulation has been removed - relies on backend calls now.
 */

console.log("[DEBUG] compiler-utils.js loading...");

/**
 * Simple HTML escaping helper to prevent XSS issues.
 * @param {string | null | undefined} str - The string to escape.
 * @returns {string} The escaped string.
 */
function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    if (typeof str !== 'string') str = String(str); // Convert to string if not already

    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return str.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Updates the output/results section of the UI based on backend response.
 * @param {object} result - The result object from the backend/execution.
 * @param {HTMLElement | null} outputEl - The <pre> element for stdout.
 * @param {HTMLElement | null} errorEl - The <pre> element for stderr.
 * @param {HTMLElement | null} statusEl - The <pre> element for status line.
 * @param {HTMLElement | null} compilerMsgEl - The <pre> element for compiler messages.
 */
function displayResults(result, outputEl, errorEl, statusEl, compilerMsgEl) {
    console.log("[DEBUG] Displaying results:", result);

    // Ensure result is an object, provide default if not
    const safeResult = (typeof result === 'object' && result !== null) ? result : {};

    // Safely access properties using nullish coalescing
    const stdout = safeResult.stdout ?? '';
    const stderr = safeResult.stderr ?? '';
    const compileOutput = safeResult.compile_output ?? 'N/A';
    const message = safeResult.message ?? '';
    const statusDesc = safeResult.status?.description ?? 'Unknown'; // Access nested property safely
    const timeTaken = safeResult.time ? `${safeResult.time}s` : 'N/A';
    const memoryUsed = safeResult.memory ? `${Math.round(safeResult.memory / 1024)} MB` : 'N/A'; // Convert KB to MB maybe
    // const memoryUsed = safeResult.memory ? `${safeResult.memory} KB` : 'N/A'; // Or keep as KB

    if (outputEl) {
        outputEl.textContent = stdout;
    } else { console.warn("Output element missing for display."); }

    if (errorEl) {
        errorEl.textContent = stderr;
    } else { console.warn("Error element missing for display."); }

    if (compilerMsgEl) {
        const backendMessageText = message ? `\nBackend Message: ${escapeHTML(message)}` : '';
        compilerMsgEl.textContent = `Compiler Messages: <span class="math-inline">\{escapeHTML\(compileOutput\)\}</span>{backendMessageText}`;
    } else { console.warn("Compiler message element missing for display."); }

    if (statusEl) {
        statusEl.textContent = `Status: ${escapeHTML(statusDesc)} | Time: ${escapeHTML(timeTaken)} | Memory: ${escapeHTML(memoryUsed)}`;
    } else { console.warn("Status element missing for display."); }
}


console.log("[DEBUG] compiler-utils.js finished loading.");

// Note: No need to export if not using ES6 modules and just including the script globally.
// If using modules, you would add: export { escapeHTML, displayResults };