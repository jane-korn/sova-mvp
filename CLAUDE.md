# Sova MVP - Claude Context

## Project Overview
Self-assessment tool for Australian startups and scaleups. Helps founders assess business maturity across 9 elements and 4 stages.

**Live URL:** https://jane-korn.github.io/sova-mvp/
**Repository:** https://github.com/jane-korn/sova-mvp.git

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
