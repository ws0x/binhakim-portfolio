import Link from "next/link";
import type { Metadata } from "next";

import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { about } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { baseGraph, webPageNode, graph } from "@/lib/schema";
import { routeFor, SOCIAL } from "@/lib/site";

const ROUTE = "/about";
const route = routeFor(ROUTE)!;

export const metadata: Metadata = pageMetadata(ROUTE);

const jsonLd = graph(
  ...baseGraph(),
  webPageNode({
    path: ROUTE,
    name: route.title,
    description: route.description,
    trail: [{ name: "About", path: ROUTE }],
  })
);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <main className="section-pad" style={{ maxWidth: "52rem", margin: "0 auto" }}>
        <PageHeader
          eyebrow="~/about"
          title={
            <>
              The order it{" "}
              <span style={{ color: "var(--cyan)" }}>actually</span> happened in
            </>
          }
          lede={about.lede}
          crumbs={[{ label: "about" }]}
        />

        {/* Chapters. The vertical rule is decorative; the <ol> carries the
            structure for anything not reading it visually. */}
        {/* Padding is deliberately left to the .story class — an inline
            `padding: 0` here would win over the class and collapse the gutter
            the timeline rule lives in. */}
        <ol className="story" style={{ listStyle: "none", margin: 0 }}>
          {about.chapters.map((chapter, i) => (
            <Reveal as="li" delay={i + 1} key={chapter.id} id={chapter.id} className="story-item">
              <div className="story-marker" aria-hidden="true" />

              <div>
                <p
                  style={{
                    fontFamily: "var(--font-jet), monospace",
                    fontSize: "0.66rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--cyan)",
                    opacity: 0.8,
                    marginBottom: "0.5rem",
                  }}
                >
                  {chapter.year}
                </p>

                <h2
                  style={{
                    fontSize: "clamp(1.15rem, 2.6vw, 1.45rem)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.25,
                    marginBottom: "0.9rem",
                  }}
                >
                  {chapter.title}
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                  {chapter.body.map((para, pi) => (
                    <p
                      key={pi}
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.8,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Onward links — the story should hand off somewhere. */}
        <Reveal
          as="div"
          delay={about.chapters.length + 1}
          className="panel"
          style={{ padding: "1.75rem 2rem", marginTop: "3.5rem" }}
        >
          <p className="panel-label" style={{ marginBottom: "1rem" }}>
            $ ls --related
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <Link href="/resume" className="tech-tag" style={{ textDecoration: "none" }}>
              The facts, in order
            </Link>
            <Link href="/stack" className="tech-tag" style={{ textDecoration: "none" }}>
              What I build with
            </Link>
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-tag"
              style={{ textDecoration: "none" }}
            >
              GitHub
            </a>
            <a
              href={SOCIAL.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-tag"
              style={{ textDecoration: "none" }}
            >
              Writing
            </a>
          </div>
        </Reveal>
      </main>
    </>
  );
}
