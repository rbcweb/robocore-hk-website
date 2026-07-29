import { defineConfig } from 'vite';
import { resolve } from 'path';

const pages = [
  'index',
  'products',
  'solutions',
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
  'holabot',
  'flashbot',
  'cc1',
  'mt1',
  'sh1',
  'puductor',
  'news',
  'joinus',
  'contactus',
  'temiwarranty',
];

const input = Object.fromEntries(
  pages.map((name) => [
    name,
    resolve(__dirname, name === 'index' ? 'index.html' : `${name}.html`),
  ])
);

// GitHub project pages: BASE_PATH=/repo-name/
// Custom domain later: BASE_PATH=/ (default)
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  base,
  root: '.',
  publicDir: 'public',
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
