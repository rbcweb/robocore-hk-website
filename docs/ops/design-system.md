# Robocore HK website — design foundation (baseline)

**Rule (user lock, 2026-07-30):** 以上所有 design 都係基礎；日後有更新都係跟返呢啲 design.  
**2026-08-03 updates** folded in (domain live, clean URLs, nav no glow, tab title).

All future updates **must** follow this design system. Do not invent new visual languages unless the user explicitly redesigns.

**Local path:** `/Users/sang/Documents/Robocore HK website`  
**Live:** **https://robocore.ai/**  
**Deploy:** local first → user OK → push `main` only  
**Also in repo:** `PROJECT_MEMORY.md`

## Brand / tokens
- Background: `#141416` (`--bg-dark`), cards `#1b1c1e` / `#222326`
- Accent (temi green): `#1DF0A2` (`--accent`)
- Soft text: `--text-soft` / muted for secondary
- Font stack (single family site-wide): `PingFang TC`, `Noto Sans TC`, `Helvetica Neue`, Arial, sans-serif
- Company email always **lowercase**: `info@robocore.ai`
- EN CEO name in news: **Roy Lim** (ZH: 林朗熙) — never invent names
- Browser tab title (all pages): **`Robocore Hong Kong`** only (no page-name prefix)

## Domain & URLs
- Official: **https://robocore.ai/** (no www preferred)
- Clean paths: `/products/`, `/temiv3/`, etc. — **no `.html` in address bar**
- Helpers: `src/js/paths.js` (`pageHref`, `normalizePageId`)
- Build: `BASE_PATH=/` + `scripts/clean-urls.mjs`
- Details: `~/.grok/memory/user/robocore-domain-live.md`

## Interaction / glow
- **Top nav tabs + Products mega trigger + mega product rows + mega extras:**
  - Hover/active = **accent text color only**
  - **No** green background fill, **no** box-shadow glow, **no** text-shadow lamp (2026-08-03 user decision)
  - **No** outline / 1px ring / border frame
- Product cards: hover = slight lift only; **is-current** = soft temi green glow (selected product)
- Do **not** use green border on card hover
- Solutions icons: soft green radial glow behind glyphs; **no** gray box / green stroke frame

## Dividers
- Homepage section dividers: thin **temi green horizontal gradient** (fade edges, dark/low opacity)
- Specs lists: **no lines, no table chrome** — text only (green uppercase label + soft value)

## Navigation
- Order: **Products → News → Solutions → Join → Contact**
- Mega menu: bilingual type labels; **EN is source of truth**, ZH mirrors meaning
- Products: series pages (cards) → detail pages with hero + specs text list

## News
- List: `news-card`; short source chips (`am730` / `on.cc` / `IG`) **width: fit-content**
- Detail: summary + image + source + original link; IG external only
- Homepage: News section present

## Forms (Contact)
- Typed input text + caret: **temi green**
- Placeholder stays muted gray

## Content patterns
- Product series (temi / Pudu): clickable cards → product page (stage hero + text specs)
- Specs: detailed where possible from public literature
- i18n via `src/js/i18n.js` + `src/js/data/`

## Don’t
- Reintroduce nav/mega **green background glow** unless user asks
- Reintroduce thick borders, full green outline frames, table-style specs with lines
- Auto-push without user approval
- Guess people’s English names
- Point DNS back to Wix for the marketing site / click Wix “Try Again” for domain
- Build with `BASE_PATH=/robocore-hk-website/` while primary is custom domain
