/**
 * Simple Keyword-Based Knowledge Base Search
 * No semantic embeddings, no API calls - just good old keyword matching
 */

async function loadKnowledgeBase() {
    try {
        const response = await fetch('sova-knowledge-base.json');
        return await response.json();
    } catch (error) {
        console.error('Failed to load knowledge base:', error);
        return null;
    }
}

/**
 * Simple keyword search across knowledge base
 * Returns relevant tools, quotes, and directory entries
 */
function searchKnowledgeBase(query, knowledgeBase, limit = 5) {
    if (!knowledgeBase || !query) {
        return { tools: [], quotes: [], directory: [] };
    }

    const keywords = query.toLowerCase().split(/\s+/);

    // Score each item based on keyword matches
    const scoreItem = (text, boost = 1) => {
        if (!text) return 0;  // Handle undefined/null/empty text
        const lowerText = text.toLowerCase();
        let score = 0;

        keywords.forEach(keyword => {
            if (lowerText.includes(keyword)) {
                // Exact word match scores higher
                const wordBoundaryRegex = new RegExp(`\\b${keyword}\\b`, 'i');
                if (wordBoundaryRegex.test(text)) {
                    score += 2 * boost;
                } else {
                    score += 1 * boost;
                }
            }
        });

        return score;
    };

    // Search tools
    const tools = (knowledgeBase.tools || []).map(tool => ({
        ...tool,
        score: scoreItem(tool.name, 3) + scoreItem(tool.description, 2) + scoreItem(tool.element || '', 1)
    })).filter(tool => tool.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    // Search quotes
    const quotes = (knowledgeBase.quotes || []).map(quote => ({
        ...quote,
        score: scoreItem(quote.quote, 2) + scoreItem(quote.element || '', 1) + scoreItem(quote.source || '', 1)
    })).filter(quote => quote.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    // Search directory (includes need field for better matching)
    const directory = (knowledgeBase.directory || []).map(entry => ({
        ...entry,
        score: scoreItem(entry.name, 3) +
               scoreItem(entry.description || '', 2) +
               scoreItem(entry.category || '', 1) +
               scoreItem(entry.need || '', 2)  // Search the need field (Funding, Advice, etc.)
    })).filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return { tools, quotes, directory };
}

/**
 * Format search results for display
 */
function formatSearchResults(results) {
    const { tools, quotes, directory } = results;
    let formatted = '';

    if (tools.length > 0) {
        formatted += '\n**RELEVANT TOOLS:**\n';
        tools.forEach(tool => {
            formatted += `- **${tool.name}**: ${tool.description}`;
            if (tool.url) {
                formatted += ` [Learn more](${tool.url})`;
            }
            formatted += '\n';
        });
    }

    if (quotes.length > 0) {
        formatted += '\n**RESEARCH:**\n';
        quotes.forEach(quote => {
            // Format quote in italics
            formatted += `- *"${quote.quote}"*`;
            // Add source as hyperlink if URL exists, otherwise just show source name
            if (quote.source && quote.url) {
                formatted += ` ([${quote.source}](${quote.url}))`;
            } else if (quote.source) {
                formatted += ` (${quote.source})`;
            }
            formatted += '\n';
        });
    }

    if (directory.length > 0) {
        formatted += '\n**AUSTRALIAN RESOURCES:**\n';
        directory.forEach(entry => {
            formatted += `- **${entry.name}**: ${entry.description || ''}`;
            if (entry.url) {
                formatted += ` [Visit](${entry.url})`;
            }
            formatted += '\n';
        });
    }

    return formatted;
}
