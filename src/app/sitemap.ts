import type { MetadataRoute } from "next";
import { getFeaturedProjects } from "@/content/projects";

const BASE = "https://www.binhakim.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    ...getFeaturedProjects().map((project) => ({
      url: `${BASE}/work/${project.slug}`,
      lastModified: new Date(project.verifiedAt),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
