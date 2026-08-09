import { writingArticles } from "@/lib/writing";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

export function GET() {
  const items = writingArticles.map((article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.excerpt}]]></description>
      <link>${absoluteUrl(`/writing/${article.slug}`)}</link>
      <guid>${absoluteUrl(`/writing/${article.slug}`)}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>${SITE_NAME} writing</title><link>${SITE_URL}/writing</link><description>Technical writing by Yusuf Naeem.</description>${items}
</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
