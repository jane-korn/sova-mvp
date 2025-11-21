# Sova MVP - Business Assessment Tool

**Live Demo:** https://jane-korn.github.io/sova-mvp/

A mobile-responsive business assessment tool for Australian startups and scaleups.

## About Sova

Sova helps startups assess their business maturity across 9 elements and 4 stages:

**Active Elements (MVP):**
- Governance (Values, controls, ethics)
- Purpose (Vision, mission, why you exist)
- Strategy (Plans, priorities, positioning)
- Marketing (Customer experience and branding)

**Future Elements:**
- People, Performance, Process, Finance, Technology

**Stages:** Discovery → Validation → Efficiency → Scale

## Features

- ✅ Solo and Team modes
- ✅ Stage-based assessment with validation gates
- ✅ Multi-element sequential flow
- ✅ Mobile-responsive design (iOS/Android compatible)
- ✅ Real-time web chart visualization
- ✅ Live gap analysis and reporting
- ✅ Priority action checklist
- ✅ VC readiness insights
- ✅ Tool and framework recommendations with hyperlinks
- ✅ 115 assessment questions across all stages
- ✅ Automated Excel → interface sync

## Technology

Built with vanilla HTML, CSS, and JavaScript for maximum performance and compatibility.

**Data Management:**
- Questions sourced from Excel (Self Assessment Structure.xlsx)
- Automated regeneration with `regenerate-from-excel.py`
- 463 embedded hyperlinks to resources

## Updating Content

See [UPDATE_WORKFLOW.md](UPDATE_WORKFLOW.md) for complete instructions.

**Quick update:**
```bash
# After updating Excel file
python3 regenerate-from-excel.py
git add questions-data.js
git commit -m "Update questions from Excel"
git push
```

## Documentation

- **UPDATE_WORKFLOW.md** - Complete workflow for updating questions
- **COMPLETE_SOLUTION.md** - Overview of automated solution
- **CLAUDE.md** - Technical context and recent changes

## Version

Current: v6.34 (2025-11-21)
- Mobile animation fixes
- Element label consistency
- Updated tool links

---

**© 2025 Sova** - Democratizing business excellence for Australian startups
