import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { writingEntries } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { baseGraph, graph, webPageNode } from "@/lib/schema";
import { routeFor } from "@/lib/site";

const ROUTE = "/writing";
const route = routeFor(ROUTE)!;
export const metadata: Metadata = pageMetadata(ROUTE);
const jsonLd = graph(...baseGraph(), webPageNode({ path: ROUTE, name: route.title, description: route.description, trail: [{ name: "Writing", path: ROUTE }] }));

export default function WritingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <main className="section-pad route-shell route-shell-narrow">
        <PageHeader eyebrow="~/writing" title={<>Writing without a <span style={{ color: "var(--cyan)" }}>content facade</span></>} lede="Only published work belongs here. The site uses local metadata, so a third-party feed outage cannot break the build or replace real articles with placeholders." crumbs={[{ label: "writing" }]} />
        <div className="writing-list">
          {writingEntries.map((entry, index) => (
            <Reveal as="a" delay={index + 1} key={entry.url} href={entry.url} target="_blank" rel="noopener noreferrer" className="panel writing-entry">
              <div className="writing-meta"><span>{entry.date}</span><span>{entry.readTime}</span></div>
              <h2>{entry.title}</h2>
              <p>{entry.excerpt}</p>
              <span className="writing-cta">Open on Medium <ArrowUpRight size={12} /></span>
            </Reveal>
          ))}
        </div>
      </main>
    </>
  );
}
