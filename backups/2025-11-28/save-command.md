---
description: Save current session's work and conversation history
---

Please create a comprehensive session summary and save all work from this conversation. Follow these steps in order:

## Step 1: Create Session Summary Document

Create a new markdown file at:
`/home/janek/sova-mvp/SESSION_SUMMARY_{{DATE}}.md`

**Include in the summary:**

1. **Session Date & Overview**
   - Date: {{TODAY}}
   - Duration estimate
   - Primary objectives/topics

2. **Key Decisions Made**
   - List all important decisions or strategic choices
   - Include rationale for each decision
   - Note any UX insights or user feedback incorporated

3. **Work Completed**
   - Files created or modified (with paths and sizes)
   - Features implemented or bugs fixed
   - Documents written or updated
   - Research completed
   - Backups created (with locations)

4. **Important Context/Discoveries**
   - New information learned about the project
   - Insights or realizations
   - Problems identified and solved
   - User feedback or pain points discovered

5. **Skills & Technical Knowledge Acquired**
   - New tools/libraries learned (e.g., openpyxl, pandas)
   - Excel manipulation techniques
   - Workflows that worked well
   - Patterns to reuse in future sessions
   - What NOT to do (anti-patterns, mistakes avoided)

6. **Assessment Tool Evolution**
   - **Current Structure:** Document latest state
     - Primary files: ALLIVATE_AI_BACKEND.xlsx, Self Assessment Structure.xlsx
     - Sheet completion status (which sheets are 100%, which are in progress)
     - Total rows/questions/entries per sheet

   - **Changes Made This Session:**
     - What was added, removed, or restructured
     - Rationale for changes
     - UX improvements implemented

7. **Action Items / Next Steps**
   - What needs to be done next
   - Blockers or dependencies
   - Follow-up tasks for Jane
   - Recommended priorities

8. **Ideas Mentioned**
   - Capture any product ideas, features, or pivots discussed
   - Note if added to Product Ideas & Features Log

9. **Files Modified**
   - Complete list with descriptions
   - Line counts, row counts, cell updates where relevant
   - Before/after sizes if significant

10. **Questions Raised**
    - Unanswered questions or items needing clarification
    - Decisions Jane needs to make

## Step 2: Update README.md

Update `/home/janek/sova-mvp/README.md` with today's progress:

**Add or update relevant sections:**
- AI Backend status (completion percentages, new features)
- Self Assessment Structure changes
- New documents created
- Skills acquired that benefit the project
- Any new backups or verification documents

**Update these specific sections if changed:**
- "AI Backend - Source of Truth" (update completion status)
- "Self Assessment Structure" (note reorderings or improvements)
- Add new sections for new deliverables

## Step 3: Update Product Ideas Log (If New Ideas Mentioned)

If any new ideas were mentioned during this session, add them to:
`/home/janek/sova-mvp/Product Ideas & Features Log.md`

**Format:**
```markdown
## [Idea Name] - {{DATE}}

**Context:** [Why this came up]

**Description:** [What the idea is]

**Potential Impact:** [Why it matters]

**Status:** Idea/Under Consideration/Planned/Implemented
```

## Step 4: Update CLAUDE.md (If Technical Practices Changed)

**ONLY IF** we learned new best practices or workflows that future Claude sessions should know:

Add to `/home/janek/sova-mvp/CLAUDE.md` under appropriate sections:

**Sections to update:**
- Excel Manipulation Best Practices (if new patterns learned)
- Assessment Tool Current Structure (if structure changed)
- Common Mistakes to Avoid (if new anti-patterns discovered)
- Working with Documents (if new document patterns emerged)

**Example addition:**
```markdown
## [Section Name] (Updated {{DATE}})

### What We Learned
- [New pattern or practice]
- [Why it's important]
- [When to use it]

### Examples
[Code or process examples]

### Anti-patterns to Avoid
- ❌ Don't [bad practice]
- ✅ Do [good practice instead]
```

## Step 5: Create Comprehensive Backups

Create timestamped backups of all key files modified today:

```bash
# Create backup directory
mkdir -p "/home/janek/sova-mvp/backups/{{DATE}}"

# Backup all modified files
cp [modified files] "/home/janek/sova-mvp/backups/{{DATE}}/"
```

**Key files to always backup:**
- ALLIVATE_AI_BACKEND.xlsx
- Self Assessment Structure.xlsx
- README.md
- Session summaries
- Any other files modified during session

## Step 6: Git Commit

Commit all changes to GitHub with comprehensive message:

```bash
git add -A
git status  # Verify what's being committed
```

**Before committing, verify:**
- ✅ No important files being deleted (only temp files like ~$ Excel locks)
- ✅ All intended changes staged
- ✅ Backups created and staged

**Commit Message Format:**
```
[Brief Title - What was accomplished]

PRIMARY CHANGES:
1. [Most significant change with details]
2. [Second most significant change]
3. [Third most significant change]

DOCUMENTATION UPDATES:
- README.md: [what was updated]
- Session Summary: [key highlights]
- [Other docs updated]

CONTENT EXPANSION (if applicable):
- Sheet X: [before → after counts]
- Added: [number] new entries/tools/evidence

UX IMPROVEMENTS (if applicable):
- [User-facing improvement 1]
- [User-facing improvement 2]

SAFETY & BACKUPS:
- Created backups/{{DATE}}/ with [number] files
- [Other backup locations]

VERIFICATION:
✅ No important files deleted
✅ All work saved
✅ Backups created
✅ README reflects current state

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

Execute the commit and push to remote:
```bash
git commit -m "[message]"
git push  # Push to GitHub Pages (live)
git log --oneline -3  # Verify commit
```

## Step 7: Create Save Verification Document

Create a verification document for transparency:
`/home/janek/sova-mvp/SAVE_VERIFICATION_{{DATE}}.md`

**Include:**
- All Git commits from today (with hashes)
- All files modified (with before/after sizes)
- All backups created (with locations)
- Confirmation nothing was deleted
- Recovery instructions if needed
- Summary of work completed

## Step 8: Final Status Report

Provide Jane with a clear summary:

**Report Format:**
```
✅ EVERYTHING SAVED - COMPLETE!

## Git Commits Created
[List commits with hashes and brief descriptions]

## Files Modified
[List with before/after states]

## Backups Created
[List all backup locations]

## What's Protected
✅ [Protection 1]
✅ [Protection 2]
✅ [Protection 3]

## Current Status
[Completion percentages, next steps]

## Summary
[3-5 sentences describing what was accomplished]
```

## Critical Context for Next Session

**Document in session summary:**

1. **Current File Status:**
   - ALLIVATE_AI_BACKEND.xlsx: [X of Y sheets complete, current sizes]
   - Self Assessment Structure.xlsx: [current organization, total questions]
   - README.md: [last updated date, what it now contains]

2. **Excel Skills Available:**
   - openpyxl 3.1.2 and pandas 2.1.4 installed
   - Use openpyxl for all Excel manipulation
   - Use pandas for verification

3. **Assessment Structure:**
   - [Current primary working version]
   - [Reference-only versions]
   - [Organization pattern - Stage-first or Element-first]

4. **Key Workflows:**
   - [Most effective patterns used this session]
   - [Anti-patterns avoided]

5. **Next Session Priorities:**
   - [What should be tackled next]
   - [What Jane needs to prepare]

## Completion Checklist

Before finishing, verify:

- [ ] Session summary created in root directory
- [ ] README.md updated with today's work
- [ ] Product Ideas Log updated (if new ideas mentioned)
- [ ] CLAUDE.md updated (if new practices learned)
- [ ] Comprehensive backups created with timestamps
- [ ] Git status checked (no unwanted deletions)
- [ ] Git commit created with descriptive message
- [ ] Save verification document created
- [ ] Final status report provided to Jane
- [ ] All questions answered or documented as open items

This ensures complete continuity between sessions and nothing gets lost.
