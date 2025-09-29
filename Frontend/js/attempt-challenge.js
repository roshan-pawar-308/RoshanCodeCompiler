/**
 * attempt-challenge.js
 * - Handles logic for the challenge attempt page (attempt-challenge.html).
 * - Loads challenge details based on URL parameter (?id=...).
 * - Populates the UI with challenge info and starter code.
 * - Simulates running tests and submitting solutions.
 */

// --- Simulated Challenge Database (Keep this updated with more challenges) ---
const challengesDB = {
    "two-sum": {
        id: "two-sum",
        title: "Two Sum Problem",
        difficulty: "Easy",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
        examples: `Example 1:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\nExample 2:\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]`,
        constraints: `2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.`,
        starterCode: {
            python: `def twoSum(nums, target):\n    # Your code here\n    pass\n`,
            javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Your code here\n};\n`,
            java: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        throw new IllegalArgumentException("No two sum solution");\n    }\n}\n`,
            'c++': `#include <vector>\n#include <unordered_map>\n\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        // Your code here\n        return {}; // Return empty vector if no solution found\n    }\n};\n`,
            c: `#include <stdlib.h>\n\n/**\n * Note: The returned array must be malloced, assume caller calls free().\n */\nint* twoSum(int* nums, int numsSize, int target, int* returnSize){\n    *returnSize = 0;\n    // Your code here\n    // Remember to set *returnSize = 2 and malloc result if found\n    return NULL;\n}\n`
        },
        // Simulated test cases (Input format depends on how you'd parse it)
         testCases: [
            { input: { nums: [2, 7, 11, 15], target: 9 }, expectedOutput: "[0,1] or [1,0]" }, // Output format might vary (string, array)
            { input: { nums: [3, 2, 4], target: 6 }, expectedOutput: "[1,2] or [2,1]" },
            { input: { nums: [3, 3], target: 6 }, expectedOutput: "[0,1] or [1,0]" },
            { input: { nums: [-1, -2, -3, -4, -5], target: -8 }, expectedOutput: "[2,4] or [4,2]" }
         ]
    },
     "reverse-string": {
        id: "reverse-string",
        title: "Reverse a String",
        difficulty: "Easy",
        description: "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
        examples: `Example 1:\nInput: s = ["h","e","l","l","o"]\nOutput: ["o","l","l","e","h"]\n\nExample 2:\nInput: s = ["H","a","n","n","a","h"]\nOutput: ["h","a","n","n","a","H"]`,
        constraints: `1 <= s.length <= 10^5\ns[i] is a printable ascii character.`,
        starterCode: {
             python: `from typing import List\n\ndef reverseString(s: List[str]) -> None:\n    \"\"\"\n    Do not return anything, modify s in-place instead.\n    \"\"\"\n    # Your code here\n    pass\n`,
            javascript: `/**\n * @param {character[]} s\n * @return {void} Do not return anything, modify s in-place instead.\n */\nvar reverseString = function(s) {\n    // Your code here\n};\n`,
             java: `class Solution {\n    public void reverseString(char[] s) {\n        // Your code here\n    }\n}\n`,
            'c++': `#include <vector>\n#include <algorithm>\n\nclass Solution {\npublic:\n    void reverseString(std::vector<char>& s) {\n        // Your code here\n    }\n};\n`,
             c: `#include <string.h>\n\nvoid reverseString(char* s, int sSize){\n    // Your code here\n}\n`
        },
         testCases: [
            // Simulating in-place modification is complex here, just show input
            { input: { s: ['h','e','l','l','o'] }, expectedOutput: "Input array modified to ['o','l','l','e','h']" },
            { input: { s: ['H','a','n','n','a','h'] }, expectedOutput: "Input array modified to ['h','a','n','n','a','H']" },
            { input: { s: ['a'] }, expectedOutput: "Input array modified to ['a']" },
            { input: { s: ['1','2'] }, expectedOutput: "Input array modified to ['2','1']" },
         ]
    },
    "validate-bst": {
        id: "validate-bst",
        title: "Validate Binary Search Tree",
         difficulty: "Medium",
         description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than the node's key.\n- The right subtree of a node contains only nodes with keys greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.",
         examples: `Example 1:\nInput: root = [2,1,3]\nOutput: true\n\nExample 2:\nInput: root = [5,1,4,null,null,3,6]\nOutput: false\nExplanation: The root node's value is 5 but its right child's value is 4.`,
         constraints: `The number of nodes in the tree is in the range [1, 10^4].\n-2^31 <= Node.val <= 2^31 - 1`,
         starterCode: {
             python: `# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def isValidBST(self, root) -> bool:\n        # Your code here\n        pass\n`,
             javascript: `/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {boolean}\n */\nvar isValidBST = function(root) {\n    // Your code here\n};\n`,
             // Add Java, C++, C starter code if needed
         },
          testCases: [
              { input: "Tree [2,1,3]", expectedOutput: "true"}, // Need a way to represent tree inputs
              { input: "Tree [5,1,4,null,null,3,6]", expectedOutput: "false"},
              { input: "Tree [1,1]", expectedOutput: "false"},
         ]
     }
};
// --- End Simulated DB ---

// --- Utility: Simple HTML Escaping ---
function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    if (typeof str !== 'string') str = String(str);
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return str.replace(/[&<>"']/g, m => map[m]);
}

// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Element References ---
    // Compiler Elements
    const languageSelect = document.getElementById('language');
    const codeTextArea = document.getElementById('code');
    const outputPre = document.getElementById('output');
    const errorOutputPre = document.getElementById('error-output');
    const statusPre = document.getElementById('status');
    const compilerMessagePre = document.getElementById('compiler-message');
    const runTestsButton = document.getElementById('run-tests-button');
    const submitButton = document.getElementById('submit-button');
    const messageArea = document.getElementById('challenge-message-area'); // Message Area

    // Challenge Info Elements
    const challengeTitle = document.getElementById('challenge-title');
    const challengeDescriptionContent = document.getElementById('challenge-description-content');
    const challengeExamples = document.getElementById('challenge-examples');
    const challengeConstraints = document.getElementById('challenge-constraints');

    let currentChallenge = null; // To store the loaded challenge data

    // --- UI Feedback ---
     function showChallengeMessage(msg, isError = false) {
         if (messageArea) {
            messageArea.textContent = msg;
            messageArea.className = isError ? 'message error-message mb-2' : 'message success-message mb-2';
        }
    }
     function clearChallengeMessage() {
         if (messageArea) {
            messageArea.textContent = '';
            messageArea.className = 'message hidden mb-2';
        }
    }


    // --- Core Functions ---

    /**
     * Loads challenge details based on the URL parameter.
     */
    function loadChallenge() {
        const urlParams = new URLSearchParams(window.location.search);
        const challengeId = urlParams.get('id');

        // Check if all required elements exist
        if (!challengeTitle || !challengeDescriptionContent || !challengeExamples || !challengeConstraints || !languageSelect || !codeTextArea) {
            console.error("One or more essential page elements are missing. Cannot load challenge.");
            // Display a general error on the page if possible
            if(challengeTitle) challengeTitle.textContent = "Page Load Error";
            if(messageArea) showChallengeMessage("Error loading page elements. Please refresh or contact support.", true);
            disableCompilerControls(); // Disable controls if page is broken
            return;
        }


        if (!challengeId) {
            challengeTitle.textContent = "Challenge Not Found";
            challengeDescriptionContent.innerHTML = `<p class="error-message">No challenge ID specified in the URL. Please go back to the <a href="challenges.html">Challenges</a> page.</p>`;
            disableCompilerControls();
            return;
        }

        currentChallenge = challengesDB[challengeId]; // Get from simulated DB

        if (!currentChallenge) {
            challengeTitle.textContent = "Challenge Not Found";
             challengeDescriptionContent.innerHTML = `<p class="error-message">Challenge with ID "${escapeHTML(challengeId)}" not found. Please go back to the <a href="challenges.html">Challenges</a> page.</p>`;
            disableCompilerControls();
            return;
        }

        // Populate challenge details using textContent or safe HTML methods
        challengeTitle.textContent = currentChallenge.title;
        // Render description with line breaks (safer than innerHTML if description is plain text)
        const descriptionParagraph = document.createElement('p');
        descriptionParagraph.innerHTML = escapeHTML(currentChallenge.description || "No description available.").replace(/\n/g, '<br>');
        challengeDescriptionContent.innerHTML = ''; // Clear loading message
        challengeDescriptionContent.appendChild(descriptionParagraph);

         challengeExamples.textContent = currentChallenge.examples || "No examples provided.";
         challengeConstraints.textContent = currentChallenge.constraints || "No specific constraints provided.";

         // Set starter code for the initially selected language
         updateStarterCode();

         // Add event listener for language changes AFTER loading challenge
         languageSelect.addEventListener('change', updateStarterCode);

         // Enable controls now that challenge is loaded
         enableCompilerControls();
         clearChallengeMessage(); // Clear any loading errors
         statusPre.textContent = "Status: Ready"; // Reset status

    }

    /**
     * Updates the code editor with the starter code for the currently selected language.
     */
    function updateStarterCode() {
         if (currentChallenge && currentChallenge.starterCode && languageSelect && codeTextArea) {
             const selectedLanguage = languageSelect.value;
             // Set value, provide fallback if starter code for language is missing
             codeTextArea.value = currentChallenge.starterCode[selectedLanguage] || `// Starter code for ${selectedLanguage} is not available for this challenge.\n// Please select another language or start from scratch.`;
         } else if (currentChallenge) {
              // Handle case where starter code is missing entirely for the challenge
              codeTextArea.value = `// No starter code available for this challenge.`;
         }
    }

    /**
     * Disables compiler controls (e.g., when no challenge is loaded).
     */
    function disableCompilerControls() {
        if(languageSelect) languageSelect.disabled = true;
        if(codeTextArea) codeTextArea.disabled = true;
        if(runTestsButton) runTestsButton.disabled = true;
        if(submitButton) submitButton.disabled = true;
    }

    /**
     * Enables compiler controls.
     */
    function enableCompilerControls() {
         if(languageSelect) languageSelect.disabled = false;
        if(codeTextArea) codeTextArea.disabled = false;
        if(runTestsButton) runTestsButton.disabled = false;
        if(submitButton) submitButton.disabled = false;
    }


    /**
     * Simulates running the user's code against the challenge's test cases.
     * @returns {Promise<boolean>} True if all simulated tests passed, false otherwise.
     */
    async function handleRunTests() {
         clearChallengeMessage(); // Clear previous messages
         if (!currentChallenge || !currentChallenge.testCases) {
             showChallengeMessage("Cannot run tests: Challenge data or test cases missing.", true);
             return false; // Indicate failure
         }

         const language = languageSelect.value;
         const code = codeTextArea.value;

          if (!code.trim()) {
            showChallengeMessage("Cannot run tests with empty code.", true);
            return false;
         }


         // Update UI for running state
         outputPre.textContent = '';
         errorOutputPre.textContent = '';
         compilerMessagePre.textContent = 'Compiler Messages: N/A';
         statusPre.textContent = 'Status: Running tests...';
         if (runTestsButton) runTestsButton.disabled = true;
         if (submitButton) submitButton.disabled = true;

         console.log('Running tests (Simulated):', { challengeId: currentChallenge.id, language });

         // --- TODO: Replace this section with actual backend API call ---
         // Simulate network/execution delay
         await new Promise(resolve => setTimeout(resolve, 2000));

         // Simulate potential compile/runtime error before running tests
         if (Math.random() < 0.1) { // 10% chance of error
             statusPre.textContent = "Status: Execution Error";
             errorOutputPre.textContent = `Simulated Runtime Error in ${language} code. Check your logic or syntax.`;
             compilerMessagePre.textContent = "Simulated execution failed before running tests.";
              if (runTestsButton) runTestsButton.disabled = false; // Re-enable buttons
             if (submitButton) submitButton.disabled = false;
             return false; // Indicate failure
         }


         // Simulate Test Case Results
         let allPassed = true;
         let resultsOutput = "";
         const testCases = currentChallenge.testCases || [];

         if (testCases.length === 0) {
             resultsOutput = "No test cases defined for this challenge (Simulated).\n";
             statusPre.textContent = "Status: No Tests Defined";
             compilerMessagePre.textContent = "Cannot determine correctness.";
             allPassed = false; // Consider it not passed if no tests exist
         } else {
             testCases.forEach((test, index) => {
                 // Simulate pass/fail randomly (replace with actual backend logic)
                 const pass = Math.random() > 0.25; // 75% chance to pass each test
                 const inputDisplay = (typeof test.input === 'object') ? JSON.stringify(test.input) : test.input;
                 resultsOutput += `Test Case ${index + 1}: ${pass ? '✅ Passed' : '❌ Failed'}\n`;
                 resultsOutput += ` Input: ${inputDisplay}\n Expected: ${test.expectedOutput}\n Got: ${pass ? test.expectedOutput : 'Simulated Wrong Output'}\n\n`;
                 if (!pass) allPassed = false;
             });

            statusPre.textContent = `Status: ${allPassed ? 'All Tests Passed ✅' : 'Some Tests Failed ❌'}`;
            compilerMessagePre.textContent = "Simulated test execution complete.";
         }

         outputPre.textContent = resultsOutput;
         errorOutputPre.textContent = ""; // Clear previous errors if tests ran

         // Re-enable buttons
         if (runTestsButton) runTestsButton.disabled = false;
         if (submitButton) submitButton.disabled = false;

         return allPassed; // Return test outcome
    }

    /**
     * Simulates submitting the solution after running tests.
     */
    async function handleSubmitSolution() {
        clearChallengeMessage();
         if (!currentChallenge) {
             showChallengeMessage("Cannot submit: No challenge loaded.", true);
             return;
         }

        // Re-run tests before final submission
         showChallengeMessage("Running final tests before submission...", false);
         statusPre.textContent = 'Status: Running final tests...';
          if (runTestsButton) runTestsButton.disabled = true;
         if (submitButton) submitButton.disabled = true;

         // Wait for tests to complete
         const testsPassed = await handleRunTests(); // Reuse the test running logic

         if (!testsPassed) {
             showChallengeMessage("Submission failed: Not all test cases passed during final check.", true);
             // Keep buttons enabled as tests already re-enabled them
             return;
         }

        // If tests passed, proceed with simulated submission
         console.log('Submitting solution (Simulated):', { challengeId: currentChallenge.id, language: languageSelect.value });
         statusPre.textContent = 'Status: Submitting...';
         // Keep buttons disabled

         // --- TODO: Replace with actual backend API call to record submission ---
         await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate submission network delay

         // --- Simulated Success ---
         statusPre.textContent = 'Status: Accepted! 🎉';
         showChallengeMessage("Congratulations! Your solution was accepted (Simulated).", false);
         // Disable buttons permanently after successful submission? Or allow resubmission?
         // if (runTestsButton) runTestsButton.disabled = true;
         // if (submitButton) submitButton.disabled = true;

         // Re-enable buttons to allow further testing/resubmission if desired
          if (runTestsButton) runTestsButton.disabled = false;
         if (submitButton) submitButton.disabled = false;
    }


    // --- Event Listeners ---
    if (runTestsButton) {
        runTestsButton.addEventListener('click', handleRunTests);
    } else {
        console.error("Run Tests button not found!");
    }
    if (submitButton) {
        submitButton.addEventListener('click', handleSubmitSolution);
    } else {
         console.error("Submit button not found!");
    }


    // --- Initial Load ---
    // Disable controls initially until challenge is loaded
    disableCompilerControls();
    // Load the challenge details from URL param
    loadChallenge();

}); // End DOMContentLoaded