// @ts-check
import { defineConfig } from 'astro/config';

// Yayın adresi belli olduğunda PUBLIC_SITE_URL ortam değişkeniyle verin
// (ör. PUBLIC_SITE_URL=https://www.alanadi.com npm run build).
// Canonical bağlantılar, Open Graph ve sitemap bu adresi kullanır.
const site = process.env.PUBLIC_SITE_URL || undefined;

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  devToolbar: { enabled: false },
  // 'class': bileşenlere verilen class prop'u da üst bileşenin kapsamlı stillerini alır
  scopedStyleStrategy: 'class',
});
