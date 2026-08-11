# Robocore HK website — deploy workflow

**Live:** https://robocore.ai/  
**Local:** `/Users/sang/Documents/Robocore HK website`  
**Repo:** `rbcweb/robocore-hk-website` → push `main` → GitHub Actions Pages

When the user asks to update the Robocore HK website:

1. **Do all work locally first**
   - Edit, `npm run build` / `npm run dev` / preview
   - Commit locally is OK if useful; **do not push** until approved

2. **Wait for explicit OK** (e.g. 「OK」「可以上」「publish」「推官方」「ok push」)

3. **Only then** `git push origin main`

## Build rules (must keep)

- `BASE_PATH=/` for production (custom domain) — see `.github/workflows/deploy.yml`
- `npm run build` runs `vite build && node scripts/clean-urls.mjs`
- `public/CNAME` must stay `robocore.ai`
- New pages: register in `vite.config.js` `pages` list + HTML + clean URL links via `/slug/` or `pageHref()`

## Never

- Auto-push without user approval
- Change apex/www DNS back to Wix for the marketing site without user request
- Touch MX / email DNS records when editing domain notes
