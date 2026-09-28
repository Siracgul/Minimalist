import type { APIRoute } from 'astro';

// Yeni sayfa eklerseniz bu listeye de ekleyin.
const pages = ['/', '/kurumsal-egitim/', '/atolye-ve-kultur-sanat/', '/etkinlik-ve-organizasyon/', '/yaklasim/', '/iletisim/'];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('http://localhost:4321');
  const urls = pages.map((p) => `  <url><loc>${new URL(p, base).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
