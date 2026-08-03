/** Clean URL helpers — pages live at /slug/ (no .html in address bar) */

export const BASE = import.meta.env.BASE_URL || "/";

export function asset(path) {
  return `${BASE}${String(path).replace(/^\//, "")}`;
}

/** "products" | "index" | "products.html" → "/products/" | "/" */
export function pageHref(slug) {
  const s = normalizePageId(slug);
  if (s === "index") return BASE;
  return `${BASE}${s}/`;
}

/** data-page, pathname, or href fragment → stable page id (no .html) */
export function normalizePageId(value) {
  if (value == null || value === "") return "index";
  let v = String(value).split("#")[0].split("?")[0].trim();
  if (!v || v === "/" || v === "./") return "index";

  // strip origin-style noise
  v = v.replace(/^https?:\/\/[^/]+/i, "");

  // strip BASE prefix if present
  const baseTrim = BASE.replace(/\/+$/, "");
  if (baseTrim && baseTrim !== "" && v.startsWith(baseTrim + "/")) {
    v = v.slice(baseTrim.length);
  } else if (baseTrim && v === baseTrim) {
    return "index";
  }

  v = v.replace(/\.html$/i, "");
  v = v.replace(/^\/+|\/+$/g, "");
  if (!v || v === "index") return "index";
  return v;
}

/** href → page id, or null for external / non-page */
export function hrefToPageId(href) {
  if (!href) return null;
  const raw = String(href).trim();
  if (
    raw.startsWith("http://") ||
    raw.startsWith("https://") ||
    raw.startsWith("mailto:") ||
    raw.startsWith("tel:") ||
    raw.startsWith("javascript:") ||
    raw.startsWith("#")
  ) {
    return null;
  }
  return normalizePageId(raw);
}

/** Current page id from body[data-page] or location.pathname */
export function currentPageId() {
  if (typeof document !== "undefined" && document.body?.dataset?.page) {
    return normalizePageId(document.body.dataset.page);
  }
  if (typeof location !== "undefined") {
    return normalizePageId(location.pathname);
  }
  return "index";
}
