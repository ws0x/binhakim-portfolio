import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Locale = "en";
export type WritingCategory = "backend" | "data" | "security" | "product";

export interface WritingArticle {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  category: WritingCategory;
  canonical?: string;
  relatedWork: string[];
  body: string;
}

const body = (file: string) => readFileSync(join(process.cwd(), "src/content/writing", file), "utf8");

export const writingArticles: WritingArticle[] = [
  {
    slug: "commit-completion-loop",
    title: "Designing a Completion Loop for Self-Directed Learning",
    excerpt: "Why Commit models study sessions, streaks and course completion as one repeatable system instead of a collection of progress screens.",
    publishedAt: "2026-08-09",
    readTime: "7 min read",
    category: "product",
    relatedWork: ["commit"],
    body: body("commit-completion-loop.md"),
  },
  {
    slug: "orbit-database-boundaries",
    title: "Why Orbit Enforces Tenant Isolation in PostgreSQL",
    excerpt: "A practical look at using row-level security as a product boundary, not just an extra application filter.",
    publishedAt: "2026-08-09",
    readTime: "8 min read",
    category: "security",
    relatedWork: ["orbit"],
    body: body("orbit-database-boundaries.md"),
  },
];

export function articleFor(slug: string) {
  return writingArticles.find((article) => article.slug === slug);
}

export const writingSlugs = writingArticles.map(({ slug }) => slug);
