import { writingEntries } from "../lib/content";
import BlogCards from "./BlogCards";

/**
 * Server component — fetches the latest posts from Medium's RSS feed
 * at build time (revalidated every hour). Falls back to the static
 * blog.json if the feed is unreachable.
 */
export default function Blog() {
  return <BlogCards posts={writingEntries} />;
}
