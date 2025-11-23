# Sova v2 - Journey-Based Enhancement Proposal

## UAT Feedback Summary

**Date:** 2025-11-24
**Source:** First UAT feedback session

### Key Issues Identified

1. **Lack of Purpose/Value Proposition** - Users don't understand why they need the product from the start
2. **Stage Selection Confusion** - Users stuck between stages (e.g., Validation/Product)
3. **Overwhelming Element Selection** - No guidance on priority or where to start
4. **Checklist vs Journey** - Feels like box-ticking instead of guided support
5. **Missing Progress Sense** - No timeline, no "homework done today" feeling
6. **No Built-in Feedback** - Users resort to screenshots instead of easy in-app feedback

## Proposed v2 Enhancements

### 1. Enhanced Welcome & Value Proposition (Index Page Redesign)

**Current State:**
- Technical explanation of what Sova does
- Immediately asks Solo/Team and Stage selection
- No clear "why should I care?" moment

**v2 Enhancement:**
```
NEW WELCOME FLOW:

[Hero Section]
"Most startups fail because they skip the fundamentals.
You don't have to be one of them."

[The Problem]
- 90% of startups fail in their first 5 years
- Founder advice is fragmented and overwhelming
- You don't know what you don't know

[The Solution - Sova as Your Journey Buddy]
"Think of Sova as your startup co-pilot. We'll guide you through
the essential foundations—one step at a time, at your own pace."

[What You'll Get]
✓ A clear roadmap of what matters at your stage
✓ Daily bite-sized tasks (15-30 min sessions)
✓ Progress tracking (see how far you've come)
✓ Evidence-based frameworks used by successful startups
✓ Timeline: Complete in 3, 6, or 9 months (you choose the pace)

[CTA: Start Your Journey]
```

### 2. Progressive Onboarding (One Question Per Page)

**Current State:**
- Q1 (Solo/Team) and Q2 (Stage) on same page
- Feels rushed, no explanation of why each matters

**v2 Enhancement:**

```
PAGE 1: Welcome Message (already covered above)

PAGE 2: Solo or Team?
Title: "First things first—are you flying solo or with a team?"
Explanation: "This matters because the way you approach governance,
decision-making, and accountability changes significantly."

[Visual: Founder working alone vs team collaboration]

Options:
○ Solo (just me for now)
○ Team (2+ people)

[Skip] [Next →]

PAGE 3: Your Current Stage
Title: "Where are you in your startup journey?"
Explanation: "No wrong answer here! We'll meet you where you are
and help you build the right foundations for your stage."

[Visual: Linear journey map showing all 4 stages]

Options with better descriptions:
○ Discovery - "I'm exploring problems and testing ideas"
○ Validation - "I've got early customers and I'm proving the model works"
○ Efficiency - "It works! Now I need to streamline and scale sustainably"
○ Scale - "We're growing fast and need systems for expansion"
○ Unsure - "Help me figure this out"

Pro tip: "Most founders underestimate their stage. That's okay—
we'll validate this in the next step."

[← Back] [Next →]

PAGE 4: Stage Validation (existing questions, but one at a time)
Each validation question gets its own page with:
- Why this matters
- Visual examples
- [Yes] / [No] / [Not Sure] options
- "What happens if I say No?" tooltip

PAGE 5: Your Journey Setup
Title: "Let's set your pace"

"This assessment covers 4 essential elements:
• Governance - Your values, ethics, and decision framework
• Purpose - Your vision and mission
• Strategy - Your plan and positioning
• Marketing - Your customer experience and brand

Most founders complete this in 3-6 months. What's your goal?"

○ Intensive (3 months) - Daily 30-min sessions
○ Steady (6 months) - 3x per week, 30-min sessions
○ Gradual (9 months) - 2x per week, 20-min sessions
○ My own pace - I'll decide as I go

[Create My Journey →]
```

### 3. Guided Element Selection (Not Automatic)

**Current State:**
- Immediately jumps into Governance element after validation
- No explanation of what's happening or why
- Circles appear but no clear entry point

**v2 Enhancement:**

```
ELEMENT SELECTION PAGE (New)

[Header: "Your Assessment Journey"]
[Progress: 0% complete | Est. completion: [3/6/9] months]

[Visual: 4 circles in a clear recommended order with numbers]

Title: "Here's your recommended path"

"We recommend starting with Governance—it's the foundation
everything else builds on. But you can tackle these in any
order you prefer."

[Four Element Cards in Recommended Order:]

1. GOVERNANCE (Recommended Start)
   "Your values, ethics, and decision-making framework"
   Status: Not started
   Time: ~2-3 weeks at your pace
   Why this first? "This sets the foundation for all other decisions"
   [Start Governance →]

2. PURPOSE
   "Your vision, mission, and why you exist"
   Status: 🔒 Start Governance first (recommended)
   Time: ~2-3 weeks
   [View Preview]

3. STRATEGY
   "Your plans, priorities, and positioning"
   Status: 🔒 Complete Governance & Purpose first
   Time: ~2-3 weeks
   [View Preview]

4. MARKETING
   "Your customer experience and brand"
   Status: 🔒 Final piece of the foundation
   Time: ~2-3 weeks
   [View Preview]

[Toggle: "I know what I'm doing, let me choose" - Unlocks all]

[Progress saved automatically]
```

### 4. Journey-Based Question Flow

**Current State:**
- Rapid-fire questions with yes/no answers
- No sense of progress within an element
- No "wins" or encouragement

**v2 Enhancement:**

```
QUESTION PAGE REDESIGN:

[Top Progress Bar]
Governance: Question 1 of 12 | Discovery Stage
[=========>........................] 8% complete

[Session Timer: "15 minutes today"]

[Question Card - Large, Focused]

"I have documented my role, responsibilities, and current
strategic hypotheses (aligned to my business planning framework)"

[Tabs: Definitions | Why it matters | VC Perspective | Examples]

[Answer Options: YES / NO / NOT SURE]

[Bottom Navigation]
[← Previous] [Flag for Review] [Next →]

[Mini Encouragement]
"You're building solid foundations. 11 more questions in Governance."

[Save & Exit - "Resume anytime"]
```

### 5. Progress & Celebration System

**v2 Enhancement:**

```
AFTER EACH ELEMENT COMPLETION:

[Celebration Modal]
"🎉 Governance Complete!"

"Well done! You've built the foundation of strong decision-making.
Here's what you've achieved:

✓ Documented your values and ethics
✓ Created decision-making frameworks
✓ Established accountability measures

[Your Progress: 25% Complete]
[Visual: 1 of 4 elements filled in]

[What's Next?]
"Take a break or continue with Purpose—your vision and mission.
Estimated time: 2-3 weeks at your pace."

[Take a Break] [Continue to Purpose →]

---

DASHBOARD ALWAYS VISIBLE:

[Journey Dashboard]
• Started: [Date]
• Current streak: 5 days 🔥
• Elements complete: 1/4 (25%)
• Estimated completion: April 2026 (on track!)
• Time invested: 3 hours
• Next session: Purpose - Question 1

[Continue Journey →]
```

### 6. Built-in Feedback Mechanism

**Current State:**
- Users screenshot and email
- No easy way to provide feedback

**v2 Enhancement:**

```
FLOATING FEEDBACK BUTTON (Always visible)
[💬 Feedback]

Clicking opens modal:

"Help us improve Sova"

Quick feedback:
○ 😊 This is great
○ 😐 It's okay
○ 😕 Needs work

What page are you on? [Auto-detected: Governance Q5]

Tell us more: [Text area]

[ ] Okay to follow up via email

[Send Feedback] [Cancel]

---

Also add to every question page:
[?] "Is this question confusing?" → Quick report
```

### 7. Smart Pace Adjustment

**v2 Enhancement:**

```
AFTER 2 WEEKS OF ACTIVITY:

[Check-in Modal]
"How's your pace feeling?"

You set a goal of 6 months (3x per week).
You've completed 5 sessions in 2 weeks.

○ Too fast - I want to slow down
○ Just right - Keep going
○ Too slow - Let's speed up
○ I prefer no schedule

[Adjust My Pace]

System automatically recalculates estimated completion date.
```

### 8. Enhanced Stage Validation

**Current State:**
- Simple yes/no gate questions
- No help if you get stuck

**v2 Enhancement:**

```
IF USER ANSWERS "NO" TO VALIDATION QUESTIONS:

[Supportive Modal]
"No worries! Let's get you sorted."

You indicated you haven't [documented your business plan].

This is essential for Validation stage. Would you like to:

○ Start with Discovery instead (recommended)
○ Complete this prerequisite now (we'll guide you)
○ Skip for now and we'll revisit

[Help Me Decide]
```

## Implementation Phases

### Phase 1: Core Journey Experience (2-3 weeks)
- ✅ Enhanced welcome page with value prop
- ✅ One-question-per-page onboarding
- ✅ Pace selection system
- ✅ Element selection page with guidance
- ✅ Progress tracking dashboard

### Phase 2: Encouragement & Feedback (1-2 weeks)
- ✅ Celebration modals
- ✅ Progress streaks
- ✅ Built-in feedback system
- ✅ Smart pace adjustment

### Phase 3: Content Enhancement (1-2 weeks)
- ✅ Enhanced question explanations
- ✅ Visual examples for each stage
- ✅ "Why this matters" content
- ✅ Help tooltips throughout

### Phase 4: Polish & Testing (1 week)
- ✅ Mobile optimisation
- ✅ Animation polish
- ✅ Copy refinement
- ✅ UAT round 2

## Technical Considerations

### New Data Model

```javascript
// User Journey State
{
  startDate: "2025-11-24",
  targetPace: "steady", // intensive | steady | gradual | custom
  estimatedCompletion: "2026-05-24",
  sessionsPerWeek: 3,
  minutesPerSession: 30,

  // Progress tracking
  elementsCompleted: ["Governance"],
  currentElement: "Purpose",
  currentQuestionIndex: 0,
  totalTimeSpent: 180, // minutes
  currentStreak: 5, // days

  // Milestones
  milestones: [
    { element: "Governance", completedDate: "2025-12-15", score: 75 }
  ],

  // Feedback given
  feedbackSubmissions: 3
}
```

### New Components Needed

1. `onboarding-wizard.js` - Multi-step onboarding
2. `pace-calculator.js` - Timeline and progress estimation
3. `element-selector.js` - Guided element selection
4. `celebration-modal.js` - Milestone celebrations
5. `feedback-widget.js` - In-app feedback system
6. `progress-dashboard.js` - Journey overview

### Existing Files to Modify

- `index.html` - Complete welcome section redesign
- `questions-data.js` - Add explanation content fields
- `content-data.js` - Add journey copy and encouragements
- CSS - New journey-focused styling

## Success Metrics for v2

1. **Completion Rate** - % of users who complete all 4 elements
2. **Time to First Element** - Reduce dropoff in onboarding
3. **Session Frequency** - Users returning regularly
4. **Feedback Quality** - Rich, actionable feedback collected
5. **User Sentiment** - "Buddy" vs "Checklist" perception

## Rollout Plan

1. **v2-dev branch** - Build and test internally
2. **v2-beta** - Deploy to separate URL for UAT group
3. **Gather feedback** - 2-week UAT period
4. **Refine** - Incorporate UAT feedback
5. **Launch v2** - Replace current version
6. **Monitor** - Track metrics and iterate

---

**Next Steps:**
1. Review this proposal with stakeholders
2. Prioritise Phase 1 features
3. Begin implementation
4. Schedule UAT round 2

