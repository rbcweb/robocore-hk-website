/** Shared header & footer injection */

// GitHub Pages lives under /repo-name/ — never hardcode root-absolute /assets/
const BASE = import.meta.env.BASE_URL || "/";
const asset = (path) => `${BASE}${String(path).replace(/^\//, "")}`;

const SOCIALS = [
  { href: "https://www.facebook.com/robocoretechnology/", label: "FB" },
  { href: "https://www.instagram.com/robocoretechnology/", label: "IG" },
  { href: "https://hk.linkedin.com/company/robocore-ai", label: "in" },
  { href: "https://www.youtube.com/@robocoreai", label: "YT" },
  { href: "https://x.com/robotemi", label: "X" },
];

const PRODUCT_NAV = {
  brands: [
    {
      id: "temi",
      labelKey: "nav.brand.temi",
      overviewHref: "temifamily.html",
      overviewKey: "nav.exploreSeries",
      models: [
        { name: "temi v3", href: "temiv3.html", typeKey: "nav.type.service" },
        { name: "temi Platform", href: "temiplatform.html", typeKey: "nav.type.chassis" },
        { name: "temi GO", href: "temigo.html", typeKey: "nav.type.delivery" },
        { name: "temi GO PRO", href: "temigopro.html", typeKey: "nav.type.quadDelivery" },
        { name: "Blackjack", href: "blackjack.html", typeKey: "nav.type.patrol" },
        { name: "Fourcast", href: "fourcast.html", typeKey: "nav.type.ad" },
      ],
    },
    {
      id: "pudu",
      labelKey: "nav.brand.pudu",
      overviewHref: "pudu.html",
      overviewKey: "nav.exploreSeries",
      models: [
        { name: "PuduBot", href: "pudu.html#pudubot", typeKey: "nav.type.foodDelivery" },
        { name: "BellaBot", href: "pudu.html#bellabot", typeKey: "nav.type.premiumFood" },
        { name: "HolaBot", href: "pudu.html#holabot", typeKey: "nav.type.premiumDelivery" },
        { name: "FlashBot", href: "pudu.html#flashbot", typeKey: "nav.type.buildingDelivery" },
        { name: "CC1", href: "pudu.html#cc1", typeKey: "nav.type.sweepScrub" },
        { name: "MT1", href: "pudu.html#mt1", typeKey: "nav.type.bulkWaste" },
        { name: "SH1", href: "pudu.html#sh1", typeKey: "nav.type.uprightScrub" },
        { name: "Puductor 2", href: "pudu.html#puductor", typeKey: "nav.type.uv" },
      ],
    },
  ],
  extras: [
    { name: "ZPINE", href: "zpine.html", typeKey: "nav.type.multiPlatform" },
    { name: "Lift Module", href: "liftmodule.html", typeKey: "nav.type.lift" },
    { name: "Yunji", href: "yunji.html", typeKey: "nav.type.indoorService" },
  ],
};

function isActive(current, href) {
  const base = href.split("#")[0];
  return current === base || current === href;
}

function navLink(href, key, current) {
  const active = isActive(current, href) ? " is-active" : "";
  return `<a href="${href}" class="nav-link${active}" data-i18n="${key}"></a>`;
}

function productsMega(current) {
  const brands = PRODUCT_NAV.brands
    .map((brand) => {
      const models = brand.models
        .map((m) => {
          const active = isActive(current, m.href) ? " is-active" : "";
          return `<a class="mega-model${active}" href="${m.href}"><span class="mega-model-name">${m.name}</span><span class="mega-model-type" data-i18n="${m.typeKey}"></span></a>`;
        })
        .join("");
      return `
        <div class="mega-col">
          <a class="mega-brand" href="${brand.overviewHref}" data-i18n="${brand.labelKey}"></a>
          <a class="mega-overview" href="${brand.overviewHref}" data-i18n="${brand.overviewKey}"></a>
          <div class="mega-models">${models}</div>
        </div>`;
    })
    .join("");

  const extras = PRODUCT_NAV.extras
    .map(
      (e) =>
        `<a class="mega-extra" href="${e.href}"><span>${e.name}</span><span class="mega-extra-type" data-i18n="${e.typeKey}"></span></a>`
    )
    .join("");

  return `
    <div class="nav-item nav-item-mega" data-mega>
      <button
        type="button"
        class="nav-link nav-mega-trigger${current === "products.html" || current.startsWith("temi") || current === "pudu.html" || current === "temifamily.html" || current === "zpine.html" || current === "liftmodule.html" || current === "yunji.html" || current === "blackjack.html" || current === "fourcast.html" ? " is-active" : ""}"
        aria-expanded="false"
        aria-controls="products-mega"
        data-mega-trigger
      >
        <span data-i18n="nav.products"></span>
        <svg class="nav-caret" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      <div class="mega-panel" id="products-mega" data-mega-panel hidden>
        <div class="mega-inner">
          <a class="mega-all" href="products.html" data-i18n="nav.allProducts"></a>
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

export function renderHeader(current = "index.html") {
  return `
  <header class="site-header" id="site-header">
    <div class="header-inner">
      <a class="logo" href="index.html" aria-label="Robocore">
        <img src="${asset("assets/logo/robocore-logo.png")}" alt="Robocore" width="160" height="42" />
      </a>
      <nav class="nav" id="primary-nav" aria-label="Primary">
        ${productsMega(current)}
        ${navLink("solutions.html", "nav.solutions", current)}
        ${navLink("news.html", "nav.news", current)}
        ${navLink("joinus.html", "nav.join", current)}
        ${navLink("contactus.html", "nav.contact", current)}
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
  const social = SOCIALS.map(
    (s) => `<a href="${s.href}" target="_blank" rel="noopener noreferrer">${s.label}</a>`
  ).join("");

  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="logo" href="index.html">
            <img src="${asset("assets/logo/robocore-logo.png")}" alt="Robocore" width="140" height="36" />
          </a>
          <p data-i18n="common.member" style="margin-top:1rem"></p>
          <p data-i18n="common.tagline"></p>
        </div>
        <div class="footer-col">
          <h4 data-i18n="common.products"></h4>
          <a href="products.html" data-i18n="nav.allProducts"></a>
          <a href="temifamily.html" data-i18n="nav.brand.temi"></a>
          <a href="pudu.html" data-i18n="nav.brand.pudu"></a>
          <a href="zpine.html">ZPINE</a>
          <a href="temiwarranty.html" data-i18n="nav.warranty"></a>
        </div>
        <div class="footer-col">
          <h4 data-i18n="common.companyCol"></h4>
          <a href="solutions.html" data-i18n="nav.solutions"></a>
          <a href="news.html" data-i18n="nav.news"></a>
          <a href="joinus.html" data-i18n="nav.join"></a>
          <a href="contactus.html" data-i18n="nav.contact"></a>
        </div>
        <div class="footer-col">
          <h4 data-i18n="common.contactCta"></h4>
          <p><a href="mailto:Info@robocore.ai">Info@robocore.ai</a></p>
          <p data-i18n="common.address"></p>
          <div class="socials" style="margin-top:1rem">${social}</div>
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
}
