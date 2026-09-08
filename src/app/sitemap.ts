import type { MetadataRoute } from "next";
import { STUDIO_PRODUCTS } from "@/content/studio-products";

const BASE = "https://www.binhakim.dev";
const STUDIO_BASE = "https://studio.binhakim.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: STUDIO_BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    ...STUDIO_PRODUCTS.map((project) => ({
      url: `${STUDIO_BASE}/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
