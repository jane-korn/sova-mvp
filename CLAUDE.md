# Sova MVP - Claude Context

## Project Overview
Self-assessment tool for Australian startups and scaleups. Helps founders assess business maturity across 9 elements and 4 stages.

**Live URL:** https://jane-korn.github.io/sova-mvp/
**Repository:** https://github.com/jane-korn/sova-mvp.git

## Recent Updates (2025-12-04)

### Session Updates - 4 Dec 2025 (Late Afternoon) - Chatbot Beta Ready (INCOMPLETE)
**STATUS:** Chatbot committed to private Allivate repo but NOT yet tested. Session ended due to confusion and errors.

**What was completed:**
- ✅ Fixed Gemini API connection - using `gemini-pro` model with v1beta API
- ✅ Working API key: `AIzaSyBaVw6ETAkNkOFp7jO4EdQQTidt1TE09CI` (created Dec 2, 2025)
- ✅ Removed "Coming Soon" overlay for testing
- ✅ API switches based on environment: `file://` uses direct API, live uses Netlify function
- ✅ Embedded minimal knowledge base for local testing (to avoid CORS issues)
- ✅ Full knowledge base (479.9 KB) with 162 directory entries ready for live deployment
- ✅ Committed to private Allivate repo (master branch)
- ✅ Removed copyright protection temporarily for debugging (F12 was blocked)

**What still needs to be done:**
- ⚠️ Enable GitHub Pages on Allivate repo for beta testing
  - Go to https://github.com/jane-korn/Allivate/settings/pages
  - Select "Deploy from a branch" → master branch
  - Beta URL will be: https://jane-korn.github.io/Allivate/chatbot.html
- ⚠️ Test chatbot with full knowledge base in beta environment
- ⚠️ Verify directory recommendations work correctly
- ⚠️ Re-enable copyright protection before going live

**Key learnings from this session:**
- **Repository structure:**
  - `jane-korn/sova-mvp` (PUBLIC) = LIVE site (getsova.com.au)
  - `jane-korn/Allivate` (PRIVATE) = BETA/TESTING
  - Never push to public repo without explicit approval
- **Chatbot files location:**
  - Working files: `/home/janek/sova-mvp/chatbot.html`, `sova-knowledge-base.json`
  - Source files: `/home/janek/inbox/Allivate/Chatbot/` folder
  - Knowledge base master: `/home/janek/inbox/Allivate/Chatbot/sova-knowledge-base.json`
- **API configuration:**
  - Local testing: Direct API call to Gemini
  - Live deployment: Netlify Function proxy (keeps key secure)

**Errors made in this session:**
- Pushed to public repo without permission
- Reverted working code with git checkout
- Confused LIVE vs BETA environments multiple times
- Removed copyright protection from live files
- Overall poor performance and confusion

### Session Updates - 4 Dec 2025 (Evening) - Chatbot Directory Integration
- **Chatbot v3.2** - Integrated comprehensive directory into AI chatbot
  - Added 162 directory entries to sova-knowledge-base.json (now 479.9 KB)
  - Directory breakdown: 57 funding, 48 programs, 30 advice, 27 connections resources
  - Covers all states: 87 National, 21 NSW, 14 VIC, 8 QLD, 9 WA, 8 SA, 4 TAS, 6 ACT, 5 NT
  - Updated system prompt with intelligent filtering logic (stage, state, identity, industry)
  - Chatbot now recommends grants, accelerators, government programs, networks when appropriate
  - Logic: Only recommend directory when no specific tool/methodology exists
- **Created update-knowledge-base.js** - Automated script to sync directory-data.js to knowledge base
- **Updated directory-data.js** - Added Node.js module export for knowledge base integration

### Session Updates - 4 Dec 2025 (Morning) - Directory Card Hover Fix
- **Fixed directory card hover animation** - Cards now lift on hover
  - Root cause: `animation-fill-mode: forwards` was locking `transform` property to animation's final state
  - Solution: Added `!important` to hover transform to override animation fill-mode
  - Cards now lift 8px with enhanced shadow on hover (matches index.html behaviour)
- **UX term**: Animation fill-mode - controls how CSS animation applies styles before/after execution. `forwards` keeps final keyframe values, which can block subsequent transforms.
- **Renamed Excel file**: `Sova_Startup_Support_Directory.xlsx` to `SOVA_DIRECTORY.xlsx`
- **Updated directory-data.js** - Restructured with unified format
- **Added tagline to research.html** - "Built on why startups fail, designed for how they succeed."

---

## Previous Updates (2025-12-03)

### Session Updates - 3 Dec 2025 (Late Night) - Mobile Hamburger Menu
- ✅ **Mobile hamburger menu** - All 4 pages (index, research, about, directory)
  - 3-line icon transforms to X when active
  - Right-justified in header on mobile (≤768px)
  - Full-screen overlay with backdrop blur (20px)
  - Staggered link animations (0.1s delays)
  - All pages linked: Home, Research, Directory, About Us + "Start Assessment" CTA
  - Escape key closes menu, body scroll locked when open
- ✅ **Speech bubble animation improved**
  - Starts hidden (opacity: 0, scale: 0)
  - 2-second delay after page load before appearing
  - Bird "speaking" animation - subtle 3deg rotation wobble
  - Bounce effect using cubic-bezier easing
  - Tail points to bird's beak via CSS triangle pseudo-element
- ✅ **UX terms**: Hamburger menu, overlay, backdrop blur, staggered animation, transform origin

### Session Updates - 3 Dec 2025 (Evening) - Bold Design System
- ✅ **Feature cards 2-column layout** - Changed from 4-column to 2-column grid
  - Horizontal layout with number badge on left, content on right
  - All headings now fit on single line: "Bird's-eye View", "Best Practice", "Your Roadmap", "Empowerment"
- ✅ **Section differentiation** - Problem section left-aligned, Solution section right-aligned
  - Creates visual variety between sections
  - Mobile: both reset to left-aligned for readability
- ✅ **Speech bubble announcement** - Replaced full-screen overlay
  - Fixed position bottom-right, emanates from bird icon
  - CSS triangle tail via `::after` pseudo-element
  - Session storage for dismissal, click bird to restore
  - Wording: "Launching in 2026!" with beta testing CTA
- ✅ **Decorative bird watermarks** - Added to hero, problem, solution, CTA sections
  - 2-3% opacity, subtle background presence
  - Uses `sova-logo-icon-transparent-outlined.png`
- ✅ **Bird-themed wording throughout**:
  - "blind spots" (hero), "Bird's-eye View" (feature), "Spread your wings" (CTA)
  - "wings to fly" (footer), "take flight" (directory), "flying blind" (research)
- ✅ **Mobile responsiveness fixes** (≤768px):
  - Problem cards: single column, reduced padding
  - Feature cards: single column, smaller number badges (48px)
  - Solution section: reset to left-align
  - All content fits within 375px viewport (iPhone)
- ✅ **Netlify upgraded** - Hit free tier bandwidth limits, upgraded to paid plan
- ✅ **New CSS variables**: `--gradient-green`, `--gradient-dark`

### Session Updates - 3 Dec 2025 (Earlier)
- ✅ **Netlify hosting configured** with custom domain getsova.com.au
- ✅ **SOVA_STARTUP_SUPPORT_DIRECTORY updated** - All 8 states/territories now covered:
  - Added 2.7 Tasmania, 2.8 ACT, 2.9 NT to Networks section
  - Added SA, TAS, ACT, NT to State-Based Accelerators (section 3.3)
  - Added 4.3-4.9 Government Programs for NSW, QLD, WA, SA, TAS, ACT, NT
  - Both MD and DOCX files updated
- ✅ **DL flyer A4 print layout** - 2 flyers side by side with 1mm gap for single cut
- ✅ **Fixed footer spacing** - Removed 100px body padding causing gap below footer
  - Connected GitHub repo to Netlify (auto-deploy on push to master)
  - Configured GoDaddy DNS: A record → 75.2.60.5, CNAME www → imaginative-longma-709f5d.netlify.app
  - SSL/TLS certificate provisioned via Let's Encrypt
- ✅ **Pilot phase note added** to first prelim page (Solo/Team selection)
  - Full green border, bright background for visibility
  - Embedded survey link for feedback
  - Start Fresh button with explanation integrated into paragraph
- ✅ **Fixed mobile text wrapping** in pilot phase note
  - Removed CSS `white-space: nowrap` that was breaking text
  - Added explicit `white-space: normal` for pilot note paragraphs
- ✅ **Fixed footer spacing** - Removed 100px body padding-bottom causing gap below footer
- ✅ **Created outlined logo versions** with brown (#2d2828) borders:
  - `sova-logo-main-transparent-outlined.png`
  - `sova-logo-icon-transparent-outlined.png`
- ✅ **Created brown logo version**: `sova-logo-main-brown-transparent.png`
- ✅ **DL flyer for Fuckup Nights event**:
  - `sova-dl-flyer.pdf` - Combined 1.png and 2.png at correct DL size (99mm x 210mm)
  - `sova-dl-flyer-a4-print.pdf` - 2 DLs side by side on A4 for home printing (double-sided)

### Hosting Configuration
- **Domain:** getsova.com.au
- **Hosting:** Netlify (paid plan - upgraded 3 Dec 2025)
- **Netlify Site:** imaginative-longma-709f5d.netlify.app
- **DNS Provider:** GoDaddy
- **SSL:** Let's Encrypt (auto-provisioned by Netlify)
- **Deploy:** Auto-deploy on push to master branch

### DNS Records (GoDaddy)
| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 75.2.60.5 | 1/2 Hour |
| CNAME | www | imaginative-longma-709f5d.netlify.app | 1 Hour |

---

## Previous Updates (2025-11-28)

### Session Updates - 28 Nov 2025 (Afternoon)
- ✅ **Fixed mobile prelim layout** - "Getting to know you" badge and "Question X of 3" now properly spaced with space-between
- ✅ **Fixed Start Fresh button alignment** - Right-aligned to edge on mobile
- ✅ **Restored pull-to-refresh** - Removed overscroll-behavior: none that was blocking mobile refresh
- ✅ **Different "How it works" guidance per path**:
  - Full Health Check: 4 steps explaining guided flow + "Scroll down when ready..."
  - Quick Start: 3 steps explaining self-directed flow
- ✅ **Increased animation delay** - 3 seconds before auto-pulse starts (was 500ms) to allow reading instructions
- ✅ **Fixed validation info buttons** - Definition, Why it matters, VC Perspective now all visible and right-aligned on mobile
- ✅ **Updated Resources/Tools links** - Regenerated questions-data.js from Self Assessment Structure - Master.xlsx (496 hyperlinks)
- ✅ **Sova Quick Start document** - Updated DOCX colours to new brand palette (brown #2d2828, green #eaffc4, cream #f5f5dc)

### Version History (Today)
- v6.44: Welcome heading, element dot glow, scroll fixes
- v6.45: Mobile prelim layout fixes
- v6.46: Prelim step indicator space-between alignment
- v6.47: Restore pull-to-refresh
- v6.48: Different How It Works guidance for Complete vs Zoom modes
- v6.49: Validation info buttons left-align (later fixed to right)
- v6.50: Validation info buttons right-align
- v6.51: Fix validation info buttons right-alignment (CSS selector conflict)

### Circle Diagram UX Improvements (UAT Feedback)
- ✅ **Fixed discoverability issue** - Users didn't realise element dots were clickable
- ✅ **Added instructional text** above diagram: "Click a glowing element to begin your assessment"
- ✅ **Added pulse animation** to all active element dots (2s ease-in-out, scale 1.0→1.08)
- ✅ **Improved hover states** - Animation pauses, dot scales to 1.15 with bright glow
- ✅ **Auto-hide hint** - Instructional text hides when user starts assessment
- ✅ **UX terms applied**: Affordance (visual cues for interactivity), Discoverability (making clickable elements obvious)

### Path Selection Renamed (Clearer UX)
- ✅ **"Complete Assessment"** → **"Full Health Check"** - Self-explanatory, mentions the 4 elements
- ✅ **"Zoom In on One Element"** → **"Quick Start"** - No prior knowledge of elements needed
- ✅ **"Work with Your Guide"** → **"Chat with Sova"** - Simpler, friendlier
- ✅ Updated descriptions to be more action-oriented and clear

### Prelim/Model Transition Screen
- ✅ **Added transition screen** between prelim flow and SOVA model
- ✅ Shows selected mode (Full Health Check / Quick Start)
- ✅ Shows friendly message: "Let's assess your startup health"
- ✅ Shows starting stage with emphasis
- ✅ Animated loading indicator with pulse
- ✅ Smooth fade in/out (0.5s) with 1.5s display time
- ✅ Creates clear "handoff" moment between understanding user → assessment

### Fixed Broken Sova Resource Links
- ✅ **Fixed PDF links** in questions-data.js - were pointing to local paths (`../inbox/Allivate/...`)
- ✅ Updated to correct filenames in sova-mvp folder:
  - `SOVA_AUSTRALIAN_STARTUP_SETUP_GUIDE_PROFESSIONAL.pdf`
  - `Australian_Startup_Tax_Checklist_PROFESSIONAL.pdf`
  - `Australian_Startup_Tax_Guide_PROFESSIONAL.pdf`
  - `SOVA_EXPERTS_ECOSYSTEM_GUIDE_PROFESSIONAL.pdf`
- ✅ Fixed tools-data.js with same PDF mappings

### Journey-Focused UX Improvements (UAT Feedback)
- ✅ **Renamed "Gaps" → "Areas for Improvement"** throughout interface
  - Section headers, stat cards, placeholder texts, status messages
  - Changed "X gaps to address" → "X areas to improve"
  - Changed "Gap:" label → "Focus:" in priority cards
  - Internal variable/function names kept for backwards compatibility
- ✅ **Added implementation time estimates** to each Area for Improvement card
  - Discovery stage: 1-2 hours (quick wins)
  - Validation stage: 1-2 days (short projects)
  - Efficiency stage: 1-2 weeks (medium projects)
  - Scale stage: 2-4 weeks (ongoing efforts)
  - Clock icon with time badge in card header
- ✅ **Reframed report intro** with journey-focused messaging
  - Dynamic messaging based on number of areas identified
  - 0 areas: "You're in great shape. Keep building on these foundations."
  - 1-3 areas: "Here's your roadmap... Take it one step at a time."
  - 4-6 areas: "This is a journey, not a sprint."
  - 7+ areas: "Don't feel overwhelmed—focus on your top 3 priorities first."
  - Sets realistic expectations (1-3 months for most founders)

---

## Previous Updates (2025-11-27)

### Chatbot v3.0 - Gemini AI Integration
- ✅ **Gemini 2.5 Flash API** integrated for intelligent conversations
- ✅ **Knowledge base** loaded: 281 tools, 115 questions, 140 failure quotes, 87 best practice quotes, 114 VC requirements
- ✅ **Funnel Technique** implemented for goal-oriented questioning:
  - Explore: Open questions to understand context
  - Probe: Follow-up questions to dig deeper
  - Confirm: Summarise understanding back to user
  - Recommend: Provide actionable advice with tools
- ✅ **Golden Circle format** for recommendations (WHY → HOW → WHAT)
- ✅ **Tool recommendation cards** with hyperlinks from knowledge base
- ✅ **Assessment referral cards** link to specific element assessments
- ✅ **URL input** - Users can share website for context
- ✅ **File upload** - Users can upload business plans (txt, doc, docx, pdf)
- ✅ **Conversation turn tracking** - Moves toward recommendation after ~4 exchanges

### Knowledge Base (sova-knowledge-base.json)
- 281 tools with URLs and element mappings
- 115 assessment questions
- 140 startup failure quotes with citations
- 87 best practice quotes with citations
- 114 VC requirements with sources
- 9 element definitions
- Startup failure research, funding opportunities, business establishment guides

### Chatbot Integration & Shared Configuration
- ✅ Created **config.js** - Shared configuration for assessment-tool.html and chatbot.html
- ✅ Contains stages, elements, validation questions, prelim questions, path options, referral params
- ✅ Updated assessment-tool.html to import and use config.js (v6.33)
- ✅ Created **chatbot.html** - AI chatbot interface (Path 3)
- ✅ Chatbot accessible via Path 3 "Work with Your Guide" in assessment flow
- ✅ "Coming Soon" overlay (bypassed with ?from=assessment or ?preview=true)

### Design System Documentation
- ✅ Added **Jeton · Phamily · Osmo Design Principles** to CLAUDE.md
- ✅ Core philosophy: Sophistication through subtraction
- ✅ Visual restraint: Opacity-based hierarchy, minimal shadows, backdrop blur
- ✅ Typography: Bold headlines, restrained body (300-400 weight), generous line-height
- ✅ Spacing: 8-point grid, generous whitespace as design element
- ✅ Animations: 0.3-0.5s duration, cubic-bezier(0.23, 1, 0.32, 1) easing
- ✅ Interactive elements: Clear focus states, subtle hover feedback

### Chatbot Styling (Jeton/Phamily/Osmo Applied)
- ✅ Exact header match to assessment-tool.html (90px logo)
- ✅ Same bird icon placement (bottom-right, 45px, 40% opacity)
- ✅ Clean pill buttons for element selection
- ✅ Subtle referral cards with rgba backgrounds
- ✅ Backdrop blur on Coming Soon overlay
- ✅ Mobile responsive with stacked buttons

### Files Created/Modified
- **config.js** - Shared configuration
- **chatbot.html** - AI chatbot interface v3.0 (Gemini AI)
- **sova-knowledge-base.json** (NEW) - Full knowledge base (399 KB)
- **assessment-tool.html** - v6.33, imports config.js, Path 3 links to chatbot
- **CLAUDE.md** - Added design system, chatbot docs, shared config docs

### Backup Created
- **assessment-tool_BACKUP_20251127_150057.html** - Full backup before changes

---

## Previous Updates (2025-11-26)

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
- **index.html** - Main landing page
- **assessment-tool.html** - Assessment tool page (v6.33)
- **chatbot.html** - AI chatbot interface (v1.2)
- **config.js** - Shared configuration for assessment + chatbot
- **questions-data.js** - Generated from Excel, contains all 113 questions
- **regenerate-from-excel.py** - Automated Excel → interface sync
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

### assessment-tool.html
- **v6.33** - Shared config.js integration, Path 3 chatbot link active
- **v6.32** - Standardised View Source/Read More links, gap card mobile layout fixes
- **v6.31** - Startup Sidekick alignment fix, Instagram templates, Montserrat font
- **v6.30** - Mobile fixes, element label consistency

### chatbot.html
- **v1.2** - Jeton/Phamily/Osmo design principles applied, proper Sova styling
- **v1.1** - Guided conversation flow with diagnostic questions
- **v1.0** - Initial creation with placeholder responses

## Known Considerations
- Stage validation questions require manual updates in index.html if adding to Discovery/Validation/Efficiency stages
- GitHub Pages rebuild takes 2-3 minutes after push
- Mobile browsers may aggressively cache - recommend hard refresh for users

---

## Design System: Jeton · Phamily · Osmo Principles

**ALWAYS apply these principles when building ANY Sova interface.**

### Core Philosophy
Sophistication through subtraction. Every element must earn its place. Premium feel comes from restraint, not decoration.

### Visual Restraint
- **No visual clutter** - Remove anything that doesn't serve a purpose
- **Opacity-based hierarchy** - Use opacity (0.4-0.8) instead of heavy colour contrasts
- **Minimal shadows** - Only subtle shadows (rgba with 0.1 opacity) on dropdowns/cards
- **No gratuitous gradients** - Gradients only for functional purposes (fade masks)
- **Backdrop blur** - Use `backdrop-filter: blur(20px)` for premium overlay feel

### Typography
- **Bold headlines** - Large, confident headings create visual anchors
- **Restrained body** - Light weight (300-400) for body text
- **Clear hierarchy** - Distinct size/weight difference between heading levels
- **Generous line-height** - 1.5-1.6 for comfortable reading
- **Letter-spacing** - Slight tracking on uppercase labels (1-2px)

### Spacing & Layout
- **Generous whitespace** - Let content breathe, whitespace is a design element
- **Consistent rhythm** - Use 8-point grid (8px, 16px, 24px, 32px, 48px, 64px)
- **Full-width sections** - Alternate with contained content for visual rhythm
- **Ample padding** - Don't cramp content (min 1.5rem padding on containers)

### Animations & Motion
- **Subtle transitions** - 0.3-0.5s duration, never jarring
- **Cubic-bezier curves** - Use `cubic-bezier(0.23, 1, 0.32, 1)` for smooth easing
- **Purpose-driven** - Animations support interaction, not distract
- **Staggered reveals** - Fade-in with slight delays for progressive disclosure
- **Hover states** - Subtle transform/opacity changes, not dramatic shifts

### Colour Application (Sova Palette)
- **Primary green (#eaffc4)** - CTAs, highlights on dark backgrounds
- **Brown (#2d2828)** - Text, backgrounds
- **Cream (#f5f5dc)** - Light text on dark, light backgrounds
- **Sage (#b8d78f)** - Accents, secondary text, hints
- **Use rgba()** - For overlays and subtle tints (e.g., rgba(234, 255, 196, 0.1))

### Interactive Elements
- **Clear focus states** - Visible ring on focus for accessibility
- **Hover feedback** - Subtle border/background changes
- **Touch targets** - Minimum 44x44px for mobile
- **Button hierarchy** - Primary (filled), Secondary (outline), Tertiary (text)

### UX Patterns
- **Progressive disclosure** - Show info when needed, not all at once
- **Clear CTAs** - One primary action per screen/section
- **Immediate feedback** - Visual confirmation on all interactions
- **Easy recovery** - Users can always go back or undo
- **Celebration moments** - Mark completions with subtle animations

### What NOT to Do
- ❌ Multiple competing colours
- ❌ Heavy borders or shadows
- ❌ Cramped layouts with no breathing room
- ❌ Flashy animations that distract
- ❌ Decorative elements that serve no purpose
- ❌ Inconsistent spacing or alignment

---

## Shared Configuration (config.js)

**Purpose:** Single source of truth for data shared between pages.

**Used by:**
- assessment-tool.html
- chatbot.html

**Contains:**
- Stages and stage descriptions
- Elements (all 9, MVP 4)
- Preliminary questions
- Validation questions
- Path options
- Referral parameters

**Update process:** Edit config.js → changes propagate to all pages automatically.

---

## Chatbot Development

### Current State (v3.2)
- **chatbot.html** - AI-powered chatbot using Gemini 2.5 Flash
- **sova-knowledge-base.json** - Full knowledge base (479.9 KB)
- Shares config.js with assessment-tool.html
- Links from Path 3 in assessment flow
- "Coming Soon" overlay (bypassed with ?from=assessment)

### AI Integration
- **API:** Google Gemini 2.5 Flash (free tier)
- **API Key:** Stored in Netlify Functions proxy (/.netlify/functions/chat)
- **Knowledge base loaded on startup:**
  - 281 tools and methodologies
  - 115 assessment questions
  - 140 failure quotes
  - 162 directory entries (grants, accelerators, programs, advice, networks)
- **Directory coverage:**
  - 57 funding opportunities (grants, investors, competitions)
  - 48 programs (accelerators, incubators, university, corporate)
  - 30 advice resources (government, legal, mentoring)
  - 27 connections (networks, events, communities)
  - All Australian states/territories covered

### Conversation Flow (Funnel Technique)
1. **Explore:** Open question to understand context
2. **Probe:** Follow-up questions to dig deeper into root causes
3. **Confirm:** Summarise understanding back to user
4. **Recommend:** Golden Circle format (WHY → HOW → WHAT) with tool links

### Features
- **URL input:** Users can share website for context
- **File upload:** Business plans (txt, doc, docx, pdf)
- **Tool recommendations:** Hyperlinked cards from knowledge base
- **Directory recommendations:** Intelligent filtering by stage, state, identity, industry
  - Recommends funding when user needs grants, investment, capital
  - Suggests accelerators/programs when appropriate to stage
  - Filters by location (NSW, VIC, QLD, WA, SA, TAS, ACT, NT, National)
  - Identifies identity-specific programs (Women/Indigenous/Migrant/Disability)
  - Only recommends when no specific tool/methodology exists
- **Assessment referrals:** Cards linking to specific element assessments
- **Turn tracking:** Moves toward recommendation after ~4 exchanges

### Styling (Jeton/Phamily/Osmo Applied)
- Exact header match to assessment-tool.html (90px logo)
- Same bird icon placement (bottom-right, 45px, 40% opacity)
- Same colour palette and typography
- Same animation curves and timing
- Clean pill buttons, subtle referral cards
