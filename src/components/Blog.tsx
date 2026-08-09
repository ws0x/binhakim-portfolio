import { writingArticles } from "../lib/writing";
import BlogCards from "./BlogCards";

/**
 * Server component — fetches the latest posts from Medium's RSS feed
 * at build time (revalidated every hour). Falls back to the static
 * blog.json if the feed is unreachable.
 */
export default function Blog() {
  return (
    <BlogCards
      posts={writingArticles.slice(0, 3).map((article) => ({
        title: article.title,
        excerpt: article.excerpt,
        url: `/writing/${article.slug}`,
        date: article.publishedAt,
        readTime: article.readTime,
      }))}
    />
  );
}
