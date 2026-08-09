import type { MetadataRoute } from "next";
import { absoluteUrl, sitemapRoutes } from "@/lib/site";
import { workCaseStudies } from "@/lib/content";
import { writingArticles } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const generatedAt = new Date();
  return [
    ...sitemapRoutes.map((route) => ({
      url: absoluteUrl(route.href),
      lastModified: generatedAt,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...workCaseStudies.map((study) => ({
      url: absoluteUrl(`/work/${study.slug}`),
      lastModified: generatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...writingArticles.map((article) => ({
      url: absoluteUrl(`/writing/${article.slug}`),
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
