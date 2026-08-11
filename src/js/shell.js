/** Shared header & footer injection */

import { BASE, asset, pageHref, normalizePageId, hrefToPageId } from "./paths.js";

/** Monochrome SVGs — inherit currentColor (soft → accent on hover) */
const SOCIAL_ICONS = {
  facebook:
    '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>',
  instagram:
    '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>',
  linkedin:
    '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/></svg>',
  youtube:
    '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.2 3.5-6.2 3.5z"/></svg>',
};

const SOCIALS = [
  { href: "https://www.facebook.com/robocoretechnology/", label: "Facebook", icon: "facebook" },
  { href: "https://www.instagram.com/robocoretechnology/", label: "Instagram", icon: "instagram" },
  { href: "https://hk.linkedin.com/company/robocore-ai", label: "LinkedIn", icon: "linkedin" },
  { href: "https://www.youtube.com/@robocoreai", label: "YouTube", icon: "youtube" },
];

export function renderSocials() {
  return SOCIALS.map((s) => {
    const svg = SOCIAL_ICONS[s.icon] || "";
    return `<a class="social-link" href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}" title="${s.label}">${svg}<span class="visually-hidden">${s.label}</span></a>`;
  }).join("");
}

const PRODUCT_NAV = {
  brands: [
    {
      id: "temi",
      labelKey: "nav.brand.temi",
      overview: "temifamily",
      overviewKey: "nav.exploreSeries",
      models: [
        { name: "temi v3", slug: "temiv3", typeKey: "nav.type.service" },
        { name: "temi Platform", slug: "temiplatform", typeKey: "nav.type.chassis" },
        { name: "temi GO", slug: "temigo", typeKey: "nav.type.delivery" },
        { name: "temi GO PRO", slug: "temigopro", typeKey: "nav.type.gopro" },
        { name: "Blackjack", slug: "blackjack", typeKey: "nav.type.patrol" },
        { name: "Fourcast", slug: "fourcast", typeKey: "nav.type.ad" },
      ],
    },
    {
      id: "pudu",
      labelKey: "nav.brand.pudu",
      overview: "pudu",
      overviewKey: "nav.exploreSeries",
      models: [
        { name: "PuduBot 2", slug: "pudubot", typeKey: "nav.type.foodDelivery" },
        { name: "BellaBot", slug: "bellabot", typeKey: "nav.type.premiumFood" },
        { name: "FlashBot", slug: "flashbot", typeKey: "nav.type.buildingDelivery" },
        { name: "CC1", slug: "cc1", typeKey: "nav.type.sweepScrub" },
        { name: "MT1", slug: "mt1", typeKey: "nav.type.bulkWaste" },
        { name: "SH1", slug: "sh1", typeKey: "nav.type.uprightScrub" },
      ],
    },
  ],
  extras: [
    { name: "ZPINE", slug: "zpine", typeKey: "nav.type.multiPlatform" },
    { nameKey: "lift.title", slug: "liftmodule", typeKey: "nav.type.lift" },
  ],
};

const PRODUCT_SECTION_SLUGS = new Set([
  "products",
  "temifamily",
  "pudu",
  "zpine",
  "liftmodule",
  "temiv3",
  "temiplatform",
  "temigo",
  "temigopro",
  "blackjack",
  "fourcast",
  "pudubot",
  "bellabot",
  "flashbot",
  "cc1",
  "mt1",
  "sh1",
]);

/** Solutions mega — same structure as products (groups ≈ brands) */
const SOLUTION_NAV = {
  groups: [
    {
      labelKey: "nav.sol.group.service",
      overview: "solutions",
      overviewKey: "nav.exploreSolutions",
      items: [
        { slug: "solution-healthcare", titleKey: "sol.healthcare.title", typeKey: "nav.sol.type.healthcare" },
        { slug: "solution-hospitality", titleKey: "sol.hotel.title", typeKey: "nav.sol.type.hotel" },
        { slug: "solution-clinic", titleKey: "sol.clinic.title", typeKey: "nav.sol.type.clinic" },
        { slug: "solution-building", titleKey: "sol.building.title", typeKey: "nav.sol.type.building" },
        { slug: "solution-stem", titleKey: "sol.stem.title", typeKey: "nav.sol.type.stem" },
        { slug: "solution-iot", titleKey: "sol.iot.title", typeKey: "nav.sol.type.iot" },
      ],
    },
    {
      labelKey: "nav.sol.group.commerce",
      overview: "solutions",
      overviewKey: "nav.exploreSolutions",
      items: [
        { slug: "solution-fb", titleKey: "sol.fb.title", typeKey: "nav.sol.type.fb" },
        { slug: "solution-mall", titleKey: "sol.mall.title", typeKey: "nav.sol.type.mall" },
        { slug: "solution-retail", titleKey: "sol.retail.title", typeKey: "nav.sol.type.retail" },
        { slug: "solution-expo", titleKey: "sol.expo.title", typeKey: "nav.sol.type.expo" },
        { slug: "solution-entertainment", titleKey: "sol.ent.title", typeKey: "nav.sol.type.ent" },
        { slug: "solution-si", titleKey: "sol.si.title", typeKey: "nav.sol.type.si" },
      ],
    },
  ],
};

const SOLUTION_SECTION_SLUGS = new Set([
  "solutions",
  "solution-healthcare",
  "solution-hospitality",
  "solution-stem",
  "solution-building",
  "solution-fb",
  "solution-mall",
  "solution-clinic",
  "solution-iot",
  "solution-retail",
  "solution-expo",
  "solution-entertainment",
  "solution-si",
]);

function isActive(current, href) {
  const [pathPart, hash] = String(href).split("#");
  const hrefId = hrefToPageId(pathPart);
  const curId = normalizePageId(current);
  if (!hrefId || hrefId !== curId) return false;
  if (!hash) return true;
  const currentHash = (typeof location !== "undefined" ? location.hash : "").replace(/^#/, "");
  return currentHash === hash;
}

function navLink(slug, key, current) {
  const href = pageHref(slug);
  const active = isActive(current, href) ? " is-active" : "";
  return `<a href="${href}" class="nav-link${active}" data-i18n="${key}"></a>`;
}

function productsMega(current) {
  const cur = normalizePageId(current);
  const brands = PRODUCT_NAV.brands
    .map((brand) => {
      const overviewHref = pageHref(brand.overview);
      const models = brand.models
        .map((m) => {
          const href = pageHref(m.slug);
          const active = isActive(cur, href) ? " is-active" : "";
          return `<a class="mega-model${active}" href="${href}"><span class="mega-model-name">${m.name}</span><span class="mega-model-type" data-i18n="${m.typeKey}"></span></a>`;
        })
        .join("");
      return `
        <div class="mega-col">
          <a class="mega-brand" href="${overviewHref}" data-i18n="${brand.labelKey}"></a>
          <a class="mega-overview" href="${overviewHref}" data-i18n="${brand.overviewKey}"></a>
          <div class="mega-models">${models}</div>
        </div>`;
    })
    .join("");

  const extras = PRODUCT_NAV.extras
    .map((e) => {
      const name = e.nameKey
        ? `<span data-i18n="${e.nameKey}"></span>`
        : `<span>${e.name}</span>`;
      const type = e.typeKey
        ? `<span class="mega-extra-type" data-i18n="${e.typeKey}"></span>`
        : "";
      const href = pageHref(e.slug);
      const active = isActive(cur, href) ? " is-active" : "";
      return `<a class="mega-extra${active}" href="${href}">${name}${type}</a>`;
    })
    .join("");

  const productsActive = PRODUCT_SECTION_SLUGS.has(cur) ? " is-active" : "";

  return `
    <div class="nav-item nav-item-mega" data-mega="products">
      <button
        type="button"
        class="nav-link nav-mega-trigger${productsActive}"
        aria-expanded="false"
        aria-controls="products-mega"
        data-mega-trigger
      >
        <span data-i18n="nav.products"></span>
        <svg class="nav-caret" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      <div class="mega-panel" id="products-mega" data-mega-panel hidden>
        <div class="mega-inner">
          <a class="mega-all" href="${pageHref("products")}" data-i18n="nav.allProducts"></a>
          <div class="mega-grid">
            ${brands}
          </div>
          <div class="mega-footer-row">
            <span class="mega-footer-label" data-i18n="nav.platforms"></span>
            <div class="mega-extras">${extras}</div>
          </div>
        </div>
      </div>
    </div>`;
}

function solutionsMega(current) {
  const cur = normalizePageId(current);
  const cols = SOLUTION_NAV.groups
    .map((group) => {
      const overviewHref = pageHref(group.overview);
      const items = group.items
        .map((item) => {
          const href = pageHref(item.slug);
          const active = isActive(cur, href) ? " is-active" : "";
          return `<a class="mega-model${active}" href="${href}"><span class="mega-model-name" data-i18n="${item.titleKey}"></span><span class="mega-model-type" data-i18n="${item.typeKey}"></span></a>`;
        })
        .join("");
      return `
        <div class="mega-col">
          <a class="mega-brand" href="${overviewHref}" data-i18n="${group.labelKey}"></a>
          <a class="mega-overview" href="${overviewHref}" data-i18n="${group.overviewKey}"></a>
          <div class="mega-models">${items}</div>
        </div>`;
    })
    .join("");

  const solutionsActive = SOLUTION_SECTION_SLUGS.has(cur) ? " is-active" : "";

  return `
    <div class="nav-item nav-item-mega" data-mega="solutions">
      <button
        type="button"
        class="nav-link nav-mega-trigger${solutionsActive}"
        aria-expanded="false"
        aria-controls="solutions-mega"
        data-mega-trigger
      >
        <span data-i18n="nav.solutions"></span>
        <svg class="nav-caret" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      <div class="mega-panel" id="solutions-mega" data-mega-panel hidden>
        <div class="mega-inner">
          <a class="mega-all" href="${pageHref("solutions")}" data-i18n="nav.allSolutions"></a>
          <div class="mega-grid">
            ${cols}
          </div>
        </div>
      </div>
    </div>`;
}

export function renderHeader(current = "index") {
  const cur = normalizePageId(current);
  const newsCurrent = cur.startsWith("news") ? "news" : cur;
  return `
  <header class="site-header" id="site-header">
    <div class="header-inner">
      <a class="logo" href="${pageHref("index")}" aria-label="Robocore">
        <img src="${asset("assets/logo/robocore-logo.png")}" alt="Robocore" width="200" height="52" />
      </a>
      <nav class="nav" id="primary-nav" aria-label="Primary">
        ${productsMega(cur)}
        ${navLink("news", "nav.news", newsCurrent)}
        ${solutionsMega(cur)}
        ${navLink("joinus", "nav.join", cur)}
        ${navLink("contactus", "nav.contact", cur)}
      </nav>
      <div class="header-actions">
        <div class="lang-switch" role="group" aria-label="Language">
          <button type="button" data-lang="zh">繁</button>
          <button type="button" data-lang="en">EN</button>
        </div>
        <button class="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;
}

export function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="logo" href="${pageHref("index")}">
            <img src="${asset("assets/logo/robocore-logo.png")}" alt="Robocore" width="140" height="36" />
          </a>
          <p data-i18n="common.member" style="margin-top:1rem"></p>
          <p data-i18n="common.tagline"></p>
        </div>
        <div class="footer-col">
          <h4 data-i18n="common.products"></h4>
          <a href="${pageHref("products")}" data-i18n="nav.allProducts"></a>
          <a href="${pageHref("temifamily")}" data-i18n="nav.brand.temi"></a>
          <a href="${pageHref("pudu")}" data-i18n="nav.brand.pudu"></a>
          <a href="${pageHref("zpine")}">ZPINE</a>
          <a href="${pageHref("temiwarranty")}" data-i18n="nav.warranty"></a>
        </div>
        <div class="footer-col">
          <h4 data-i18n="common.companyCol"></h4>
          <a href="${pageHref("solutions")}" data-i18n="nav.solutions"></a>
          <a href="${pageHref("news")}" data-i18n="nav.news"></a>
          <a href="${pageHref("joinus")}" data-i18n="nav.join"></a>
          <a href="${pageHref("contactus")}" data-i18n="nav.contact"></a>
        </div>
        <div class="footer-col">
          <h4 data-i18n="common.contactCta"></h4>
          <p><a href="mailto:info@robocore.ai">info@robocore.ai</a></p>
          <p data-i18n="common.address"></p>
          <div class="socials" style="margin-top:1rem">${renderSocials()}</div>
        </div>
      </div>
      <div class="footer-bottom">
        <span data-i18n="common.rights"></span>
        <span data-i18n="common.company"></span>
      </div>
    </div>
  </footer>`;
}

export function mountShell(currentPage) {
  const headerMount = document.getElementById("site-header-mount");
  const footerMount = document.getElementById("site-footer-mount");
  if (headerMount) headerMount.outerHTML = renderHeader(currentPage);
  if (footerMount) footerMount.outerHTML = renderFooter();
  document.querySelectorAll("[data-socials]").forEach((el) => {
    el.innerHTML = renderSocials();
  });
}

// re-export for convenience
export { BASE, asset, pageHref, normalizePageId };
