/**
 * Sova Semantic Search v4.0
 * Uses OpenAI text-embedding-3-small for semantic similarity
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load knowledge base and embeddings (cached at function cold start)
let knowledgeBase = null;
let embeddings = null;
let useEmbeddings = false;

function loadKnowledgeBase() {
    if (!knowledgeBase) {
        // Try multiple paths for Netlify compatibility
        const paths = [
            path.join(__dirname, '../../sova-knowledge-base.json'),
            '/var/task/sova-knowledge-base.json',
            './sova-knowledge-base.json'
        ];

        for (const p of paths) {
            try {
                knowledgeBase = JSON.parse(fs.readFileSync(p, 'utf8'));
                console.log('Loaded KB from:', p);
                break;
            } catch (e) {
                continue;
            }
        }
    }
    return knowledgeBase;
}

function loadEmbeddings() {
    if (embeddings === null) {
        const paths = [
            path.join(__dirname, '../../sova-embeddings.json'),
            '/var/task/sova-embeddings.json',
            './sova-embeddings.json'
        ];

        for (const p of paths) {
            try {
                embeddings = JSON.parse(fs.readFileSync(p, 'utf8'));
                useEmbeddings = true;
                console.log('Loaded embeddings from:', p, '- chunks:', embeddings.chunks.length);
                break;
            } catch (e) {
                continue;
            }
        }

        if (!embeddings) {
            console.log('Embeddings not available, using keyword search');
            embeddings = false;
            useEmbeddings = false;
        }
    }
    return embeddings;
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vecA, vecB) {
    if (vecA.length !== vecB.length) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) return 0;

    return dotProduct / (normA * normB);
}

/**
 * Create query embedding using OpenAI API (text-embedding-3-small)
 */
async function createQueryEmbedding(query, apiKey) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            model: 'text-embedding-3-small',
            input: query,
        });

        const options = {
            hostname: 'api.openai.com',
            path: '/v1/embeddings',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    reject(new Error(`OpenAI API error ${res.statusCode}: ${body}`));
                    return;
                }
                try {
                    const json = JSON.parse(body);
                    resolve(json.data[0].embedding);
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

/**
 * Semantic search using embeddings
 */
async function semanticSearch(query, filters, limit, apiKey) {
    try {
        // Create query embedding
        const queryEmbedding = await createQueryEmbedding(query, apiKey);

        // Load embeddings
        const emb = loadEmbeddings();
        if (!emb || !emb.chunks) {
            throw new Error('Embeddings not loaded');
        }

        // Calculate similarity for all chunks
        const scoredChunks = emb.chunks.map(chunk => {
            const similarity = cosineSimilarity(queryEmbedding, chunk.embedding);
            return {
                text: chunk.text,
                source: chunk.source,
                section: chunk.section,
                score: similarity
            };
        });

        // Sort by score and return top results (minimum threshold 0.25)
        const topChunks = scoredChunks
            .filter(chunk => chunk.score > 0.25)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit * 2);

        // Extract relevant structured data from knowledge base based on chunk content
        const kb = loadKnowledgeBase();
        const matchedText = topChunks.map(c => c.text).join(' ').toLowerCase();
        const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);

        // Helper to score items by presence in semantic results + query keywords
        const scoreItem = (text) => {
            if (!text) return 0;
            const lower = text.toLowerCase();
            let score = 0;
            if (matchedText.includes(lower.slice(0, 40))) score += 3;
            queryWords.forEach(word => {
                if (lower.includes(word)) score += 1;
            });
            return score;
        };

        // Score tools
        const tools = (kb.tools || [])
            .filter(tool => tool.url && tool.url !== 'null' && !tool.url.includes('d.docs.live.net'))
            .map(tool => {
                const score = scoreItem(tool.name) + scoreItem(tool.description);
                return score > 0 ? { ...tool, score } : null;
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);

        // Score quotes
        const quotes = (kb.quotes || [])
            .map(quote => {
                const score = scoreItem(quote.quote) + scoreItem(quote.source);
                return score > 0 ? { ...quote, score } : null;
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);

        // Score directory
        const directory = (kb.directory || [])
            .map(entry => {
                const score = scoreItem(entry.name) + scoreItem(entry.description) + scoreItem(entry.category);
                return score > 0 ? { ...entry, score } : null;
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);

        return {
            quotes,
            tools,
            directory,
            context: topChunks.slice(0, limit)
        };

    } catch (error) {
        console.error('Semantic search error:', error);
        throw error;
    }
}

/**
 * Keyword-based search (fallback)
 */
function keywordSearch(query, filters, limit) {
    const kb = loadKnowledgeBase();
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 3);

    // Score quotes
    const scoredQuotes = (kb.quotes || []).map(quote => {
        let score = 0;

        if (filters.element && quote.element === filters.element) {
            score += 30;
        }

        const quoteText = quote.quote.toLowerCase();
        for (const word of queryWords) {
            if (quoteText.includes(word)) {
                score += 5;
            }
        }

        return { ...quote, score };
    });

    // Score tools
    const scoredTools = (kb.tools || [])
        .filter(tool => tool.url && tool.url !== 'null' && !tool.url.includes('d.docs.live.net'))
        .map(tool => {
            let score = 0;

            if (filters.element && tool.element === filters.element) {
                score += 50;
            }

            const toolText = `${tool.name} ${tool.description || ''}`.toLowerCase();
            for (const word of queryWords) {
                if (toolText.includes(word)) {
                    score += 5;
                }
            }

            return { ...tool, score };
        });

    // Score directory
    const scoredDirectory = (kb.directory || []).map(entry => {
        let score = 0;

        const entryText = `${entry.name} ${entry.description || ''} ${entry.category || ''}`.toLowerCase();
        for (const word of queryWords) {
            if (entryText.includes(word)) {
                score += 5;
            }
        }

        return { ...entry, score };
    });

    return {
        quotes: scoredQuotes.filter(q => q.score > 0).sort((a, b) => b.score - a.score).slice(0, limit),
        tools: scoredTools.filter(t => t.score > 0).sort((a, b) => b.score - a.score).slice(0, limit),
        directory: scoredDirectory.filter(d => d.score > 0).sort((a, b) => b.score - a.score).slice(0, limit),
        context: []
    };
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

        // Try embeddings-based search first
        let results;
        let searchMethod = 'keyword';

        const apiKey = process.env.OPENAI_API_KEY;

        if (apiKey && (useEmbeddings || loadEmbeddings())) {
            try {
                results = await semanticSearch(query, filters, limit, apiKey);
                searchMethod = 'semantic';
                console.log(`[Semantic] Found ${results.context?.length || 0} chunks, ${results.tools?.length || 0} tools`);
            } catch (error) {
                console.error('Semantic search failed, falling back to keyword:', error.message);
                results = keywordSearch(query, filters, limit);
            }
        } else {
            console.log('[Search] Using keyword search (no API key or embeddings)');
            results = keywordSearch(query, filters, limit);
        }

        // Format context for system prompt
        let formatted = '';
        if (results.context && results.context.length > 0) {
            formatted += '\n**RELEVANT CONTEXT:**\n';
            results.context.forEach(chunk => {
                formatted += `[From ${chunk.source}${chunk.section ? ` > ${chunk.section}` : ''}]\n`;
                formatted += `${chunk.text.slice(0, 600)}${chunk.text.length > 600 ? '...' : ''}\n\n`;
            });
        }
        if (results.tools && results.tools.length > 0) {
            formatted += '\n**AVAILABLE TOOLS:**\n';
            results.tools.forEach(tool => {
                formatted += `[${tool.name}](${tool.url}) - ${tool.description || ''}\n`;
            });
        }
        if (results.quotes && results.quotes.length > 0) {
            formatted += '\n**RESEARCH:**\n';
            results.quotes.forEach(quote => {
                formatted += `- *"${quote.quote}"*`;
                if (quote.source && quote.url) {
                    formatted += ` ([${quote.source}](${quote.url}))`;
                } else if (quote.source) {
                    formatted += ` (${quote.source})`;
                }
                formatted += '\n';
            });
        }
        if (results.directory && results.directory.length > 0) {
            formatted += '\n**AUSTRALIAN RESOURCES:**\n';
            results.directory.forEach(entry => {
                formatted += `[${entry.name}](${entry.url}) - ${entry.description || ''}\n`;
            });
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                ...results,
                formatted,
                meta: {
                    query,
                    filters,
                    searchMethod,
                    returned: {
                        context: results.context?.length || 0,
                        quotes: results.quotes?.length || 0,
                        tools: results.tools?.length || 0,
                        directory: results.directory?.length || 0
                    }
                }
            })
        };

    } catch (error) {
        console.error('Search error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Server error' })
        };
    }
};
