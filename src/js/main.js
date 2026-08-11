import { applyI18n, detectLang } from "./i18n.js";
import { mountShell } from "./shell.js";
import { renderSpecsTable } from "./data/temi-specs.js";
import { pageHref, normalizePageId, hrefToPageId } from "./paths.js";

function syncMegaActiveFromHash() {
  const page = normalizePageId(document.body.dataset.page || "");
  document.querySelectorAll(".mega-model[href], .mega-extra[href]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const [pathPart, hash] = href.split("#");
    const hrefId = hrefToPageId(pathPart);
    let active = false;
    if (hrefId && hrefId === page) {
      if (!hash) active = true;
      else active = location.hash.replace(/^#/, "") === hash;
    }
    a.classList.toggle("is-active", active);
  });
}

function initNav() {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      if (!open) closeMega();
    });
  }

  initMegaMenu();
  window.addEventListener("hashchange", syncMegaActiveFromHash);
}

function closeMega() {
  document.querySelectorAll("[data-mega]").forEach((item) => {
    item.classList.remove("is-open");
    const trigger = item.querySelector("[data-mega-trigger]");
    const panel = item.querySelector("[data-mega-panel]");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    if (panel) panel.hidden = true;
  });
}

function openMega(item) {
  closeMega();
  item.classList.add("is-open");
  const trigger = item.querySelector("[data-mega-trigger]");
  const panel = item.querySelector("[data-mega-panel]");
  if (trigger) trigger.setAttribute("aria-expanded", "true");
  if (panel) panel.hidden = false;
}

function initMegaMenu() {
  const items = document.querySelectorAll("[data-mega]");
  if (!items.length) return;

  const isMobile = () => window.matchMedia("(max-width: 960px)").matches;
  let closeTimer = null;

  const cancelClose = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer = setTimeout(() => {
      if (!isMobile()) closeMega();
    }, 180);
  };

  items.forEach((item) => {
    const trigger = item.querySelector("[data-mega-trigger]");
    const panel = item.querySelector("[data-mega-panel]");
    if (!trigger || !panel) return;

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      cancelClose();
      const open = item.classList.contains("is-open");
      if (open) closeMega();
      else openMega(item);
    });

    // Desktop: keep open while pointer is on trigger OR panel (bridged by CSS)
    item.addEventListener("mouseenter", () => {
      if (isMobile()) return;
      cancelClose();
      openMega(item);
    });
    item.addEventListener("mouseleave", () => {
      if (isMobile()) return;
      scheduleClose();
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-mega]")) {
      cancelClose();
      closeMega();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cancelClose();
      closeMega();
    }
  });

  // Close mobile drawer when navigating
  const nav = document.getElementById("primary-nav");
  const toggle = document.getElementById("menu-toggle");
  document.querySelectorAll("#primary-nav a").forEach((a) => {
    a.addEventListener("click", () => {
      cancelClose();
      if (nav) nav.classList.remove("is-open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      closeMega();
    });
  });
}

function paintSpecsTables(lang) {
  document.querySelectorAll("[data-specs]").forEach((el) => {
    const id = el.getAttribute("data-specs");
    el.innerHTML = renderSpecsTable(id, lang);
  });
}

function initLang() {
  let lang = detectLang();
  applyI18n(lang);
  paintSpecsTables(lang);
  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.addEventListener("click", () => {
      lang = btn.dataset.lang;
      applyI18n(lang);
      paintSpecsTables(lang);
      const url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    });
  });
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const company = data.get("company") || "";
    const message = data.get("message") || "";
    const subject = encodeURIComponent(`[Robocore Contact] ${name} / ${company}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`
    );
    window.location.href = `mailto:info@robocore.ai?subject=${subject}&body=${body}`;
  });
}

const LAST_PRODUCT_KEY = "robocore:lastProduct";
/** Series pages that host multiple product cards with #anchors (like Pudu) */
const SERIES_PAGES = new Set(["pudu", "temifamily"]);
const CATALOG_PAGES = new Set(["products", "index"]);
const SKIP_CURRENT_SLUGS = new Set(["solutions", "temifamily", "pudu"]);

function seriesKey(page, id) {
  return `${normalizePageId(page)}#${id}`;
}

function normalizeStoredKey(key) {
  if (!key) return "";
  if (key.includes("#")) {
    const [p, id] = key.split("#");
    return seriesKey(p, id);
  }
  return normalizePageId(key);
}

/** Product detail pages worth remembering for catalog highlight */
const PRODUCT_DETAIL_PAGES = new Set([
  "temiv3",
  "temiplatform",
  "temigo",
  "temigopro",
  "blackjack",
  "fourcast",
  "pudubot",
  "bellabot",
  "flashbot",
  "t300",
  "t600",
  "cc1",
  "mt1",
  "sh1",
]);

/** Legacy /pudu/#id → /detail/ */
const PUDU_HASH_REDIRECT = {
  pudubot: "pudubot",
  bellabot: "bellabot",
  flashbot: "flashbot",
  t300: "t300",
  t600: "t600",
  cc1: "cc1",
  mt1: "mt1",
  sh1: "sh1",
};

function rememberCurrentProduct(page) {
  const p = normalizePageId(page);
  if (!p || CATALOG_PAGES.has(p)) return;
  const hash = location.hash.replace(/^#/, "");
  if (SERIES_PAGES.has(p)) {
    if (hash) sessionStorage.setItem(LAST_PRODUCT_KEY, seriesKey(p, hash));
    return;
  }
  if (PRODUCT_DETAIL_PAGES.has(p)) {
    sessionStorage.setItem(LAST_PRODUCT_KEY, p);
  }
}

function markCurrentProductCards(activeKey) {
  const page = normalizePageId(document.body.dataset.page || "");
  const hash = location.hash.replace(/^#/, "");
  const remembered = normalizeStoredKey(sessionStorage.getItem(LAST_PRODUCT_KEY) || "");
  const current =
    (activeKey ? normalizeStoredKey(activeKey) : null) ||
    (SERIES_PAGES.has(page) && hash ? seriesKey(page, hash) : null) ||
    (!SERIES_PAGES.has(page) && !CATALOG_PAGES.has(page) ? page : null) ||
    remembered;

  // Multi-product series cards (temi / pudu)
  document.querySelectorAll(".pudu-product-card[id]").forEach((el) => {
    const key = seriesKey(page, el.id);
    const on =
      SERIES_PAGES.has(page) &&
      (hash ? el.id === hash : current === key);
    el.classList.toggle("is-current", Boolean(on));
  });

  // Catalog link cards (products / index)
  document.querySelectorAll("a.card[href], a.product-tile[href]").forEach((a) => {
    const href = (a.getAttribute("href") || "").split("?")[0].split("#")[0];
    const hrefId = hrefToPageId(href);
    if (!hrefId || SKIP_CURRENT_SLUGS.has(hrefId)) {
      a.classList.remove("is-current");
      return;
    }
    const on = Boolean(current) && (hrefId === current || href === current);
    a.classList.toggle("is-current", on);
  });
}

function initCurrentProductCards() {
  const page = normalizePageId(document.body.dataset.page || "");
  rememberCurrentProduct(page);
  markCurrentProductCards();

  window.addEventListener("hashchange", () => {
    rememberCurrentProduct(page);
    markCurrentProductCards();
    syncMegaActiveFromHash();
  });

  // Series pages: scroll-spy so the in-view product card glows
  if (!SERIES_PAGES.has(page)) return;
  const cards = [...document.querySelectorAll(".pudu-product-card[id]")];
  if (!cards.length || !("IntersectionObserver" in window)) return;

  let lockFromHash = Boolean(location.hash);
  window.addEventListener("hashchange", () => {
    lockFromHash = true;
    window.setTimeout(() => {
      lockFromHash = false;
    }, 800);
  });

  const ratios = new Map();
  const io = new IntersectionObserver(
    (entries) => {
      if (lockFromHash && location.hash) {
        markCurrentProductCards(seriesKey(page, location.hash.replace(/^#/, "")));
        return;
      }
      entries.forEach((e) => {
        ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
      });
      let bestId = "";
      let best = 0;
      ratios.forEach((r, id) => {
        if (r > best) {
          best = r;
          bestId = id;
        }
      });
      if (bestId && best > 0.12) {
        const key = seriesKey(page, bestId);
        sessionStorage.setItem(LAST_PRODUCT_KEY, key);
        markCurrentProductCards(key);
        if (!lockFromHash) {
          document.querySelectorAll(".mega-model[href]").forEach((a) => {
            const hrefId = hrefToPageId(a.getAttribute("href") || "");
            a.classList.toggle("is-active", hrefId === bestId);
          });
        }
      }
    },
    { root: null, rootMargin: "-25% 0px -45% 0px", threshold: [0, 0.15, 0.35, 0.55, 0.75] }
  );
  cards.forEach((c) => io.observe(c));
}

function boot() {
  const page = normalizePageId(document.body.dataset.page || "index");
  // Old deep links: /pudu/#bellabot → /bellabot/
  if (page === "pudu") {
    const hash = location.hash.replace(/^#/, "");
    const dest = PUDU_HASH_REDIRECT[hash];
    if (dest) {
      location.replace(pageHref(dest) + location.search);
      return;
    }
  }
  mountShell(page);
  initNav();
  initLang();
  initReveal();
  initContactForm();
  initCurrentProductCards();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
