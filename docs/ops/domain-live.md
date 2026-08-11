# Robocore HK — live domain (2026-08-03)

**Critical:** Official site is **https://robocore.ai/** on GitHub Pages. Not Wix hosting.

## DNS (managed in Wix Domains → DNS Records)

| Record | Value | Notes |
|--------|--------|------|
| A `robocore.ai` ×4 | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` | GitHub Pages apex |
| CNAME `www` | `rbcweb.github.io` | www support |
| MX | Outlook (`robocore-ai.mail.protection.outlook.com`) | **Do not touch** — email |
| TXT SPF/MS | keep | **Do not touch** |
| `api-cn`, `robserver`, `stream`, etc. | company services | **Do not touch** |

NS: `ns0.wixdns.net` / `ns1.wixdns.net` (still Wix DNS panel).

## GitHub Pages

- Repo: `rbcweb/robocore-hk-website`
- Custom domain: `robocore.ai`
- `public/CNAME` = `robocore.ai`
- Build: `BASE_PATH=/` in `.github/workflows/deploy.yml`
- Clean URLs: `scripts/clean-urls.mjs` after vite build
- Prefer **Enforce HTTPS** when checkbox works

## Wix dashboard

- Red banner “domain is set to point away from Wix” = **expected**. Do **not** click Try Again.
- Domain renewal still needed. Site content is not served by Wix.

## Branding

- Business cards / canonical: **robocore.ai** (no www)
- Tab title all pages: **Robocore Hong Kong** only

## Local path

`/Users/sang/Documents/Robocore HK website`
