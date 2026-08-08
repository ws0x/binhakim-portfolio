import type { Metadata } from "next";
import { absoluteUrl, routeFor, SITE_NAME, SHORT_NAME, FULL_NAME } from "./site";

/**
 * Builds per-route metadata from the single route table in site.ts.
 *
 * The important part is `alternates.canonical`: without an explicit canonical
 * per route, every page inherits the root one from the layout and search
 * engines are told the whole site is one URL.
 */
export function pageMetadata(
  path: string,
  overrides: Partial<Metadata> & { title?: string; description?: string } = {}
): Metadata {
  const route = routeFor(path);
  const title = overrides.title ?? route?.title ?? SHORT_NAME;
  const description = overrides.description ?? route?.description ?? "";
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title: typeof title === "string" ? `${title} | ${SHORT_NAME}` : undefined,
      description,
      images: [
        {
          url: "/profile.jpg",
          width: 800,
          height: 800,
          alt: `${FULL_NAME} — Software Engineer`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: typeof title === "string" ? `${title} | ${SHORT_NAME}` : undefined,
      description,
      images: ["/profile.jpg"],
      creator: "@binhakim",
    },
    ...overrides,
  };
}
