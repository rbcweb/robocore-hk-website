import { defineConfig } from 'vite';
import { resolve } from 'path';

const pages = [
  'index',
  'products',
  'solutions',
  'solution-healthcare',
  'solution-hospitality',
  'solution-stem',
  'solution-building',
  'solution-fb',
  'solution-mall',
  'solution-clinic',
  'solution-iot',
  'solution-retail',
  'solution-expo',
  'solution-entertainment',
  'solution-si',
  'temifamily',
  'temiv3',
  'temiplatform',
  'temigo',
  'temigopro',
  'blackjack',
  'fourcast',
  'zpine',
  'liftmodule',
  'pudu',
  'pudubot',
  'bellabot',
  'flashbot',
  't300',
  't600',
  'cc1',
  'mt1',
  'sh1',
  'news',
  'news-am730-sen-2026',
  'news-oncc-sen-2026',
  'joinus',
  'contactus',
  'temiwarranty',
];

const pageSet = new Set(pages.filter((p) => p !== 'index'));

const input = Object.fromEntries(
  pages.map((name) => [
    name,
    resolve(__dirname, name === 'index' ? 'index.html' : `${name}.html`),
  ])
);

// GitHub project pages: BASE_PATH=/repo-name/
// Custom domain: BASE_PATH=/ (default)
const base = process.env.BASE_PATH || '/';

/** Dev server: /products/ → products.html so clean links work locally */
function cleanUrlDevPlugin() {
  return {
    name: 'clean-url-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || req.method !== 'GET') return next();
        const url = req.url.split('?')[0];
        const baseTrim = base.replace(/\/$/, '') || '';
        let path = url;
        if (baseTrim && path.startsWith(baseTrim)) {
          path = path.slice(baseTrim.length) || '/';
        }
        // /products or /products/ → /products.html
        const m = path.match(/^\/([a-z0-9-]+)\/?$/i);
        if (m && pageSet.has(m[1])) {
          const q = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
          req.url = `${baseTrim}/${m[1]}.html${q}`;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  base,
  root: '.',
  publicDir: 'public',
  plugins: [cleanUrlDevPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: { input },
  },
  server: {
    port: 5173,
    open: true,
  },
});
