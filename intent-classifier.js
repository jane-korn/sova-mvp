/**
 * Sova Intent Classifier v2.0
 * Simple keyword-based intent classification
 * Upgrade to ML-based classification in Phase 2
 */

class IntentClassifier {
    constructor() {
        // Intent patterns with keywords and weights
        this.patterns = {
            cash_flow_problem: {
                keywords: [
                    'cash', 'money', 'fund', 'funding', 'financial', 'runway',
                    'burn rate', 'broke', 'budget', 'investment', 'investor',
                    'capital', 'finance', 'afford', 'expensive', 'cost'
                ],
                weight: 1.0
            },

            customer_acquisition: {
                keywords: [
                    'customer', 'client', 'marketing', 'sales', 'selling',
                    'acquisition', 'churn', 'retention', 'growth', 'user',
                    'traffic', 'conversion', 'lead', 'prospect', 'buyer',
                    'market', 'audience', 'segment', 'revenue'
                ],
                weight: 1.0
            },

            strategic_clarity: {
                keywords: [
                    'strategy', 'direction', 'pivot', 'position', 'positioning',
                    'competitive', 'unclear', 'confused', 'lost', 'focus',
                    'priority', 'goal', 'vision', 'mission', 'purpose',
                    'differentiation', 'value proposition', 'model'
                ],
                weight: 1.0
            },

            team_performance: {
                keywords: [
                    'team', 'hire', 'hiring', 'culture', 'perform', 'performance',
                    'employee', 'staff', 'conflict', 'turnover', 'morale',
                    'leadership', 'manage', 'management', 'people', 'co-founder',
                    'partner', 'collaboration', 'communication'
                ],
                weight: 1.0
            },

            tool_lookup: {
                keywords: [
                    'tool', 'framework', 'canvas', 'method', 'methodology',
                    'template', 'model', 'technique', 'approach', 'process',
                    'lean canvas', 'business model', 'swot', 'okr'
                ],
                weight: 0.8  // Lower weight - only if clearly asking for a tool
            },

            governance: {
                keywords: [
                    'governance', 'structure', 'role', 'responsibility', 'accountability',
                    'decision', 'authority', 'board', 'shareholder', 'agreement',
                    'legal', 'compliance', 'abn', 'pty ltd', 'company'
                ],
                weight: 1.0
            },

            assessment_request: {
                keywords: [
                    'assessment', 'evaluate', 'check', 'audit', 'review',
                    'gap', 'health check', 'diagnostic', 'analyse', 'assess'
                ],
                weight: 0.9
            }
        };
    }

    /**
     * Classify user message into primary intent
     * @param {string} message - User's message
     * @returns {object} - {intent: string, confidence: number, scores: object}
     */
    classify(message) {
        const normalised = message.toLowerCase();
        const scores = {};

        // Calculate score for each intent
        for (const [intent, pattern] of Object.entries(this.patterns)) {
            let score = 0;
            let matches = 0;

            for (const keyword of pattern.keywords) {
                if (normalised.includes(keyword)) {
                    // Exact word boundary match gets higher score
                    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
                    if (regex.test(normalised)) {
                        score += 2 * pattern.weight;
                        matches++;
                    } else {
                        score += 1 * pattern.weight;
                        matches++;
                    }
                }
            }

            scores[intent] = {score, matches};
        }

        // Find highest scoring intent
        let topIntent = 'general_inquiry';
        let topScore = 0;
        let totalMatches = 0;

        for (const [intent, data] of Object.entries(scores)) {
            if (data.score > topScore) {
                topScore = data.score;
                topIntent = intent;
                totalMatches = data.matches;
            }
        }

        // Calculate confidence (0-1 scale)
        // Confidence based on:
        // - Number of keyword matches
        // - Score magnitude
        // - Difference from second-highest intent
        let confidence = 0;

        if (topScore > 0) {
            // Base confidence on score (normalize by typical maximum)
            confidence = Math.min(topScore / 10, 1.0);

            // Boost confidence if multiple keywords matched
            if (totalMatches >= 2) {
                confidence = Math.min(confidence * 1.2, 1.0);
            }
            if (totalMatches >= 3) {
                confidence = Math.min(confidence * 1.3, 1.0);
            }

            // Reduce confidence if score is low
            if (topScore < 2) {
                confidence *= 0.5;
            }
        }

        // If confidence is too low, default to general_inquiry
        if (confidence < 0.3) {
            topIntent = 'general_inquiry';
            confidence = 0.3;
        }

        return {
            intent: topIntent,
            confidence: Math.round(confidence * 100) / 100,  // Round to 2 decimals
            scores: scores,
            debug: {
                message: message,
                topScore: topScore,
                matches: totalMatches
            }
        };
    }

    /**
     * Get conversation flow for an intent
     * @param {string} intent - Intent name
     * @returns {string} - Flow identifier
     */
    getConversationFlow(intent) {
        const flowMap = {
            'cash_flow_problem': 'cash_flow_diagnosis',
            'customer_acquisition': 'customer_acquisition_diagnosis',
            'strategic_clarity': 'strategic_clarity_diagnosis',
            'team_performance': 'team_performance_diagnosis',
            'governance': 'governance_diagnosis',
            'tool_lookup': 'direct_tool_recommendation',
            'assessment_request': 'assessment_referral',
            'general_inquiry': 'general_conversation'
        };

        return flowMap[intent] || 'general_conversation';
    }
}

// Export for use in chatbot
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntentClassifier;
}
