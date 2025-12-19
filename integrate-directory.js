#!/usr/bin/env node
/**
 * Integrate directory data into knowledge base
 */

const fs = require('fs');
const path = require('path');

// Load knowledge base
const kbPath = path.join(__dirname, 'sova-knowledge-base.json');
const knowledgeBase = JSON.parse(fs.readFileSync(kbPath, 'utf8'));

// Load directory data
const { directoryData } = require('./directory-data.js');

// Add directory to knowledge base
knowledgeBase.directory = directoryData;

// Update metadata
if (!knowledgeBase.metadata) {
    knowledgeBase.metadata = {};
}
knowledgeBase.metadata.directory_count = directoryData.length;
knowledgeBase.metadata.last_updated = new Date().toISOString();
knowledgeBase.metadata.directory_integrated = true;

// Save updated knowledge base
fs.writeFileSync(kbPath, JSON.stringify(knowledgeBase, null, 2), 'utf8');

console.log(`✓ Integrated ${directoryData.length} directory entries into knowledge base`);
console.log(`✓ Knowledge base updated: ${kbPath}`);
console.log('\nDirectory breakdown:');
const categories = {};
directoryData.forEach(entry => {
    categories[entry.category] = (categories[entry.category] || 0) + 1;
});
Object.entries(categories).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
});
