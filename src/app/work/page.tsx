import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { workCaseStudies } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { baseGraph, graph, webPageNode } from "@/lib/schema";
import { routeFor } from "@/lib/site";

const ROUTE = "/work";
const route = routeFor(ROUTE)!;
export const metadata: Metadata = pageMetadata(ROUTE);
const jsonLd = graph(...baseGraph(), webPageNode({ path: ROUTE, name: route.title, description: route.description, trail: [{ name: "Work", path: ROUTE }] }));

export default function WorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <main className="section-pad route-shell">
        <PageHeader
          eyebrow="~/work"
          title={<>Systems that reached <span style={{ color: "var(--cyan)" }}>production</span></>}
          lede="Three case studies focused on the constraints, decisions and implementation behind the interface. No invented growth numbers and no prototype theatre."
          crumbs={[{ label: "work" }]}
        />
        <div className="work-index-grid">
          {workCaseStudies.map((study, index) => (
            <Reveal as="article" delay={index + 1} key={study.slug} className="panel work-index-card" style={{ borderColor: `${study.accent}33` }}>
              <div>
                <p className="panel-label">{study.category}</p>
                <h2>{study.name}</h2>
                <p className="work-tagline" style={{ color: study.accent }}>{study.tagline}</p>
                <p>{study.summary}</p>
              </div>
              <div className="work-card-actions">
                <Link href={`/work/${study.slug}`} className="github-btn">Read case study <ArrowRight size={13} /></Link>
                {study.live ? <a href={study.live} target="_blank" rel="noopener noreferrer" className="tech-tag">Live product <ArrowUpRight size={11} /></a> : null}
              </div>
            </Reveal>
          ))}
        </div>
      </main>
    </>
  );
}
