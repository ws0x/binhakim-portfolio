import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import WorkMockup from "@/components/work/WorkMockup";
import { GithubIcon } from "@/components/BrandIcons";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { workCaseStudies } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { baseGraph, graph, softwareApplicationNode, webPageNode } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return workCaseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = workCaseStudies.find((item) => item.slug === slug);
  if (!study) return {};
  return pageMetadata(`/work/${slug}`, { title: `${study.name} Case Study`, description: study.summary });
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = workCaseStudies.find((item) => item.slug === slug);
  if (!study) notFound();

  const path = `/work/${study.slug}`;
  const jsonLd = graph(
    ...baseGraph(),
    webPageNode({ path, name: `${study.name} Case Study`, description: study.summary, trail: [{ name: "Work", path: "/work" }, { name: study.name, path }] }),
    softwareApplicationNode({ name: study.name, description: study.summary, url: study.live ?? path })
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <main className="section-pad route-shell">
        <PageHeader eyebrow={`~/work/${study.slug}`} title={study.name} lede={study.summary} crumbs={[{ label: "work", href: "/work" }, { label: study.slug }]} />

        <Reveal as="section" delay={1} className="case-study-hero panel" style={{ borderColor: `${study.accent}33` }}>
          <div>
            <p className="panel-label">{study.category}</p>
            <p className="case-study-tagline" style={{ color: study.accent }}>{study.tagline}</p>
            <div className="work-card-actions">
              {study.live ? <a href={study.live} target="_blank" rel="noopener noreferrer" className="github-btn">Visit product <ArrowUpRight size={13} /></a> : null}
              {study.github ? <a href={study.github} target="_blank" rel="noopener noreferrer" className="tech-tag"><GithubIcon size={12} /> Source</a> : null}
            </div>
          </div>
          <WorkMockup kind={study.mockup} />
        </Reveal>

        <div className="case-study-grid">
          <CaseSection title="Problem" paragraphs={[study.problem]} />
          <CaseSection title="Constraints" items={study.constraints} />
          <CaseSection title="Decisions" items={study.decisions} />
          <CaseSection title="Implementation" items={study.implementation} />
          <CaseSection title="Outcome" paragraphs={[study.outcome]} />
          <Reveal as="section" delay={6} className="panel case-section">
            <h2>Stack</h2>
            <div className="case-tech">{study.tech.map((item) => <span key={item} className="tech-tag">{item}</span>)}</div>
          </Reveal>
        </div>

        <Link href="/work" className="case-back"><ArrowLeft size={13} /> All work</Link>
      </main>
    </>
  );
}

function CaseSection({ title, items, paragraphs }: { title: string; items?: string[]; paragraphs?: string[] }) {
  return (
    <Reveal as="section" delay={2} className="panel case-section">
      <h2>{title}</h2>
      {paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {items ? <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
    </Reveal>
  );
}
