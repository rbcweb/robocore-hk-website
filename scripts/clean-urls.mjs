/**
 * Post-Vite build: clean URLs for GitHub Pages
 * - dist/foo.html → dist/foo/index.html
 * - rewrite internal *.html links → /foo/
 * - leave stub dist/foo.html that redirects to /foo/ (old bookmarks)
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, unlinkSync, statSync } from "fs";
import { join, basename } from "path";

const dist = join(process.cwd(), "dist");
const BASE = process.env.BASE_PATH || "/";
const basePrefix = BASE.endsWith("/") ? BASE : `${BASE}/`;

function pageUrl(slug) {
  if (!slug || slug === "index") return basePrefix === "/" ? "/" : basePrefix;
  return `${basePrefix}${slug}/`;
}

function rewriteHtml(html) {
  // href="foo.html" / href='foo.html' / href=foo.html (internal only)
  return html.replace(
    /\b(href|action)=(["']?)([^"'>\s]+?\.html)(#[^"'>\s]*)?\2/gi,
    (full, attr, quote, file, hash = "") => {
      const q = quote || '"';
      if (/^(https?:|mailto:|tel:|javascript:)/i.test(file)) {
        return full;
      }
      const name = basename(file).replace(/\.html$/i, "");
      if (name === "index") {
        return `${attr}=${q}${pageUrl("index")}${hash || ""}${q}`;
      }
      return `${attr}=${q}${pageUrl(name)}${hash || ""}${q}`;
    }
  );
}

function redirectStub(slug) {
  const dest = pageUrl(slug);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="refresh" content="0;url=${dest}" />
  <link rel="canonical" href="${dest}" />
  <title>Redirecting…</title>
  <script>location.replace(${JSON.stringify(dest)}+location.search+location.hash)</script>
</head>
<body><p><a href="${dest}">Continue</a></p></body>
</html>
`;
}

const entries = readdirSync(dist);
const htmlFiles = entries.filter((f) => f.endsWith(".html") && statSync(join(dist, f)).isFile());

for (const file of htmlFiles) {
  const srcPath = join(dist, file);
  let html = readFileSync(srcPath, "utf8");
  html = rewriteHtml(html);

  if (file === "index.html") {
    writeFileSync(srcPath, html);
    continue;
  }

  const slug = file.replace(/\.html$/i, "");
  const dir = join(dist, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  // Old URL compatibility
  writeFileSync(srcPath, redirectStub(slug));
}

console.log(`clean-urls: processed ${htmlFiles.length} HTML files → directory indexes + redirect stubs`);
