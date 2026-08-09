import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { writingArticles } from "@/lib/writing";
import { pageMetadata } from "@/lib/metadata";
import { baseGraph, graph, webPageNode } from "@/lib/schema";
import { routeFor } from "@/lib/site";

const ROUTE = "/writing";
const route = routeFor(ROUTE)!;
export const metadata: Metadata = pageMetadata(ROUTE, {
  alternates: {
    canonical: "https://binhakim.dev/writing",
    types: { "application/rss+xml": "/writing/feed.xml" },
  },
});
const jsonLd = graph(...baseGraph(), webPageNode({ path: ROUTE, name: route.title, description: route.description, trail: [{ name: "Writing", path: ROUTE }] }));

export default function WritingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <main className="section-pad route-shell route-shell-narrow">
        <PageHeader eyebrow="~/writing" title={<>Writing without a <span style={{ color: "var(--cyan)" }}>content facade</span></>} lede="Only published work belongs here. The site uses local metadata, so a third-party feed outage cannot break the build or replace real articles with placeholders." crumbs={[{ label: "writing" }]} />
        <p className="writing-feed-link"><a href="/writing/feed.xml">Subscribe to the RSS feed</a></p>
        <div className="writing-list">
          {writingArticles.map((entry, index) => (
            <Reveal as="a" delay={index + 1} key={entry.slug} href={`/writing/${entry.slug}`} className="panel writing-entry">
              <div className="writing-meta"><span>{entry.publishedAt}</span><span>{entry.readTime}</span></div>
              <h2>{entry.title}</h2>
              <p>{entry.excerpt}</p>
              <span className="writing-cta">Read article <ArrowUpRight size={12} /></span>
            </Reveal>
          ))}
        </div>
      </main>
    </>
  );
}
