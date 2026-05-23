export interface MediumPost {
  title: string;
  excerpt: string; // subtitle / first heading from the article
  url: string;
  date: string;
  readTime: string;
}

// ── XML helpers ────────────────────────────────────────────────────────────

/** Extract CDATA or raw text from a named XML element within a snippet */
function tagText(xml: string, tag: string): string {
  const esc = tag.replace(":", "\\:");
  const cdata = xml.match(
    new RegExp(`<${esc}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${esc}>`, "i")
  );
  if (cdata) return cdata[1].trim();
  const raw = xml.match(new RegExp(`<${esc}[^>]*>([\\s\\S]*?)</${esc}>`, "i"));
  return raw ? raw[1].trim() : "";
}

/** Strip all HTML tags and decode common entities */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8230;/g, "…")
    .trim();
}

/**
 * Extract the subtitle / heading from article HTML.
 * Medium places the subtitle as the first <h4> in content:encoded.
 * Falls back to the first <p> if no <h4> exists.
 */
function extractExcerpt(contentHtml: string): string {
  const h4 = contentHtml.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i);
  if (h4) {
    const text = stripHtml(h4[1]);
    if (text.length > 15) return text.slice(0, 220);
  }
  const p = contentHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  return p ? stripHtml(p[1]).slice(0, 220) : "";
}

/** Estimate read time from article HTML (~200 wpm) */
function estimateReadTime(contentHtml: string): string {
  const words = stripHtml(contentHtml).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

/** Format an RSS pubDate string to "Jan 1, 2024" */
function formatDate(pubDate: string): string {
  try {
    return new Date(pubDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return pubDate;
  }
}

// ── Main export ────────────────────────────────────────────────────────────

/**
 * Fetch and parse the latest posts from the Medium RSS feed.
 * Revalidates every hour. Returns [] on error (caller should fall back).
 */
export async function getMediumPosts(limit = 6): Promise<MediumPost[]> {
  try {
    const res = await fetch("https://medium.com/feed/@binhakim", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; portfolio-fetcher/1.0; +https://binhakim.dev)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      next: { revalidate: 3600 }, // re-fetch at most once per hour
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();

    const rawItems = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
    if (rawItems.length === 0) throw new Error("No <item> elements found in feed");

    return rawItems.slice(0, limit).map(([, item]) => {
      const title = stripHtml(tagText(item, "title"));

      // <link> may be empty in Atom-style RSS; fall back to <guid>
      const url =
        item.match(/<link>(https?:\/\/[^\s<]+)<\/link>/)?.[1] ??
        item.match(/<guid[^>]*>(https?:\/\/[^\s<]+)<\/guid>/)?.[1] ??
        "";

      const pubDate = tagText(item, "pubDate");
      const content = tagText(item, "content:encoded");

      return {
        title,
        excerpt: extractExcerpt(content),
        url: url.trim(),
        date: formatDate(pubDate),
        readTime: estimateReadTime(content),
      };
    });
  } catch (err) {
    console.error("[getMediumPosts] Feed error:", err);
    return [];
  }
}
