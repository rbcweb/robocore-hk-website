import { applyI18n, detectLang } from "./i18n.js";
import { mountShell } from "./shell.js";

function syncMegaActiveFromHash() {
  const page = document.body.dataset.page || "";
  document.querySelectorAll(".mega-model[href], .mega-extra[href]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const [base, hash] = href.split("#");
    let active = false;
    if (page === base || page === href) {
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

function initLang() {
  let lang = detectLang();
  applyI18n(lang);
  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.addEventListener("click", () => {
      lang = btn.dataset.lang;
      applyI18n(lang);
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
    window.location.href = `mailto:Info@robocore.ai?subject=${subject}&body=${body}`;
  });
}

const LAST_PRODUCT_KEY = "robocore:lastProduct";

/** Product detail / anchor pages worth remembering for catalog highlight */
function rememberCurrentProduct(page) {
  if (!page || page === "products.html" || page === "temifamily.html" || page === "index.html") {
    return;
  }
  const hash = location.hash.replace(/^#/, "");
  if (page === "pudu.html") {
    if (hash) sessionStorage.setItem(LAST_PRODUCT_KEY, `pudu.html#${hash}`);
    return;
  }
  // Single-product pages (temiv3, zpine, liftmodule, …)
  if (/\.html$/.test(page)) {
    sessionStorage.setItem(LAST_PRODUCT_KEY, page);
  }
}

function markCurrentProductCards(activeKey) {
  const page = document.body.dataset.page || "";
  const hash = location.hash.replace(/^#/, "");
  const remembered = sessionStorage.getItem(LAST_PRODUCT_KEY) || "";
  const current =
    activeKey ||
    (page === "pudu.html" && hash ? `pudu.html#${hash}` : null) ||
    (page !== "products.html" && page !== "temifamily.html" && page !== "pudu.html" && page !== "index.html"
      ? page
      : null) ||
    remembered;

  // Pudu multi-product page: articles with id
  document.querySelectorAll(".pudu-product-card[id]").forEach((el) => {
    const key = `pudu.html#${el.id}`;
    const on =
      page === "pudu.html" &&
      (hash ? el.id === hash : current === key);
    el.classList.toggle("is-current", Boolean(on));
  });

  // Catalog link cards (products / temifamily / index)
  document.querySelectorAll("a.card[href]").forEach((a) => {
    const href = (a.getAttribute("href") || "").split("?")[0];
    if (!href || href === "solutions.html") {
      a.classList.remove("is-current");
      return;
    }
    const on = Boolean(current) && (href === current || href === current.replace(/^\/+/, ""));
    a.classList.toggle("is-current", on);
  });
}

function initCurrentProductCards() {
  const page = document.body.dataset.page || "";
  rememberCurrentProduct(page);
  markCurrentProductCards();

  window.addEventListener("hashchange", () => {
    rememberCurrentProduct(page);
    markCurrentProductCards();
    syncMegaActiveFromHash();
  });

  // Pudu: scroll-spy so the in-view product card glows
  if (page !== "pudu.html") return;
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
        markCurrentProductCards(`pudu.html#${location.hash.replace(/^#/, "")}`);
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
        rememberCurrentProduct("pudu.html");
        sessionStorage.setItem(LAST_PRODUCT_KEY, `pudu.html#${bestId}`);
        markCurrentProductCards(`pudu.html#${bestId}`);
        // Keep mega menu in sync without fighting browser scroll-to-hash
        if (!lockFromHash) {
          document.querySelectorAll(".mega-model[href]").forEach((a) => {
            const href = a.getAttribute("href") || "";
            a.classList.toggle("is-active", href === `pudu.html#${bestId}`);
          });
        }
      }
    },
    { root: null, rootMargin: "-25% 0px -45% 0px", threshold: [0, 0.15, 0.35, 0.55, 0.75] }
  );
  cards.forEach((c) => io.observe(c));
}

function boot() {
  const page = document.body.dataset.page || "index.html";
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
