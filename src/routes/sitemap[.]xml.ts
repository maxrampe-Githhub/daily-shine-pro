import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/sitemap.xml")({
  server: { handlers: { GET: async () => new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://id-preview--fc76e654-ebee-432d-ac83-47b65a7d9c38.lovable.app/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>`,
    { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } },
  ) } },
});