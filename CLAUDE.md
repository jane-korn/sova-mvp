# Sova MVP - Claude Context

## Project Overview
Self-assessment tool for Australian startups and scaleups. Helps founders assess business maturity across 9 elements and 4 stages.

**Live URL:** https://jane-korn.github.io/sova-mvp/
**Repository:** https://github.com/jane-korn/sova-mvp.git

## V2 Journey-Based Enhancements (2025-11-24)

### UAT Feedback Received
First UAT feedback highlighted critical UX issues:
- **Lack of purpose clarity** - Users didn't understand value proposition
- **Stage confusion** - Users stuck between stages (Validation/Product)
- **Overwhelming element selection** - No guidance on where to start
- **Checklist vs journey feel** - Needed buddy approach, not box-ticking
- **Missing progression sense** - No timeline or "homework done" celebration
- **No feedback mechanism** - Users resorted to screenshots

### V2 Branch Created
**Branch:** `v2-journey-based-enhancements`

### Key V2 Files
- **V2_ENHANCEMENTS.md** - Complete enhancement proposal document
- **index-v2.html** - New journey-based onboarding prototype

### V2 Features Implemented (Prototype)
1. **Enhanced Welcome Page**
   - Clear value proposition upfront
   - "Buddy" positioning vs consultant
   - Statistics showing what users will build
   - Compelling problem/solution framing

2. **Progressive Onboarding**
   - One question per page (Solo/Team → Stage → Pace)
   - Explanations for why each question matters
   - Visual examples and pro tips
   - Supportive, encouraging tone

3. **Pace Selection System**
   - Intensive (3 months), Steady (6 months), Gradual (9 months), Custom
   - Sets expectations for time commitment
   - Calculates estimated completion date
   - Journey tracking in localStorage

4. **Guided Element Selection**
   - Clear recommended path with reasoning
   - Numbered sequence (1-4)
   - "Why this first?" explanations
   - Option to unlock all for advanced users
   - Locked elements until prerequisites complete

5. **Built-in Feedback**
   - Floating feedback button (always visible)
   - Simple modal for quick feedback
   - Page tracking for context

### V2 Implementation Plan
See V2_ENHANCEMENTS.md for:
- Detailed wireframes and copy
- Technical data model changes
- New components needed
- 4-phase rollout plan
- Success metrics

### Next Steps for V2
1. Test index-v2.html prototype locally
2. Gather stakeholder feedback
3. Integrate with existing assessment flow (index.html)
4. Add celebration modals and progress tracking
5. Deploy to v2-beta URL for UAT round 2

## Recent Updates (2025-11-21)

### Mobile Fixes
- ✅ Fixed modal text wrapping on mobile (overflow-wrap: anywhere, reduced to 280px width)
- ✅ Fixed dot pulsing animation for mobile using JavaScript-based SVG manipulation (iOS Chrome doesn't support CSS filters on SVG)
- ✅ Auto-scroll to Continue button after Q2 (stage selection)
- ✅ Hidden preliminary question 3 (state/territory selection)

### Element Label Fixes
- ✅ Fixed element labels maintaining 24px font size when completed (was shrinking to 18px)
- ✅ All element labels now consistently 24px across all states (not started, in-progress, completed)

### Data Updates
- ✅ Updated Lean Canvas tool links from Excel (https://medium.com/@steve_mullen/an-introduction-to-lean-canvas-5c17c469d3e0)
- ✅ Added new Governance > Efficiency question about legal requirements
- ✅ Total questions: 115, Total hyperlinks: 463

## Key Files

### Core Files
- **index.html** - Main assessment interface (v6.34)
- **questions-data.js** - Generated from Excel, contains all 115 questions
- **regenerate-from-excel.py** - Automated Excel → interface sync

### Excel Source
- **Location:** `/home/janek/inbox/Allivate/assessment-tool-rebuild/Self Assessment Structure.xlsx`
- **Last Modified:** 2025-11-21 11:50
- **Tab:** Assessment Questions (115 rows, 19 columns)

### Documentation
- **UPDATE_WORKFLOW.md** - How to update Excel and sync to interface
- **COMPLETE_SOLUTION.md** - Overview of automated solution
- **README.md** - Project overview

## Update Workflow

**When Excel is updated:**
```bash
cd /home/janek/sova-mvp
python3 regenerate-from-excel.py
git add questions-data.js
git commit -m "Update questions from Excel"
git push
```

**Automated features:**
- Reads all 19 columns from Excel
- Extracts all embedded hyperlinks
- Creates automatic backups
- Validates output (115 questions, 400+ hyperlinks)

## Architecture

### Data Structure
- **Elements:** 9 total (Governance, Purpose, Strategy, Marketing, People, Performance, Process, Finance, Technology)
- **MVP Elements:** 4 active (Governance, Purpose, Strategy, Marketing)
- **Stages:** Discovery → Validation → Efficiency → Scale
- **Questions:** 115 total, each with Solo/Team variants

### Features
- Stage validation questions before advancing
- Multi-element flow (complete 4 elements sequentially)
- Real-time web chart visualization
- Live gap analysis and reporting
- Priority action checklist
- VC requirements mapping

## Mobile Compatibility Notes

### iOS Chrome Issues & Solutions
1. **CSS filters on SVG don't work** → Use JavaScript-based animations with setAttribute()
2. **Browser caching aggressive** → Use cache-busting parameters, hard refresh required
3. **Text wrapping** → Use overflow-wrap: anywhere, explicit width constraints

### Animation Approach
- Desktop: CSS filter drop-shadow works
- Mobile: JavaScript setInterval manipulating SVG radius and opacity attributes
- 4 pulses @ 1.2s each before launching assessment

## Version History
- **v6.34** - Mobile fixes, element label consistency
- **v6.33** - Hidden state question
- **v6.32** - Governance Efficiency question added, full Excel alignment

## Known Considerations
- Stage validation questions require manual updates in index.html if adding to Discovery/Validation/Efficiency stages
- GitHub Pages rebuild takes 2-3 minutes after push
- Mobile browsers may aggressively cache - recommend hard refresh for users
