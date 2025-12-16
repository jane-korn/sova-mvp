#!/usr/bin/env node
/**
 * Local Testing Server for Sova Chatbot
 * Run chatbot locally without Netlify costs
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load environment variables from .env if available
try {
    const dotenv = fs.readFileSync('.env', 'utf8');
    dotenv.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
        }
    });
} catch (e) {
    console.log('ℹ️  No .env file found, using environment variables');
}

const PORT = process.env.PORT || 3000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Simulate Netlify Functions
async function handleChatFunction(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            try {
                const chatFunction = require('./netlify/functions/chat.js');
                const result = await chatFunction.handler({
                    httpMethod: 'POST',
                    headers: req.headers,
                    body: body
                });

                resolve({
                    statusCode: result.statusCode,
                    headers: result.headers || { 'Content-Type': 'application/json' },
                    body: result.body
                });
            } catch (error) {
                console.error('Chat function error:', error);
                resolve({
                    statusCode: 500,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ error: error.message })
                });
            }
        });
    });
}

async function handleClaudeChatFunction(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            try {
                const claudeChatFunction = require('./netlify/functions/claude-chat.js');
                const result = await claudeChatFunction.handler({
                    httpMethod: 'POST',
                    headers: req.headers,
                    body: body
                });

                resolve({
                    statusCode: result.statusCode,
                    headers: result.headers || { 'Content-Type': 'application/json' },
                    body: result.body
                });
            } catch (error) {
                console.error('Claude chat function error:', error);
                resolve({
                    statusCode: 500,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ error: error.message })
                });
            }
        });
    });
}

async function handleSemanticSearchFunction(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            try {
                const searchFunction = require('./netlify/functions/semantic-search.js');
                const result = await searchFunction.handler({
                    httpMethod: 'POST',
                    headers: req.headers,
                    body: body
                });

                resolve({
                    statusCode: result.statusCode,
                    headers: result.headers || { 'Content-Type': 'application/json' },
                    body: result.body
                });
            } catch (error) {
                console.error('Search function error:', error);
                resolve({
                    statusCode: 500,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ error: error.message })
                });
            }
        });
    });
}

async function handleFetchWebsiteFunction(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            try {
                const fetchFunction = require('./netlify/functions/fetch-website.js');
                const result = await fetchFunction.handler({
                    httpMethod: 'POST',
                    headers: req.headers,
                    body: body
                });

                resolve({
                    statusCode: result.statusCode,
                    headers: result.headers || { 'Content-Type': 'application/json' },
                    body: result.body
                });
            } catch (error) {
                console.error('Fetch website error:', error);
                resolve({
                    statusCode: 500,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ error: error.message })
                });
            }
        });
    });
}

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle Netlify Functions locally
    if (pathname === '/.netlify/functions/chat') {
        console.log('📨 Chat request (Gemini)');
        const result = await handleChatFunction(req);
        res.writeHead(result.statusCode, result.headers);
        res.end(result.body);
        return;
    }

    if (pathname === '/.netlify/functions/claude-chat') {
        console.log('🤖 Chat request (Claude)');
        const result = await handleClaudeChatFunction(req);
        res.writeHead(result.statusCode, result.headers);
        res.end(result.body);
        return;
    }

    if (pathname === '/.netlify/functions/semantic-search') {
        console.log('🔍 Search request');
        const result = await handleSemanticSearchFunction(req);
        res.writeHead(result.statusCode, result.headers);
        res.end(result.body);
        return;
    }

    if (pathname === '/.netlify/functions/fetch-website') {
        console.log('🌐 Fetch website request');
        const result = await handleFetchWebsiteFunction(req);
        res.writeHead(result.statusCode, result.headers);
        res.end(result.body);
        return;
    }

    // Serve static files
    if (pathname === '/') {
        pathname = '/chatbot-simple.html';
    }

    const filePath = path.join(__dirname, pathname);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error');
            }
        } else {
            const ext = path.extname(filePath);
            const contentType = mimeTypes[ext] || 'text/plain';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('🦉 Sova Local Development Server');
    console.log(`📡 Running on: http://localhost:${PORT}`);
    console.log(`🔑 Using API key: ${process.env.GEMINI_API_KEY ? '✓ Set' : '✗ Not set'}`);

    if (!process.env.GEMINI_API_KEY) {
        console.log();
        console.log('⚠️  WARNING: API key not set!');
        console.log('   Set it with: export GEMINI_API_KEY="your-key-here"');
        console.log('   Or add to .env file');
        console.log();
    }

    console.log(`📁 Serving from: ${__dirname}`);
    console.log();
    console.log('💡 Testing locally - no Netlify costs!');
    console.log('   Open: http://localhost:3000');
    console.log('   Press Ctrl+C to stop');
    console.log();
});
