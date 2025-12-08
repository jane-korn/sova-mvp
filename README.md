# Sova Chatbot - Beta Deployment

AI-powered chatbot using Gemini 2.5 Flash for Sova startup assessment tool.

## Files

- `chatbot.html` - Main chatbot interface
- `config.js` - Shared configuration
- `directory-data.js` - Australian startup directory (162 entries)
- `sova-knowledge-base.json` - Full knowledge base (480 KB)
- `netlify/functions/chat.js` - Gemini API proxy
- `netlify.toml` - Netlify configuration
- `package.json` - Dependencies

## Repository

**GitHub:** https://github.com/jane-korn/sova-mvp/tree/chatbot-beta

## Deployment

This folder is designed for Netlify deployment.

### Required Environment Variable

Set in Netlify:
- `GEMINI_API_KEY` - Your Google Gemini API key

### Deploy URL

After deployment, chatbot will be available at:
`https://[your-netlify-site].netlify.app/chatbot.html`

## Knowledge Base

Built from source documents in `/home/janek/Sova/private/Chatbot/`:
- 281 tools and methodologies
- 115 assessment questions
- 140 failure quotes
- 162 directory entries (grants, accelerators, programs)
- All Australian states/territories covered

## API Configuration

- Local testing: Direct API call to Gemini
- Live deployment: Netlify Function proxy (/.netlify/functions/chat)

## Security

- API key stored in Netlify environment variables
- Never committed to git
- Proxied through Netlify Functions

---

**Source:** `/home/janek/Sova/private/Chatbot/`
**Live Site:** https://getsova.com.au
