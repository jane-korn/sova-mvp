# Sova Security Setup Guide

## What's Already Implemented

### 1. Security Headers (netlify.toml)
- X-Content-Type-Options: Prevents MIME sniffing
- X-Frame-Options: Prevents clickjacking
- X-XSS-Protection: XSS filtering
- Referrer-Policy: Limits referrer data
- Strict-Transport-Security: Forces HTTPS
- Content-Security-Policy: Controls allowed resources

### 2. Anti-Copy Protection (all pages)
- Right-click disabled
- Keyboard shortcuts blocked (Ctrl+U, F12, Ctrl+Shift+I)
- Text selection disabled (except in input fields)

### 3. Copyright Watermarks (all pages)
- Legal notice in HTML comments
- Footer copyright notices
- Terms of Service page with prohibited uses

### 4. API Protection (chat.js)
- API key hidden in Netlify environment variables
- Rate limiting: 20 requests per minute per IP
- Request size limits: 50KB max
- Input validation

### 5. Legal Protection
- Terms of Service page (terms.html)
- DMCA notice preparation
- Australian Copyright Act 1968 referenced

---

## Manual Setup Required

### Google Alerts (Plagiarism Monitoring)

Set up alerts to notify you if your content appears elsewhere:

1. Go to https://www.google.com/alerts
2. Create alerts for:
   - `"Sova" startup assessment Australia`
   - `"9 Elements" business assessment`
   - `"Governance Purpose Strategy Marketing" assessment`
   - `site:jane-korn.github.io -site:jane-korn.github.io` (to find copies)
3. Set frequency to "As-it-happens"
4. Deliver to: your email

**Cost:** Free

---

### Cloudflare Turnstile (CAPTCHA - Optional)

For additional bot protection, add Cloudflare Turnstile:

1. Sign up at https://dash.cloudflare.com
2. Go to Turnstile → Add Widget
3. Enter your site: `imaginative-longma-709f5d.netlify.app`
4. Choose "Managed" mode (invisible to most users)
5. Copy your Site Key and Secret Key

**Add to Netlify Environment Variables:**
- `TURNSTILE_SITE_KEY` = your site key
- `TURNSTILE_SECRET_KEY` = your secret key

**Cost:** Free (1M requests/month)

---

### Copyscape (Plagiarism Detection - Optional)

For active plagiarism checking:

1. Sign up at https://www.copyscape.com
2. Enter your URLs to check for copies
3. Set up Copysentry for automatic monitoring ($5/month)

---

## If Someone Copies Your Content

### Step 1: Document Everything
- Take screenshots with timestamps
- Save the copied page using archive.org
- Note the domain and hosting provider

### Step 2: Send DMCA Takedown Notice
Use this template:

```
Subject: DMCA Takedown Notice

I am writing to notify you of copyright infringement on your platform.

Original Work:
- URL: [your URL]
- Owner: Sova Pty Ltd
- First published: [date]

Infringing Content:
- URL: [their URL]
- Description: [what was copied]

I have a good faith belief that use of the copyrighted materials described above is not authorised by the copyright owner, its agent, or the law.

I swear, under penalty of perjury, that the information in this notification is accurate and that I am the copyright owner or am authorised to act on behalf of the owner.

Signature: [Your name]
Date: [Date]
Email: jane.korneyko@gmail.com
```

### Step 3: Report to:
- The website's hosting provider (find via WHOIS lookup)
- Google (for search removal): https://support.google.com/legal/troubleshooter/1114905
- GitHub (if hosted there): https://github.com/contact/dmca

---

## Security Limitations (Be Realistic)

**What IS protected:**
- Casual copycats deterred by anti-copy measures
- Automated scrapers blocked by rate limiting
- Legal recourse available through DMCA/copyright

**What is NOT protected:**
- Determined developers can still view source
- Someone with browser extensions can bypass protections
- Your methodology can be observed and recreated

**Your real moat:**
- Your 15 years of expertise
- Your knowledge base (281 tools, 140 failure quotes)
- Your brand and reputation
- Your user relationships and data

---

## Maintenance Checklist

**Monthly:**
- [ ] Check Google Alerts for copies
- [ ] Review Netlify function logs for abuse
- [ ] Run Copyscape check on key pages

**If launching paid version:**
- [ ] Add user authentication
- [ ] Move sensitive logic server-side
- [ ] Consider Cloudflare WAF ($20/month)
- [ ] Add watermarking to assessment results

---

Last updated: 2 December 2025
