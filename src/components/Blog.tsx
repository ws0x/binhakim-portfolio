import blogData from "../data/blog.json";
import { getMediumPosts } from "../lib/getMediumPosts";
import BlogCards from "./BlogCards";

/**
 * Server component — fetches the latest posts from Medium's RSS feed
 * at build time (revalidated every hour). Falls back to the static
 * blog.json if the feed is unreachable.
 */
export default async function Blog() {
  const mediumPosts = await getMediumPosts(6);
  const posts = mediumPosts.length > 0 ? mediumPosts : blogData;
  return <BlogCards posts={posts} />;
}
