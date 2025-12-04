const fs = require('fs');

// Load the directory data module
const { directoryData, filterOptions } = require('./directory-data.js');

// Load existing knowledge base
const kb = JSON.parse(fs.readFileSync('sova-knowledge-base.json', 'utf8'));

// Add directory to knowledge base
kb.directory = directoryData;
kb.directoryFilters = filterOptions;

// Save updated knowledge base
fs.writeFileSync('sova-knowledge-base.json', JSON.stringify(kb, null, 2));

console.log(`✓ Added ${directoryData.length} directory entries to knowledge base`);

// Show breakdown
const categories = {};
const needs = {};
const states = {};

directoryData.forEach(entry => {
    categories[entry.category] = (categories[entry.category] || 0) + 1;
    needs[entry.need] = (needs[entry.need] || 0) + 1;
    states[entry.state] = (states[entry.state] || 0) + 1;
});

console.log('\nDirectory breakdown:');
console.log('By category:', categories);
console.log('By need:', needs);
console.log('By state:', states);
console.log(`\nTotal file size: ${(fs.statSync('sova-knowledge-base.json').size / 1024).toFixed(1)} KB`);
