# Sova Chatbot v2.0 - Architecture Documentation

**Date:** 2025-12-10
**Status:** Rebuild from v1.0 (beta)

---

## EXECUTIVE SUMMARY

Complete rebuild of Sova chatbot with proper conversational AI architecture.

**Key Changes from v1.0:**
- Semantic retrieval (not knowledge dump)
- Intent classification (structured conversation flow)
- State management (multi-turn context)
- Clean system prompt (50 lines vs 280 lines)
- Fallback hierarchy (graceful degradation)

---

## ARCHITECTURE OVERVIEW

```
User Message
    ↓
Intent Classification (client-side, simple keyword matching)
    ↓
Conversation State Manager (tracks: intent, phase, slots, stage)
    ↓
Semantic Search (Netlify Function: retrieves top 3-5 tools from knowledge base)
    ↓
System Prompt (50 lines) + Retrieved Context (3-5 tools) + Conversation History
    ↓
Gemini API (via Netlify proxy)
    ↓
Response Formatter (applies conversation flow templates)
    ↓
UI Update + State Update
```

---

## COMPONENTS

### 1. Intent Classification (client-side)

**Purpose:** Identify user intent to route to appropriate conversation flow

**5 Core Intents:**
1. `cash_flow_problem` - Cash flow, funding, financial issues
2. `customer_acquisition` - Getting customers, marketing, sales
3. `strategic_clarity` - Strategy, positioning, direction, pivoting
4. `team_performance` - Team issues, hiring, culture, leadership
5. `tool_lookup` - Simple tool request (no complex diagnosis needed)

**Default:** `general_inquiry` - Fallback for unclassified

**Method:** Simple keyword matching (upgrade to ML later)

**Example:**
```javascript
function classifyIntent(message) {
  const msg = message.toLowerCase();

  if (/cash|money|fund|financial|runway|burn rate/.test(msg)) {
    return 'cash_flow_problem';
  }
  if (/customer|client|marketing|sales|acquisition|churn/.test(msg)) {
    return 'customer_acquisition';
  }
  if (/strategy|direction|pivot|position|competitive|unclear/.test(msg)) {
    return 'strategic_clarity';
  }
  if (/team|hire|culture|perform|employee|conflict/.test(msg)) {
    return 'team_performance';
  }
  if (/tool|framework|canvas|method|template/.test(msg)) {
    return 'tool_lookup';
  }

  return 'general_inquiry';
}
```

---

### 2. Conversation State Manager

**Purpose:** Track conversation progress across multiple turns

**State Schema:**
```javascript
{
  sessionId: string,
  currentIntent: string,
  conversationPhase: 'greeting' | 'discovery' | 'diagnosis' | 'recommendation' | 'followup',
  slotsFilled: {
    startup_stage: 'Discovery' | 'Validation' | 'Efficiency' | 'Scale' | null,
    team_size: 'solo' | 'team' | null,
    symptom_element: 'Governance' | 'Purpose' | 'Strategy' | 'Marketing' | ... | null,
    attempted_solutions: string[] | null,
    element_context: string | null  // What element they're asking about
  },
  turnCount: number,
  conversationHistory: Message[],
  lastRetrievedTools: Tool[]  // Cache to avoid re-fetching
}
```

**Phase Transitions:**
```
greeting → discovery (after first user message)
discovery → diagnosis (after stage identified)
diagnosis → recommendation (after root cause found)
recommendation → followup (after tool recommended)
followup → recommendation (if they ask for more)
```

---

### 3. Semantic Search (Netlify Function)

**Purpose:** Retrieve only relevant tools/quotes from knowledge base

**Endpoint:** `/.netlify/functions/semantic-search`

**Input:**
```javascript
{
  query: string,
  filters: {
    stage?: string,  // Discovery/Validation/Efficiency/Scale
    element?: string,  // Governance/Purpose/Strategy/Marketing/...
    intent?: string  // cash_flow_problem/customer_acquisition/...
  },
  limit: number  // Default: 5
}
```

**Output:**
```javascript
{
  tools: Tool[],  // Top N relevant tools
  quotes: Quote[],  // Top 2-3 relevant failure quotes
  directory: DirectoryEntry[]  // Top 3 relevant resources (if applicable)
}
```

**Implementation Options:**

**Option A - Simple (MVP):**
- Keyword matching + stage/element filtering
- No embeddings required
- Fast to implement, 70% accuracy

**Option B - Semantic (Better):**
- Generate embeddings for all tools (one-time)
- Use OpenAI embeddings API or Gemini embeddings
- Cosine similarity search
- 90% accuracy, requires setup

**Recommendation:** Start with Option A, upgrade to Option B later

---

### 4. System Prompt (Reduced to 50-60 Lines)

**OLD (v1.0):** 280 lines with full knowledge dump
**NEW (v2.0):** 50-60 lines with personality + rules only

**Structure:**
```
1. Role & Purpose (5 lines)
2. Personality Guidelines (10 lines)
3. Conversation Rules (10 lines)
4. Response Format (10 lines)
5. Research Citation Rules (5 lines)
6. Australian Context Rules (5 lines)
7. Interconnections Reminder (10 lines)
```

**Key Principle:** System prompt defines HOW to behave, not WHAT to know
- Knowledge comes from semantic search results (injected per query)
- System prompt stays constant and lightweight

---

### 5. Conversation Flow Templates

**Purpose:** Structured multi-turn conversations for each intent

**Template Structure:**
```javascript
const conversationFlows = {
  cash_flow_problem: {
    discovery: {
      question: "What's the main cash flow challenge - not enough coming in, going out too fast, or timing mismatch?",
      slotsToFill: ['symptom_element'],
      nextPhase: 'diagnosis'
    },
    diagnosis: {
      questions: [
        "Have you mapped your cash conversion cycle (time from spending to receiving)?",
        "Is this a revenue problem (not enough sales) or an efficiency problem (slow collections/invoicing)?"
      ],
      slotsToFill: ['startup_stage', 'attempted_solutions'],
      rootCauseLogic: (state) => {
        // Check interconnections: cash flow symptoms often root in Strategy, Process, or Marketing
        if (state.slotsFilled.attempted_solutions?.includes('sales')) {
          return {element: 'Marketing', reason: 'Revenue generation issue'};
        }
        if (/invoic|collect|payment/.test(state.slotsFilled.element_context)) {
          return {element: 'Process', reason: 'Cash conversion inefficiency'};
        }
        return {element: 'Finance', reason: 'Direct financial management'};
      },
      nextPhase: 'recommendation'
    },
    recommendation: {
      format: 'golden_circle',  // WHY-HOW-WHAT
      includeAssessmentReferral: true
    }
  },

  customer_acquisition: { /* Similar structure */ },
  strategic_clarity: { /* Similar structure */ }
};
```

---

### 6. Fallback Hierarchy

**Level 1: Clarification** (confidence < 0.5)
```
"I'm not quite sure I understood. Are you asking about:
• [Option A based on keywords]
• [Option B based on keywords]
• Something else?"
```

**Level 2: Rephrasing** (second low confidence)
```
"I want to help, but I'm having trouble understanding. Could you rephrase that?

For example, you might say:
• 'I'm struggling with cash flow'
• 'I can't get customers'
• 'My strategy isn't clear'"
```

**Level 3: Guided Options** (third low confidence)
```
"Let me show you what I can help with:
• Cash flow and financial challenges
• Customer acquisition and marketing
• Strategy and business direction
• Team performance and hiring

Which of these is closest to your challenge?"
```

**Level 4: Assessment Referral** (fourth low confidence OR explicit request)
```
"I think the Sova Assessment would help you better than this chat. It's a structured diagnostic that takes 15-20 minutes and gives you a complete view of your business foundations.

Would you like me to take you there?"

[Button: Start Assessment]
```

---

## RESPONSE FORMAT

**Standard Response Structure:**
```
[Acknowledge symptom] (1 sentence)
[Cite research/evidence] (1 sentence with link)

[Diagnostic insight / Root cause explanation] (2-3 sentences)

[Tool recommendation - Golden Circle format:]

WHY (1 paragraph):
[Why this matters] [Research citation with link]

HOW (1 paragraph):
[Approach/methodology] [Framework name with link if applicable]

WHAT (1 paragraph + tool card):
[Specific action]

<div class="tool-card">
<h4>[Tool Name]</h4>
<p>[Why this helps their specific situation]</p>
<a href="[URL]" target="_blank">Learn more →</a>
</div>

[Optional: Assessment referral if appropriate]
```

---

## KEY DESIGN DECISIONS

### Why Semantic Search?
**OLD:** Dump 281 tools into system prompt (massive token waste, context pollution)
**NEW:** Retrieve top 3-5 relevant tools per query (lean, precise, cost-effective)

### Why Intent Classification?
**OLD:** LLM figures out what to do (inconsistent, unpredictable)
**NEW:** Structured conversation flows (predictable, testable, measurable)

### Why State Management?
**OLD:** No context beyond message history (can't track progress)
**NEW:** Explicit state tracking (enables multi-turn diagnosis, slot filling)

### Why 50-Line System Prompt?
**OLD:** 280 lines of mixed instructions (confusing, contradictory)
**NEW:** Clear personality + rules only (focused, consistent)

### Why Conversation Flow Templates?
**OLD:** Hope LLM asks right questions (unreliable)
**NEW:** Proven diagnostic sequences (based on business excellence frameworks)

---

## IMPLEMENTATION PHASES

### Phase 1: MVP (Week 1)
- [x] Architecture design
- [ ] Intent classification (keyword-based)
- [ ] State manager (client-side)
- [ ] Simple semantic search (keyword + filters, no embeddings)
- [ ] Clean system prompt (50 lines)
- [ ] 3 conversation flows (cash flow, customer acquisition, strategic clarity)
- [ ] New UI with state display
- [ ] Fallback hierarchy (4 levels)

**Deliverable:** Working chatbot with 3 core conversation flows, testable with real scenarios

### Phase 2: Enhancement (Week 2)
- [ ] Add 2 more conversation flows (team performance, tool lookup)
- [ ] Implement embeddings-based semantic search
- [ ] Add conversation metrics tracking
- [ ] Create test scenario library (15-20 scenarios)
- [ ] Performance optimization

**Deliverable:** Production-ready chatbot with 5 intents, semantic search, metrics

### Phase 3: Advanced Features (Week 3+)
- [ ] ML-based intent classification (upgrade from keywords)
- [ ] Conversation history persistence (database)
- [ ] A/B testing framework
- [ ] Advanced analytics dashboard
- [ ] User feedback loop

---

## SUCCESS CRITERIA

**Phase 1 MVP Success:**
- [ ] Chatbot loads without errors
- [ ] 3 conversation flows work end-to-end
- [ ] Intent classification accuracy > 70% (tested with 20 sample queries)
- [ ] Semantic search returns relevant tools (manual review)
- [ ] Fallback hierarchy handles confusion gracefully
- [ ] Average conversation: 4-6 turns to recommendation

**Phase 2 Production Success:**
- [ ] 5 conversation flows operational
- [ ] Containment rate > 70% (no assessment referral needed)
- [ ] Fallback rate < 15%
- [ ] Average response time < 3 seconds
- [ ] User satisfaction > 4/5 (if collecting feedback)

---

## TECHNICAL STACK

**Frontend:**
- Vanilla JavaScript (no framework - keep it simple)
- State management: Custom ConversationStateManager class
- UI: Existing Sova design system

**Backend:**
- Netlify Functions (serverless)
- Node.js runtime
- Gemini 2.5 Flash API (existing)

**Data:**
- Knowledge base: JSON file (existing - 480KB)
- Embeddings: Future enhancement (OpenAI or Gemini embeddings)
- Session state: Client-side (sessionStorage), future: database

**APIs:**
- `/.netlify/functions/chat` - Main chat endpoint (existing, will modify)
- `/.netlify/functions/semantic-search` - NEW semantic retrieval

---

## FILES TO CREATE/MODIFY

**NEW FILES:**
- `chatbot-v2.html` - New chatbot UI
- `conversation-state-manager.js` - State management class
- `intent-classifier.js` - Intent classification logic
- `conversation-flows.js` - Flow templates
- `netlify/functions/semantic-search.js` - Semantic retrieval function
- `system-prompt-v2.js` - Clean 50-line system prompt

**MODIFIED FILES:**
- `netlify/functions/chat.js` - Update to use semantic search results

**DEPRECATED (keep for reference):**
- `chatbot.html` - Rename to `chatbot-v1-deprecated.html`

---

## AUSTRALIAN CONTEXT HANDLING

**Global Research (USE):**
- McKinsey frameworks, HBR articles, Forbes insights
- CB Insights failure data
- Harvard Business Review research
- Example: "42% of startups fail due to no market need (CB Insights)"

**Australian Statistics (USE):**
- Australian startup statistics (failure rates, funding, etc.)
- Australian ecosystem data
- Example: "Australian startups have X% survival rate (Startup Muster 2024)"

**Recommendation:** Tag research in knowledge base:
```json
{
  "quote": "42% of startups fail due to no market need",
  "source": "CB Insights",
  "type": "global",  // or "australian"
  "url": "https://..."
}
```

This allows chatbot to prefer Australian stats when available, fall back to global when not.

---

**Last Updated:** 2025-12-10
**Version:** 2.0-design
**Status:** Architecture complete, ready for implementation
