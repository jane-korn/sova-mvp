/**
 * Sova Semantic Search v2.0
 * Retrieves relevant tools/quotes from knowledge base
 * Phase 1: Keyword + filter matching (simple, fast)
 * Phase 2: Embeddings-based semantic search (upgrade later)
 */

const fs = require('fs');
const path = require('path');

// Load knowledge base (cached at function cold start)
let knowledgeBase = null;

function loadKnowledgeBase() {
    if (!knowledgeBase) {
        const kbPath = path.join(__dirname, '..', '..', 'sova-knowledge-base.json');
        const raw = fs.readFileSync(kbPath, 'utf8');
        knowledgeBase = JSON.parse(raw);
    }
    return knowledgeBase;
}

/**
 * Score a tool's relevance to the query
 */
function scoreToolRelevance(tool, query, filters) {
    let score = 0;
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 3);  // Filter short words

    // 1. Element match (highest priority)
    if (filters.element && tool.element === filters.element) {
        score += 50;
    }

    // 2. Name/description keyword match
    const toolText = `${tool.name} ${tool.description || ''} ${tool.sovaContext || ''}`.toLowerCase();

    // Exact phrase match in name
    if (tool.name.toLowerCase().includes(queryLower)) {
        score += 30;
    }

    // Keyword matches in tool text
    for (const word of queryWords) {
        if (toolText.includes(word)) {
            score += 5;
        }
    }

    // 3. Stage appropriateness (medium priority)
    // Note: Most tools don't have explicit stage tags yet, so this is future enhancement
    // For now, certain tools are known to be stage-specific
    if (filters.stage) {
        const stageKeywords = {
            Discovery: ['lean canvas', 'customer interview', 'mom test', 'assumption', 'validation', 'mvp'],
            Validation: ['metrics', 'analytics', 'test', 'experiment', 'pivot', 'okr'],
            Efficiency: ['process', 'automation', 'efficiency', 'optimization', 'kanban', 'workflow'],
            Scale: ['governance', 'delegation', 'system', 'framework', 'structure', 'policy']
        };

        const stageWords = stageKeywords[filters.stage] || [];
        for (const word of stageWords) {
            if (toolText.includes(word)) {
                score += 3;
            }
        }
    }

    // 4. Intent match (if provided)
    if (filters.intent) {
        const intentKeywords = {
            cash_flow_problem: ['cash', 'finance', 'budget', 'forecast', 'runway', 'pricing'],
            customer_acquisition: ['customer', 'marketing', 'sales', 'acquisition', 'value proposition', 'segment'],
            strategic_clarity: ['strategy', 'lean canvas', 'business model', 'swot', 'vision', 'mission'],
            team_performance: ['team', 'people', 'culture', 'hire', 'raci', 'role', 'accountability']
        };

        const intentWords = intentKeywords[filters.intent] || [];
        for (const word of intentWords) {
            if (toolText.includes(word)) {
                score += 4;
            }
        }
    }

    // 5. Bonus for having URL (complete/actionable tool)
    if (tool.url && tool.url.trim()) {
        score += 2;
    }

    return score;
}

/**
 * Score a quote's relevance to the query
 */
function scoreQuoteRelevance(quote, query, filters) {
    let score = 0;
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 3);

    // Element match
    if (filters.element && quote.element === filters.element) {
        score += 30;
    }

    // Keyword matches
    const quoteText = quote.quote.toLowerCase();
    for (const word of queryWords) {
        if (quoteText.includes(word)) {
            score += 5;
        }
    }

    // Intent match
    if (filters.intent) {
        const intentKeywords = {
            cash_flow_problem: ['cash', 'money', 'fund', 'finance', 'runway'],
            customer_acquisition: ['customer', 'market', 'product-market fit', 'demand'],
            strategic_clarity: ['strategy', 'direction', 'focus', 'pivot'],
            team_performance: ['team', 'founder', 'people', 'conflict']
        };

        const intentWords = intentKeywords[filters.intent] || [];
        for (const word of intentWords) {
            if (quoteText.includes(word)) {
                score += 4;
            }
        }
    }

    // Bonus for having URL
    if (quote.url && quote.url.trim()) {
        score += 2;
    }

    return score;
}

/**
 * Score directory entry relevance
 */
function scoreDirectoryRelevance(entry, query, filters) {
    let score = 0;
    const queryLower = query.toLowerCase();

    // Need type matching
    const needKeywords = {
        Funding: ['fund', 'money', 'grant', 'invest', 'capital', 'cash'],
        Programs: ['program', 'accelerator', 'incubator', 'mentor', 'support'],
        Advice: ['advice', 'legal', 'help', 'consult', 'guidance'],
        Connections: ['network', 'connect', 'community', 'event', 'peer']
    };

    const entryNeedWords = needKeywords[entry.need] || [];
    for (const word of entryNeedWords) {
        if (queryLower.includes(word)) {
            score += 10;
        }
    }

    // Stage matching
    if (filters.stage && entry.stage && entry.stage.includes(filters.stage)) {
        score += 15;
    }

    // Description matching
    if (entry.description) {
        const descLower = entry.description.toLowerCase();
        const queryWords = queryLower.split(/\s+/).filter(w => w.length > 3);
        for (const word of queryWords) {
            if (descLower.includes(word)) {
                score += 3;
            }
        }
    }

    return score;
}

/**
 * Main handler
 */
exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { query, filters = {}, limit = 5 } = JSON.parse(event.body);

        if (!query || typeof query !== 'string') {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Query is required' })
            };
        }

        const kb = loadKnowledgeBase();

        // Score and rank tools
        const toolsWithScores = (kb.tools || []).map(tool => ({
            ...tool,
            relevanceScore: scoreToolRelevance(tool, query, filters)
        }));

        // Filter out tools with score 0 and sort by score
        const rankedTools = toolsWithScores
            .filter(t => t.relevanceScore > 0)
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, limit);

        // Score and rank quotes (limit to 3 max)
        const quotesWithScores = (kb.failureQuotes || []).map(quote => ({
            ...quote,
            relevanceScore: scoreQuoteRelevance(quote, query, filters)
        }));

        const rankedQuotes = quotesWithScores
            .filter(q => q.relevanceScore > 0)
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, 3);

        // Score and rank directory entries (only if query mentions funding/programs/etc)
        let rankedDirectory = [];
        const queryLower = query.toLowerCase();
        if (/fund|grant|program|accelerator|advice|legal|network|community/.test(queryLower)) {
            const directoryWithScores = (kb.directory || []).map(entry => ({
                ...entry,
                relevanceScore: scoreDirectoryRelevance(entry, query, filters)
            }));

            rankedDirectory = directoryWithScores
                .filter(d => d.relevanceScore > 0)
                .sort((a, b) => b.relevanceScore - a.relevanceScore)
                .slice(0, 3);
        }

        // Remove relevanceScore from returned objects (internal use only)
        const cleanTools = rankedTools.map(({relevanceScore, ...tool}) => tool);
        const cleanQuotes = rankedQuotes.map(({relevanceScore, ...quote}) => quote);
        const cleanDirectory = rankedDirectory.map(({relevanceScore, ...entry}) => entry);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                tools: cleanTools,
                quotes: cleanQuotes,
                directory: cleanDirectory,
                meta: {
                    query,
                    filters,
                    totalTools: kb.tools?.length || 0,
                    totalQuotes: kb.failureQuotes?.length || 0,
                    totalDirectory: kb.directory?.length || 0,
                    returned: {
                        tools: cleanTools.length,
                        quotes: cleanQuotes.length,
                        directory: cleanDirectory.length
                    }
                }
            })
        };

    } catch (error) {
        console.error('Semantic search error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Server error' })
        };
    }
};
