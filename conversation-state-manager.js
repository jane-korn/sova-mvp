/**
 * Sova Conversation State Manager v2.0
 * Manages multi-turn conversation state, slot filling, and phase transitions
 */

class ConversationStateManager {
    constructor() {
        this.state = this.initialiseState();
        this.loadFromStorage();
    }

    /**
     * Create initial conversation state
     */
    initialiseState() {
        return {
            sessionId: this.generateSessionId(),
            currentIntent: null,
            conversationFlow: null,
            conversationPhase: 'greeting',  // greeting → discovery → diagnosis → recommendation → followup
            slotsFilled: {
                startup_stage: null,  // Discovery | Validation | Efficiency | Scale
                team_size: null,  // solo | team
                symptom_element: null,  // Governance | Purpose | Strategy | Marketing | ...
                attempted_solutions: [],
                element_context: null,  // Additional context about what element they're discussing
                root_cause_element: null,  // Identified root cause element (may differ from symptom)
                pain_point: null  // User's stated problem
            },
            turnCount: 0,
            conversationHistory: [],
            lastRetrievedTools: [],
            lastRetrievedQuotes: [],
            fallbackCount: 0,  // Track consecutive fallbacks for escalation
            lastIntentConfidence: 1.0,
            metadata: {
                sessionStart: new Date().toISOString(),
                lastActivity: new Date().toISOString(),
                phaseTransitions: []
            }
        };
    }

    /**
     * Generate unique session ID
     */
    generateSessionId() {
        return `sova_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Update conversation state with new intent classification
     */
    updateIntent(intent, confidence, flow) {
        this.state.currentIntent = intent;
        this.state.conversationFlow = flow;
        this.state.lastIntentConfidence = confidence;

        // Reset fallback count on successful intent classification
        if (confidence > 0.5) {
            this.state.fallbackCount = 0;
        }

        this.saveToStorage();
    }

    /**
     * Transition to new conversation phase
     */
    transitionPhase(newPhase) {
        const oldPhase = this.state.conversationPhase;
        this.state.conversationPhase = newPhase;

        // Track phase transition
        this.state.metadata.phaseTransitions.push({
            from: oldPhase,
            to: newPhase,
            timestamp: new Date().toISOString(),
            turn: this.state.turnCount
        });

        this.saveToStorage();
    }

    /**
     * Fill a slot with extracted value
     */
    fillSlot(slotName, value) {
        if (slotName in this.state.slotsFilled) {
            // Special handling for arrays (attempted_solutions)
            if (Array.isArray(this.state.slotsFilled[slotName])) {
                if (!this.state.slotsFilled[slotName].includes(value)) {
                    this.state.slotsFilled[slotName].push(value);
                }
            } else {
                this.state.slotsFilled[slotName] = value;
            }
            this.saveToStorage();
            return true;
        }
        return false;
    }

    /**
     * Check if required slots are filled for current phase
     */
    areRequiredSlotsFilled(requiredSlots) {
        for (const slot of requiredSlots) {
            const value = this.state.slotsFilled[slot];
            if (value === null || value === undefined ||
                (Array.isArray(value) && value.length === 0)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get all filled slots
     */
    getFilledSlots() {
        const filled = {};
        for (const [key, value] of Object.entries(this.state.slotsFilled)) {
            if (value !== null && value !== undefined &&
                !(Array.isArray(value) && value.length === 0)) {
                filled[key] = value;
            }
        }
        return filled;
    }

    /**
     * Add message to conversation history
     */
    addMessage(role, content, metadata = {}) {
        this.state.conversationHistory.push({
            role,
            content,
            timestamp: new Date().toISOString(),
            turn: this.state.turnCount,
            ...metadata
        });

        if (role === 'user') {
            this.state.turnCount++;
        }

        this.state.metadata.lastActivity = new Date().toISOString();
        this.saveToStorage();
    }

    /**
     * Store retrieved tools from semantic search
     */
    storeRetrievedTools(tools, quotes = []) {
        this.state.lastRetrievedTools = tools || [];
        this.state.lastRetrievedQuotes = quotes || [];
        this.saveToStorage();
    }

    /**
     * Increment fallback counter (for escalation logic)
     */
    incrementFallback() {
        this.state.fallbackCount++;
        this.saveToStorage();
        return this.state.fallbackCount;
    }

    /**
     * Reset fallback counter
     */
    resetFallback() {
        this.state.fallbackCount = 0;
        this.saveToStorage();
    }

    /**
     * Check if we should escalate to assessment
     */
    shouldEscalateToAssessment() {
        return this.state.fallbackCount >= 3 ||
               this.state.turnCount >= 12;  // Too many turns without resolution
    }

    /**
     * Get current state snapshot
     */
    getState() {
        return {...this.state};
    }

    /**
     * Get conversation summary for context injection
     */
    getConversationSummary() {
        const filled = this.getFilledSlots();
        const summary = [];

        if (filled.startup_stage) {
            summary.push(`Stage: ${filled.startup_stage}`);
        }
        if (filled.team_size) {
            summary.push(`Team: ${filled.team_size}`);
        }
        if (filled.symptom_element) {
            summary.push(`Element: ${filled.symptom_element}`);
        }
        if (filled.pain_point) {
            summary.push(`Pain point: ${filled.pain_point}`);
        }
        if (filled.root_cause_element && filled.root_cause_element !== filled.symptom_element) {
            summary.push(`Root cause likely in: ${filled.root_cause_element}`);
        }

        return summary.join(' | ');
    }

    /**
     * Save state to sessionStorage
     */
    saveToStorage() {
        try {
            sessionStorage.setItem('sova_conversation_state', JSON.stringify(this.state));
        } catch (e) {
            console.warn('Failed to save conversation state:', e);
        }
    }

    /**
     * Load state from sessionStorage
     */
    loadFromStorage() {
        try {
            const stored = sessionStorage.getItem('sova_conversation_state');
            if (stored) {
                const parsed = JSON.parse(stored);
                // Only load if session is < 24 hours old
                const sessionAge = Date.now() - new Date(parsed.metadata.sessionStart).getTime();
                if (sessionAge < 24 * 60 * 60 * 1000) {
                    this.state = parsed;
                }
            }
        } catch (e) {
            console.warn('Failed to load conversation state:', e);
        }
    }

    /**
     * Clear conversation state (start fresh)
     */
    reset() {
        this.state = this.initialiseState();
        this.saveToStorage();
    }

    /**
     * Get formatted state for debugging
     */
    debug() {
        return {
            phase: this.state.conversationPhase,
            intent: this.state.currentIntent,
            flow: this.state.conversationFlow,
            turns: this.state.turnCount,
            confidence: this.state.lastIntentConfidence,
            fallbackCount: this.state.fallbackCount,
            slotsFilled: this.getFilledSlots(),
            phaseHistory: this.state.metadata.phaseTransitions.map(t => `${t.from}→${t.to} (turn ${t.turn})`).join(', ')
        };
    }
}

// Export for use in chatbot
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConversationStateManager;
}
