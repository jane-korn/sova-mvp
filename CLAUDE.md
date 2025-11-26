# Sova MVP - Claude Context

## Project Overview
Self-assessment tool for Australian startups and scaleups. Helps founders assess business maturity across 9 elements and 4 stages.

**Live URL:** https://jane-korn.github.io/sova-mvp/
**Repository:** https://github.com/jane-korn/sova-mvp.git

## Recent Updates (2025-11-26)

### Link Standardisation
- ✅ Standardised all "View Source" and "Read More/Less" links across assessment tool
- ✅ Consistent styling: Montserrat font, 11px, bold (700), no underline, no italic
- ✅ Triangle arrow icons: ▸ (View Source), ▾ (Read More), ▴ (Read Less)
- ✅ CSS classes: `.source-link`, `.read-more-link.expand`, `.read-more-link.collapse`
- ✅ Updated `toggleQuote()` function for expand/collapse state management

### Gap Card Mobile Layout
- ✅ Reduced header padding: 28px 36px → 20px 16px on mobile
- ✅ Reduced content padding: 36px → 20px 16px on mobile
- ✅ Fixed Research References box overflow
- ✅ Tool cards: single column layout on mobile
- ✅ Proper word-wrap for all text content to prevent spillover

### Excel Tool Mapping (Self Assessment Structure.xlsx)
- ✅ Identified 22 broken links in Tool/Framework columns (marked red)
- ✅ Added 3 new columns: Missing tool 1, Missing tool 2, Missing tool 3
- ✅ Mapped 222 tools from Tools and methodologies.xlsx
- ✅ Added 46 hyperlinks to tools with URLs
- ✅ Backup created: Self Assessment Structure_backup_20251126_170321.xlsx

### Gap Completion UI (Earlier)
- ✅ Redesigned completion UI following Jeton/Phamily/Osmo minimalist principles
- ✅ "Mark complete" text with watermark thumbs (12% opacity) right-justified
- ✅ Progressive disclosure: collapsed by default, expands to show notes textarea
- ✅ Expanded state: borderless textarea, "Cancel" link, "Stuck"/"Done" buttons
- ✅ Completed state: checkmark, date, satisfaction (Helpful/Needs work), notes in italic
- ✅ Two-way sync working: Report ↔ Actions sidebar checkbox updates in both directions
- ✅ Undo functionality: reverses completion in both views
- ✅ Helper functions: `expandCompletion()`, `collapseCompletion()` added

### Preliminary Questionnaire Streamlined
- ✅ Removed container/border from Solo/Team and Stage pages (matches website margins)
- ✅ Removed progress bar from prelim flow
- ✅ Removed Continue and Back buttons
- ✅ Options now auto-advance: clicking an option moves to next page after 300ms delay
- ✅ New functions: `selectPrelimOptionAndAdvance()`, `selectStageAndContinue()`

### Design Principles Applied
- Restraint: minimal UI elements, no extra containers
- Seamless integration: matches existing cream card visual language
- Watermark-style thumbs: very subtle presence (12% opacity, 50% on hover)
- Functional clarity: clear affordance without visual noise
- 8-point spacing: consistent with rest of interface

## Previous Updates (2025-11-24)

### Branding & Marketing Updates
- ✅ Applied Montserrat font across all pages (index.html, assessment-tool.html, research.html, about.html)
- ✅ Updated logo styling: 90px height, vertical layout with "Startup Sidekick" underneath
- ✅ Fixed "Startup Sidekick" alignment: left-aligned with 100% width to match logo
- ✅ Added bird icon (45px) in bottom-right corner of all pages with 40% opacity
- ✅ Created separate favicon.png with brown border around bird shape
- ✅ Updated hero stat from "10%" to "90%" on landing page

### Instagram Templates
- ✅ Created 4 Instagram post templates (1080x1080px) in PowerPoint format
- ✅ Template 1: Dark background with full logo & decorative lines
- ✅ Template 2: Light background with brown logo & decorative lines
- ✅ Template 3: Dark background with large movable green bird watermark
- ✅ Template 4: Light background with large movable brown bird watermark
- ✅ PowerPoint: 10"x10" slides that export perfectly to 1080x1080px
- ✅ Bird watermarks positioned left-center, 3.0"x3.9", 25% opacity, fully movable
- ✅ Created brown bird icon asset: `sova-logo-icon-brown-transparent.png`
- ✅ Export instructions included in PowerPoint slide notes

### Previous Updates (2025-11-21)

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
- **index.html** - Main assessment interface (v6.35)
- **questions-data.js** - Generated from Excel, contains all 115 questions
- **regenerate-from-excel.py** - Automated Excel → interface sync
- **assessment-tool.html** - Assessment tool page
- **research.html** - Research and statistics page
- **about.html** - About/founder page

### Brand Assets
- **sova-logo-main-transparent.png** - Main logo (green text)
- **sova-logo-icon-transparent.png** - Bird icon (green)
- **sova-logo-icon-brown-transparent.png** - Bird icon (brown)
- **favicon.png** - Favicon with brown border around bird shape

### Instagram Templates Directory
**Location:** `/home/janek/sova-mvp/instagram-templates/`
- **sova-instagram-templates.pptx** - 4 template slides (10"x10")
- **blank_template_dark.png** - Dark background with full logo & lines
- **blank_template_light.png** - Light background with brown logo & lines
- **blank_template_dark_watermark.png** - Dark with green bird watermark (deprecated)
- **blank_template_light_watermark.png** - Light with brown bird watermark (deprecated)
- **blank_template_light_large_bird.png** - Light with large brown bird (static)
- **pptx-workspace/create-instagram-slides-v2.js** - PowerPoint generation script

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

## Brand Guidelines

### Colors (Australian English spelling: colours)
- **Light green:** #eaffc4 (primary brand color, for dark backgrounds)
- **Brown:** #2d2828 (primary text, logos on light backgrounds)
- **Cream:** #f5f5dc (light backgrounds)
- **Sage:** #b8d78f (accent color)

### Typography
- **Primary font:** Montserrat (Google Fonts)
- **Logo subtitle:** 0.7rem, sage color, left-aligned
- **Logo height:** 90px across all pages

### Logo Usage
- Main logo includes "Sova" text + bird icon
- "Startup Sidekick" appears underneath logo (100% width, left-aligned)
- Bird icon used as standalone element (bottom-right, 45px, 40% opacity)
- Favicon has brown border following bird shape (not circular)

### Instagram Template Usage
1. Open `sova-instagram-templates.pptx`
2. Choose template (slides 1-4)
3. Add text using Insert > Text Box
4. Format with brand colors and Montserrat font
5. Move bird watermark if needed (slides 3-4 only)
6. Export: File > Export > PNG > "Just This One" → 1080x1080px

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
- **v6.36** - Standardised View Source/Read More links, gap card mobile layout fixes, triangle arrows
- **v6.35** - Startup Sidekick alignment fix, Instagram templates, Montserrat font
- **v6.34** - Mobile fixes, element label consistency
- **v6.33** - Hidden state question
- **v6.32** - Governance Efficiency question added, full Excel alignment

## Known Considerations
- Stage validation questions require manual updates in index.html if adding to Discovery/Validation/Efficiency stages
- GitHub Pages rebuild takes 2-3 minutes after push
- Mobile browsers may aggressively cache - recommend hard refresh for users
