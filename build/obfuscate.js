/**
 * Sova Build Script - Obfuscation and Minification
 * Copyright 2025 Sova. All rights reserved.
 * PROPRIETARY AND CONFIDENTIAL
 */

const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Files to process
const htmlFiles = ['assessment-tool.html', 'chatbot.html', 'index.html'];

// Obfuscation settings - aggressive protection
const obfuscatorOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    debugProtectionInterval: 2000,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
};

// Extract JavaScript from HTML and obfuscate
function processHtmlFile(filename) {
    const filepath = path.join(__dirname, '..', filename);
    const backupPath = path.join(__dirname, '..', 'src-original', filename);

    // Create backup directory
    const backupDir = path.join(__dirname, '..', 'src-original');
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    // Read file
    let html = fs.readFileSync(filepath, 'utf8');

    // Backup original if not already backed up
    if (!fs.existsSync(backupPath)) {
        fs.writeFileSync(backupPath, html);
        console.log(`Backed up: ${filename}`);
    }

    // Find and obfuscate inline scripts
    const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
    let match;
    let processedHtml = html;

    while ((match = scriptRegex.exec(html)) !== null) {
        const originalScript = match[1];

        // Skip if script is too short or already obfuscated
        if (originalScript.trim().length < 100) continue;
        if (originalScript.includes('_0x')) continue; // Already obfuscated

        try {
            const obfuscated = JavaScriptObfuscator.obfuscate(originalScript, obfuscatorOptions);
            processedHtml = processedHtml.replace(
                `<script>${originalScript}</script>`,
                `<script>${obfuscated.getObfuscatedCode()}</script>`
            );
            console.log(`Obfuscated script in: ${filename}`);
        } catch (err) {
            console.error(`Error obfuscating ${filename}:`, err.message);
        }
    }

    // Add anti-debugging and anti-copy measures
    const antiCopyScript = `
<script>
// Anti-debugging protection
(function(){
    const threshold = 160;
    setInterval(function(){
        const start = performance.now();
        debugger;
        const end = performance.now();
        if(end - start > threshold){
            document.body.innerHTML = '<h1>Developer tools detected. Please close them to continue.</h1>';
        }
    }, 1000);
})();

// Disable text selection on sensitive content
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
});

// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Disable keyboard shortcuts for view source
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return false;
    }
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J' || e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        return false;
    }
});
</script>
`;

    // Insert anti-copy script after opening body tag
    processedHtml = processedHtml.replace('<body>', '<body>' + antiCopyScript);

    // Write processed file
    fs.writeFileSync(filepath, processedHtml);
    console.log(`Processed: ${filename}`);
}

// Add watermark comment to all files
function addWatermark(filename) {
    const filepath = path.join(__dirname, '..', filename);
    let content = fs.readFileSync(filepath, 'utf8');

    const watermark = `<!--
================================================================================
PROPRIETARY AND CONFIDENTIAL
Copyright (c) 2025 Sova Pty Ltd. All Rights Reserved.

This software and its documentation are protected by copyright law and
international treaties. Unauthorized reproduction, distribution, or use of
this software, in whole or in part, is strictly prohibited and may result
in severe civil and criminal penalties.

Protected by Australian Copyright Act 1968
Protected by Digital Millennium Copyright Act (DMCA)
Protected by international copyright treaties

Unique Build ID: ${Date.now()}-${Math.random().toString(36).substr(2, 9)}
================================================================================
-->
`;

    // Add watermark after DOCTYPE
    content = content.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n' + watermark);
    fs.writeFileSync(filepath, content);
    console.log(`Watermarked: ${filename}`);
}

// Main execution
console.log('Starting Sova protection build...');
console.log('================================');

htmlFiles.forEach(file => {
    const filepath = path.join(__dirname, '..', file);
    if (fs.existsSync(filepath)) {
        addWatermark(file);
        // Note: Full obfuscation disabled by default as it can break functionality
        // Uncomment the line below to enable full obfuscation (test thoroughly!)
        // processHtmlFile(file);
    } else {
        console.log(`File not found: ${file}`);
    }
});

console.log('================================');
console.log('Protection build complete!');
console.log('');
console.log('IMPORTANT: Test all functionality after obfuscation!');
console.log('Original files backed up to src-original/');
