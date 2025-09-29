// server.js
const express = require('express');
const cors = require('cors');
const { exec, spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tempDir = path.join(__dirname, 'temp_code');
async function ensureTempDirExists() {
    try {
        await fs.mkdir(tempDir, { recursive: true });
        console.log(`Temporary code directory created or already exists: ${tempDir}`);
    } catch (error) {
        console.error('Error creating temporary directory:', error);
        process.exit(1);
    }
}
ensureTempDirExists();

const cleanupFiles = async (files) => {
    for (const file of files) {
        if (file && await fs.access(file).then(() => true).catch(() => false)) {
            try {
                await fs.unlink(file);
                // console.log(`Deleted file: ${file}`);
            } catch (err) {
                console.error(`Error deleting file ${file}:`, err);
            }
        }
    }
};

// --- In-memory storage for snippets (replace with a database in production) ---
const snippets = [];

// --- API Endpoints for Snippets ---

// GET /api/snippets - Get all snippets for a user (requires authentication in real app)
app.get('/api/snippets', (req, res) => {
    // In a real application, you would filter snippets based on user ID from the request
    res.json(snippets);
});

// POST /api/snippets - Save a new snippet (requires authentication in real app)
app.post('/api/snippets', (req, res) => {
    const { title, language, code, description } = req.body;
    // In a real application, you would also get the user ID from the authenticated request
    const newSnippet = {
        id: uuidv4(), // Generate a unique ID for the snippet
        title,
        language,
        code,
        description,
        createdAt: new Date().toISOString(),
        // userId: req.user.id // Example of how you might associate with a user
    };
    snippets.push(newSnippet);
    console.log('Snippet saved:', newSnippet);
    res.status(201).json({ message: 'Snippet saved successfully!', snippet: newSnippet });
});

// --- Code Execution Endpoint ---
app.post('/execute', async (req, res) => {
    const { language, code, stdin } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Code cannot be empty.' });
    }

    const uniqueId = uuidv4();
    let fileExtension, compileCommand, runCommand, sourceFilePath, executablePath;
    const filesToClean = [];

    switch (language) {
        case 'python':
            fileExtension = '.py';
            sourceFilePath = path.join(tempDir, `${uniqueId}${fileExtension}`);
            runCommand = `python "${sourceFilePath}"`;
            filesToClean.push(sourceFilePath);
            break;
        case 'javascript':
            fileExtension = '.js';
            sourceFilePath = path.join(tempDir, `${uniqueId}${fileExtension}`);
            runCommand = `node "${sourceFilePath}"`;
            filesToClean.push(sourceFilePath);
            break;
        case 'java':
            const classNameMatch = code.match(/public\s+class\s+(\w+)/);
            const className = classNameMatch ? classNameMatch[1] : 'Main';
            fileExtension = '.java';
            sourceFilePath = path.join(tempDir, `${className}${fileExtension}`);
            executablePath = path.join(tempDir, className);
            compileCommand = `javac "${sourceFilePath}"`;
            runCommand = `java -cp "${tempDir}" ${className}`;
            filesToClean.push(sourceFilePath, path.join(tempDir, `${className}.class`));
            break;
        case 'c++':
            fileExtension = '.cpp';
            sourceFilePath = path.join(tempDir, `${uniqueId}${fileExtension}`);
            executablePath = path.join(tempDir, `${uniqueId}.out`);
            compileCommand = `g++ "${sourceFilePath}" -o "${executablePath}" -std=c++14 -Wall`;
            runCommand = `"${executablePath}"`;
            filesToClean.push(sourceFilePath, executablePath);
            break;
        case 'c':
            fileExtension = '.c';
            sourceFilePath = path.join(tempDir, `${uniqueId}${fileExtension}`);
            executablePath = path.join(tempDir, `${uniqueId}.out`);
            compileCommand = `gcc "${sourceFilePath}" -o "${executablePath}" -Wall`;
            runCommand = `"${executablePath}"`;
            filesToClean.push(sourceFilePath, executablePath);
            break;
        default:
            await cleanupFiles(filesToClean);
            return res.status(400).json({ error: 'Unsupported language.' });
    }

    try {
        await fs.writeFile(sourceFilePath, code);
        console.log(`Code written to: ${sourceFilePath}`);

        let compileOutputResult = null;
        if (compileCommand) {
            console.log(`Executing compile command: ${compileCommand}`);
            const compileProcess = exec(compileCommand);
            compileOutputResult = await new Promise((resolve, reject) => {
                let stderr = '';
                compileProcess.stderr.on('data', (data) => {
                    stderr += data;
                    console.error('Compilation stderr:', data);
                });
                compileProcess.on('close', (compileCode) => {
                    console.log(`Compilation process closed with code: ${compileCode}`);
                    if (compileCode !== 0) {
                        resolve({
                            stdout: '',
                            stderr: '',
                            compile_output: stderr || `Compilation failed with exit code ${compileCode}`,
                            status: { description: 'Compilation Error' },
                            message: 'Code compilation failed.'
                        });
                    } else {
                        resolve(null); // Compilation successful
                    }
                });
                compileProcess.on('error', (err) => {
                    console.error('Compilation exec error:', err);
                    reject({ error: 'Failed to execute compile command.', details: err.message });
                });
            });

            if (compileOutputResult) {
                await cleanupFiles(filesToClean);
                return res.json(compileOutputResult);
            }
        }

        console.log(`Executing run command: ${runCommand}`);
        const { stdout, stderr, executionTime, exitCode } = await executeCode(runCommand, stdin);
        console.log(`Execution finished. Exit code: ${exitCode}`);
        console.log('Execution stdout:', stdout);
        console.error('Execution stderr:', stderr);

        let statusDesc = 'Unknown';
        if (exitCode === 0 && !stderr) {
            statusDesc = 'Accepted';
        } else if (exitCode !== 0 || stderr) {
            statusDesc = 'Runtime Error';
            if (!stderr && exitCode !== 0) {
                stderr = `Process exited with code ${exitCode}`;
            }
        } else {
            statusDesc = 'Accepted'; // Code 0 but might have stderr warnings
        }

        await cleanupFiles(filesToClean);
        res.status(200).json({
            stdout: stdout,
            stderr: stderr,
            compile_output: compileOutputResult ? compileOutputResult.compile_output : '',
            status: { description: statusDesc },
            time: executionTime ? executionTime.toFixed(3) : null,
            message: 'Execution finished.'
        });

    } catch (error) {
        console.error('Error during code execution in /execute route:', error);
        await cleanupFiles(filesToClean);
        if (error.error) {
            return res.status(500).json(error);
        } else {
            return res.status(500).json({ error: 'An unexpected error occurred.', details: error.message });
        }
    }
});

async function executeCode(command, stdinputValue) {
    return new Promise((resolve, reject) => {
        let stdout = '';
        let stderr = '';
        const startTime = process.hrtime();

        const parts = command.match(/(?:[^\s"]+|"[^"]*")+/g);
        const cmd = parts[0].replace(/"/g, '');
        const args = parts.slice(1).map(arg => arg.replace(/"/g, ''));

        console.log('Spawning process:', cmd, args);
        const runProcess = spawn(cmd, args, { shell: true });

        if (stdinputValue) {
            runProcess.stdin.write(stdinputValue);
            console.log('Writing stdin:', stdinputValue);
        }
        runProcess.stdin.end();

        const timeout = 10000;
        const timer = setTimeout(() => {
            runProcess.kill('SIGKILL');
            const endTime = process.hrtime(startTime);
            const executionTime = (endTime[0] * 1e9 + endTime[1]) / 1e9;
            resolve({ stdout: '', stderr: 'Execution timed out (10 seconds)', executionTime, exitCode: null });
        }, timeout);

        runProcess.stdout.on('data', (data) => {
            stdout += data.toString();
            console.log('Stdout data:', data.toString());
        });

        runProcess.stderr.on('data', (data) => {
            stderr += data.toString();
            console.error('Stderr data:', data.toString());
        });

        runProcess.on('close', (code) => {
            clearTimeout(timer);
            const endTime = process.hrtime(startTime);
            const executionTime = (endTime[0] * 1e9 + endTime[1]) / 1e9;
            console.log('Process closed with code:', code);
            resolve({ stdout, stderr, executionTime, exitCode: code });
        });

        runProcess.on('error', (err) => {
            clearTimeout(timer);
            console.error('Execution spawn error:', err);
            reject({ stdout: '', stderr: `Failed to start process: ${err.message}`, executionTime: 0, exitCode: null });
        });
    });
}

app.listen(port, () => {
    console.log(`CodeLearnGrow backend listening at http://localhost:${port}`);
    console.log(`Temporary code directory: ${tempDir}`);
    console.warn("--- SECURITY WARNING ---");
    console.warn("This backend executes arbitrary code and is NOT secure for production use.");
    console.warn("Use only for local development unless proper sandboxing is implemented.");
    console.warn("----------------------");
});