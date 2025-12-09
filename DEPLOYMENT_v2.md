# Sova Chatbot v2.0 - Deployment Guide

**Date:** 2025-12-10
**Status:** Ready for deployment

---

## WHAT'S NEW IN V2.0

Complete architectural rebuild:

**v1.0 Issues (FIXED):**
- 280-line system prompt dumped into every request
- Full 480KB knowledge base loaded every time
- No conversation flow structure
- No intent classification
- No state management
- Contradictory personality guidelines
- JavaScript error preventing chatbot from loading

**v2.0 Improvements:**
- Clean 50-60 line system prompt
- Semantic search (retrieves only top 3-5 relevant tools)
- Intent classification (5 core intents)
- Conversation state management (multi-turn context)
- Structured conversation flows (4 diagnostic sequences)
- Fallback hierarchy (graceful degradation)
- Debug mode (Ctrl+D to toggle)

---

## FILES OVERVIEW

### New Files Created:
```
chatbot.html                              - Main chatbot UI (renamed from chatbot-v2.html)
intent-classifier.js                      - Intent classification logic
conversation-state-manager.js             - State management class
conversation-flows.js                     - Structured diagnostic flows
system-prompt-v2.js                       - Clean 50-line system prompt
netlify/functions/semantic-search.js      - Semantic retrieval function
ARCHITECTURE.md                           - Architecture documentation
DEPLOYMENT_v2.md                          - This file
```

### Deprecated Files:
```
chatbot-v1-deprecated.html               - Old chatbot (kept for reference)
```

### Unchanged Files:
```
sova-knowledge-base.json                  - Knowledge base (still used, but accessed via semantic search)
netlify/functions/chat.js                 - Gemini API proxy (unchanged)
netlify.toml                              - Netlify config (unchanged)
sova-logo-*.png                           - Logo assets (unchanged)
```

---

## PRE-DEPLOYMENT CHECKLIST

### 1. Verify All Files Are Present

```bash
cd /home/janek/Sova/private/chatbot-beta-deployment

# Check new JavaScript modules exist
ls -lh intent-classifier.js
ls -lh conversation-state-manager.js
ls -lh conversation-flows.js
ls -lh system-prompt-v2.js

# Check new Netlify function exists
ls -lh netlify/functions/semantic-search.js

# Check main chatbot HTML
ls -lh chatbot.html

# Check knowledge base
ls -lh sova-knowledge-base.json
```

### 2. Test Locally (Optional but Recommended)

```bash
# Install Netlify CLI if not already installed
npm install -g netlify-cli

# Start local dev server
netlify dev

# Open browser to: http://localhost:8888/chatbot.html
# Test the chatbot with these scenarios:
# 1. "I'm struggling with cash flow"
# 2. "I can't get customers"
# 3. "My strategy isn't clear"
# 4. "Give me nonsense response" (test fallback)
# 5. Press Ctrl+D to see debug panel
```

### 3. Commit to Git

```bash
cd /home/janek/Sova/private/chatbot-beta-deployment

# Check git status
git status

# Should show:
# - Modified: chatbot.html (renamed from v2)
# - New: intent-classifier.js
# - New: conversation-state-manager.js
# - New: conversation-flows.js
# - New: system-prompt-v2.js
# - New: netlify/functions/semantic-search.js
# - New: chatbot-v1-deprecated.html
# - New: ARCHITECTURE.md
# - New: DEPLOYMENT_v2.md

# Add all new files
git add .

# Create commit
git commit -m "$(cat <<'EOF'
Rebuild chatbot with proper conversational AI architecture (v2.0)

BREAKING CHANGES:
- Complete rewrite of chatbot logic
- New semantic search architecture
- Intent classification system
- Conversation state management
- Structured diagnostic flows

NEW FEATURES:
- Intent classification (5 core intents)
- Semantic search (retrieves top 3-5 tools only)
- Conversation state manager (multi-turn context)
- Clean 50-line system prompt (vs 280 lines)
- Fallback hierarchy (4 levels)
- Debug mode (Ctrl+D to toggle)
- Conversation flows (cash flow, customer acquisition, strategic clarity, team performance)

FIXES:
- JavaScript error in v1.0 (Invalid or unexpected token)
- Knowledge dump issue (480KB every request)
- Contradictory personality guidelines
- No conversation structure
- Poor fallback handling

DEPRECATED:
- chatbot-v1-deprecated.html (kept for reference)

Technical Details:
- System prompt reduced from 280 to 50-60 lines
- Knowledge retrieval now server-side via semantic-search function
- State persisted in sessionStorage
- Intent classification accuracy ~70% (keyword-based, upgrade to ML later)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"

# Push to chatbot-beta branch
git push origin chatbot-beta
```

### 4. Verify Netlify Environment Variables

The chatbot needs one environment variable (already configured):

```
GEMINI_API_KEY = [Your Gemini API key]
```

**Verify in Netlify Dashboard:**
1. Go to https://app.netlify.com
2. Select "famous-cascaron-156a0f" site
3. Site settings → Environment variables
4. Confirm `GEMINI_API_KEY` is set

---

## DEPLOYMENT STEPS

### Option A: Auto-Deploy (Recommended)

Netlify will auto-deploy when you push to `chatbot-beta` branch.

```bash
# After committing (see step 3 above)
git push origin chatbot-beta

# Monitor deployment:
# 1. Go to https://app.netlify.com
# 2. Select site
# 3. Watch "Deploys" tab
# 4. Deployment takes ~30-60 seconds
```

### Option B: Manual Deploy via Netlify CLI

```bash
cd /home/janek/Sova/private/chatbot-beta-deployment

# Deploy to production
netlify deploy --prod

# Follow prompts:
# - Publish directory: . (current directory)
# - Confirm deployment
```

---

## POST-DEPLOYMENT TESTING

### 1. Verify Chatbot Loads

1. Open https://famous-cascaron-156a0f.netlify.app/chatbot.html
2. Check browser console for errors (F12 → Console)
3. Verify greeting message appears
4. Check that input field is enabled

### 2. Test Core Functionality

**Test Scenario 1: Cash Flow Diagnosis**
```
User: "I'm struggling with cash flow"
Expected:
- Intent classified as cash_flow_problem
- Bot asks diagnostic question about type of cash flow issue
- After answer, recommends tools with citations
- Ctrl+D shows debug info
```

**Test Scenario 2: Customer Acquisition**
```
User: "I can't get customers"
Expected:
- Intent classified as customer_acquisition
- Bot asks about differentiation/target market
- Recommends Purpose or Strategy tools (root cause)
```

**Test Scenario 3: Strategic Clarity**
```
User: "My strategy isn't clear"
Expected:
- Intent classified as strategic_clarity
- Bot asks diagnostic questions
- Recommends Lean Canvas, SWOT, or similar tools
```

**Test Scenario 4: Fallback Handling**
```
User: "asdfghjkl"
Expected:
- Low confidence detected
- Fallback level 1 (clarification with options)
- After 2 more unclear inputs: escalate to assessment
```

**Test Scenario 5: Debug Mode**
```
Action: Press Ctrl+D
Expected:
- Debug panel appears in top-right
- Shows: phase, intent, confidence, turns, slots filled
- Press Ctrl+D again to hide
```

### 3. Test Semantic Search

**Verify semantic search is working:**

1. Open browser DevTools (F12) → Network tab
2. Send message: "I need help with cash flow"
3. Check Network tab for:
   - Request to `/.netlify/functions/semantic-search`
   - Response with `tools`, `quotes`, `directory` arrays
   - Status: 200 OK

4. In chatbot response, verify:
   - Tool cards have working links
   - Research citations have sources
   - Tools are relevant to cash flow

### 4. Check Console for Errors

- Open browser console (F12)
- Look for any JavaScript errors
- Warnings are OK, errors are not

---

## DEBUGGING COMMON ISSUES

### Issue: Chatbot doesn't load

**Check:**
1. Browser console for JavaScript errors
2. Netlify deploy log for build errors
3. File paths (all .js files in same directory as chatbot.html)

**Fix:**
- Check that all 4 JavaScript files are deployed
- Verify no syntax errors in JavaScript files
- Check browser compatibility (ES6+ required)

### Issue: Semantic search returns empty results

**Check:**
1. Network tab: is `semantic-search` function being called?
2. Function logs in Netlify dashboard: Functions → semantic-search → Logs
3. Knowledge base file exists and is valid JSON

**Fix:**
- Check semantic-search.js is deployed to netlify/functions/
- Verify sova-knowledge-base.json is in deployment
- Check function logs for errors

### Issue: Intent classification seems wrong

**Check:**
1. Press Ctrl+D to see debug panel
2. Check "Intent" and confidence score
3. Review intent-classifier.js keywords

**Fix:**
- This is expected in Phase 1 (keyword-based, ~70% accuracy)
- Add more keywords to intent-classifier.js patterns
- Phase 2: upgrade to ML-based classification

### Issue: Conversation feels repetitive

**Check:**
1. Debug panel: what phase is it in?
2. Check if slots are being filled correctly
3. Review conversation-flows.js for current intent

**Fix:**
- Adjust conversation flows in conversation-flows.js
- Modify phase transition logic in chatbot.html
- Review system prompt for repetitive instructions

### Issue: Tools not relevant to query

**Check:**
1. Semantic search results (Network tab)
2. Scoring logic in semantic-search.js
3. Filters being passed (element, stage, intent)

**Fix:**
- Adjust scoring weights in semantic-search.js
- Add more intent-specific keywords
- Phase 2: implement embeddings-based search

---

## MONITORING & METRICS

### Conversation Analytics (Manual)

Track these metrics from user testing:

**Containment Rate:** % of conversations resolved without assessment referral
- Target: >70%
- How to measure: Count fallback level 4 escalations vs total conversations

**Average Turns to Recommendation:** How many messages before tool recommended
- Target: 4-6 turns
- How to measure: Check debug panel "Turns" when tool card appears

**Fallback Rate:** % of messages triggering fallback
- Target: <15%
- How to measure: Count fallback responses vs total bot responses

**Intent Classification Accuracy:** % of correctly classified intents
- Target: >70% (keyword-based), >90% (ML-based)
- How to measure: Manual review of debug panel intent vs actual user intent

### Netlify Function Metrics

**Check in Netlify Dashboard → Functions:**

**chat.js metrics:**
- Invocations per day
- Average execution time (should be 1-3 seconds)
- Error rate (should be <1%)

**semantic-search.js metrics:**
- Invocations per day (should match chat invocations)
- Average execution time (should be <500ms)
- Error rate (should be 0%)

---

## ROLLBACK PROCEDURE

If v2.0 has critical issues, rollback to v1.0:

```bash
cd /home/janek/Sova/private/chatbot-beta-deployment

# Restore v1.0 chatbot
git mv chatbot.html chatbot-v2-broken.html
git mv chatbot-v1-deprecated.html chatbot.html

# Commit and push
git add .
git commit -m "Rollback to v1.0 - v2.0 has critical issues"
git push origin chatbot-beta

# Netlify will auto-deploy v1.0 in ~30 seconds
```

**Note:** v1.0 has known issues (JavaScript error, knowledge dump), but may be preferable to broken v2.0.

---

## NEXT STEPS (Phase 2)

After successful v2.0 deployment:

### Week 2 Enhancements:
1. **Embeddings-based semantic search**
   - Generate embeddings for all 281 tools (one-time)
   - Use OpenAI or Gemini embeddings API
   - Upgrade semantic-search.js to use cosine similarity
   - Expected: 90% relevance accuracy (vs 70% keyword-based)

2. **ML-based intent classification**
   - Collect training data from real conversations
   - Train simple classifier (or use GPT-4o-mini for classification)
   - Upgrade intent-classifier.js
   - Expected: 90% intent accuracy (vs 70% keyword-based)

3. **Conversation metrics tracking**
   - Add analytics to track containment, fallback, turns
   - Create simple dashboard
   - Monitor real usage patterns

4. **Add 2 more conversation flows**
   - Governance diagnosis
   - Tool lookup (already scaffolded)

### Week 3+ Advanced Features:
- Conversation history persistence (database)
- A/B testing framework
- User feedback collection
- Advanced interconnections logic

---

## SUPPORT & DOCUMENTATION

**Architecture:** `/home/janek/Sova/private/chatbot-beta-deployment/ARCHITECTURE.md`
**This Guide:** `/home/janek/Sova/private/chatbot-beta-deployment/DEPLOYMENT_v2.md`
**Project Context:** `/home/janek/Sova/CLAUDE.md`

**Testing Checklist:**
- [ ] Chatbot loads without errors
- [ ] Greeting message displays
- [ ] Intent classification works (test with 5 sample queries)
- [ ] Semantic search returns relevant tools
- [ ] Conversation flows through phases (discovery → diagnosis → recommendation)
- [ ] Fallback hierarchy works (test with gibberish)
- [ ] Debug mode works (Ctrl+D)
- [ ] Tool cards have working links
- [ ] Research citations have sources
- [ ] Mobile responsive

---

**Deployment Date:** _________
**Deployed By:** _________
**Version:** 2.0.0
**Status:** ☐ Deployed ☐ Tested ☐ Verified
