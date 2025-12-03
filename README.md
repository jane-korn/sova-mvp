# Sova MVP - Business Assessment Tool

**Live Site:** https://getsova.com.au
**GitHub Pages:** https://jane-korn.github.io/sova-mvp/

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

## Branding & Marketing

**Brand Colors:**
- Light green: #eaffc4
- Brown: #2d2828
- Cream: #f5f5dc
- Sage: #b8d78f

**Typography:** Montserrat (Google Fonts)

**Instagram Templates:**
Located in `/instagram-templates/` directory:
- 4 PowerPoint templates (10"x10" slides for 1080x1080px export)
- 2 with decorative lines + logo (dark/light)
- 2 with large movable bird watermark (dark/light)
- Export instructions in slide notes

**Assets:**
- `sova-logo-main-transparent.png` - Main logo (green text)
- `sova-logo-icon-transparent.png` - Bird icon (green)
- `sova-logo-icon-brown-transparent.png` - Bird icon (brown)
- `favicon.png` - Favicon with brown border

## Hosting

- **Domain:** getsova.com.au (Netlify)
- **DNS:** GoDaddy
- **SSL:** Let's Encrypt (auto-provisioned)
- **Deploy:** Auto-deploy on push to master

## Version

Current: v6.52 (2025-12-03)
- Netlify hosting with custom domain getsova.com.au
- Pilot phase note with survey link on first prelim page
- Fixed mobile text wrapping and footer spacing
- Created outlined logo versions and DL flyer print layouts

Previous: v6.51 (2025-11-28)
- Mobile prelim layout fixes
- Validation info buttons right-aligned
- Different How It Works guidance per path

---

**© 2025 Sova** - Democratising business excellence for Australian startups
