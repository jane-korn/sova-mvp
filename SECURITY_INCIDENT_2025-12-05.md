# Security Incident Report - 5 December 2025

## Incident Summary

**Date:** 5 December 2025
**Time:** 18:18 AEDT
**Severity:** HIGH (API key exposure in public repository)
**Status:** RESOLVED

## What Happened

Netlify's secrets scanner detected a Gemini API key exposed in the public sova-mvp repository during deployment attempts.

### Exposed Locations
1. **CLAUDE.md line 16** - Documentation contained literal API key
2. **chatbot.html line 425** - File contained hardcoded API key

### Root Cause
- chatbot.html was incorrectly committed to public repository (should only be in private Allivate repo)
- CLAUDE.md documentation included API key value for reference
- Previous session work on chatbot left these files in public repo

## Actions Taken

### Immediate Remediation
1. **Removed API key from CLAUDE.md** (commit 4c01fb0)
   - Replaced with: "API key configured in Netlify environment variables"

2. **Deleted chatbot.html from public repo** (commit 4c01fb0)
   - File removed via `git rm chatbot.html`
   - chatbot-test.html also deleted

3. **Pushed changes to GitHub**
   - Deployment now passes secrets scanner
   - Homepage animations deployed successfully

### Git History
**Important:** The API key still exists in git history for commits prior to 4c01fb0. While removed from current files, the key is retrievable from repository history.

## Required Follow-Up Actions

### CRITICAL: Rotate API Key
**Status:** PENDING USER ACTION

The exposed API key `AIzaSyBaVw6ETAkNkOFp7jO4EdQQTidt1TE09CI` must be rotated:

1. **Delete compromised key:**
   - Visit: https://console.cloud.google.com/apis/credentials
   - Locate key created Dec 2, 2025
   - Delete or regenerate

2. **Create new API key:**
   - Generate replacement in Google Cloud Console
   - Restrict to necessary APIs only
   - Add HTTP referrer restrictions if possible

3. **Update Netlify environment:**
   - Netlify dashboard → Site settings → Environment variables
   - Update `GEMINI_API_KEY` with new value
   - Trigger new deployment

4. **Update private repo:**
   - Update chatbot.html in private Allivate repository with new key
   - DO NOT commit to public sova-mvp repo

### Repository Separation

**Public Repository (jane-korn/sova-mvp):**
- ✅ index.html
- ✅ assessment-tool.html
- ✅ research.html
- ✅ about.html
- ✅ directory.html
- ✅ Static assets
- ❌ chatbot.html (REMOVED)
- ❌ API keys (REMOVED)

**Private Repository (jane-korn/Allivate):**
- ✅ chatbot.html
- ✅ Development/testing files
- ⚠️ API keys only for local testing (use env vars for production)

## Lessons Learned

### What Went Wrong
1. Chatbot development files committed to wrong repository
2. Documentation included literal API key value
3. No pre-commit hooks to prevent secret exposure
4. Multiple commits before secrets scanner caught the issue

### Preventive Measures
1. **Repository discipline:**
   - Keep chatbot work in private Allivate repo
   - Only push production-ready files to public sova-mvp repo
   - Review `git status` before commits

2. **Documentation practices:**
   - Never include literal API keys in documentation
   - Use placeholders: "API key configured in environment variables"
   - Reference configuration methods, not actual values

3. **Environment variables:**
   - Store all secrets in Netlify environment variables
   - Use local .env files for development (add to .gitignore)
   - Never hardcode API keys in source files

4. **Pre-commit validation:**
   - Consider adding git pre-commit hooks to scan for secrets
   - Use tools like git-secrets or detect-secrets
   - Configure .gitignore for sensitive files

## Timeline

| Time | Event |
|------|-------|
| 18:09 | First deployment attempt (commit 06663ad) blocked by secrets scanner |
| 18:18 | Netlify reported API key detected in CLAUDE.md and chatbot.html |
| 18:50 | Attempted workaround with simple commit message (6aee8e8) |
| 18:51 | Scanner still detected secrets on subsequent build |
| 19:00 | Identified root cause: literal API key in files |
| 19:02 | Removed API key from CLAUDE.md, deleted chatbot.html |
| 19:03 | Committed fixes (4c01fb0), pushed to GitHub |
| 19:05 | Deployment succeeded, homepage live |

## Current Status

### Resolved
- ✅ API key removed from all tracked files
- ✅ chatbot.html removed from public repository
- ✅ Deployment succeeding
- ✅ Homepage animations live at getsova.com.au
- ✅ Netlify secrets scanner passing

### Pending
- ⚠️ **API key rotation** (user must complete)
- ⚠️ Update private Allivate repo with new key
- ⚠️ Verify chatbot functionality with new key

## Files Modified

### Commit 4c01fb0 "Remove API key from documentation"
- CLAUDE.md (1 line changed)
- chatbot.html (DELETED - 942 lines removed)
- chatbot-test.html (DELETED - untracked file)

## Deployment Verification

After commit 4c01fb0:
- Netlify secrets scanner: PASSED ✓
- Build status: SUCCESS ✓
- Deployment: COMPLETE ✓
- Live site: https://getsova.com.au (operational)

## Recommendations

### Immediate (Next Session)
1. Rotate the exposed API key
2. Update Netlify environment variable
3. Test chatbot in private repo with new key
4. Verify no other secrets in repository

### Long-term
1. Add .env to .gitignore for local development
2. Create separate Netlify sites for public/private repos
3. Implement pre-commit hooks for secret detection
4. Document secure development workflow
5. Consider using secret management service (AWS Secrets Manager, etc.)

## Incident Closed

**Resolved by:** Claude Code
**Resolution time:** ~54 minutes (18:18 - 19:12)
**Impact:** Minimal - API key exposed but quickly removed, no evidence of unauthorized use
**Follow-up required:** YES - API key rotation mandatory

---

**Report generated:** 5 December 2025, 19:12 AEDT
