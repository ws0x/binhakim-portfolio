import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyHero, ConstraintSection, DecisionGrid, ProjectSection } from "@/components/ProjectStory";
import { getFeaturedProjects, getProject } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getFeaturedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} case study`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.name} case study | Yusuf Naeem`,
      description: project.summary,
      url: `/work/${project.slug}`,
      images: [{ url: `/work/${project.slug}/opengraph-image`, width: 1200, height: 630, alt: `${project.name} case study` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} case study | Yusuf Naeem`,
      description: project.summary,
      images: [`/work/${project.slug}/opengraph-image`],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": project.links.source ? "SoftwareSourceCode" : "CreativeWork",
    name: project.name,
    description: project.summary,
    url: `https://www.binhakim.dev/work/${project.slug}`,
    author: { "@type": "Person", name: "Yusuf Naeem Abd El-Hakim", url: "https://www.binhakim.dev" },
    keywords: project.stack.join(", "),
    dateModified: project.verifiedAt,
    codeRepository: project.links.source,
  };

  const nextProject = getFeaturedProjects().find((candidate) => candidate.featuredOrder === project.featuredOrder + 1) ?? getFeaturedProjects()[0];

  return (
    <>
      <main id="main-content" className="case-page">
        <CaseStudyHero project={project} />
        <div className="section-shell case-content">
          <section className="case-section overview-section">
            <div className="case-section-label">{project.name} / overview</div>
            <div><h2>The problem</h2><p>{project.problem}</p><div className="outcome-grid">{project.outcomes.map((outcome) => <div key={outcome.value}><strong>{outcome.value}</strong><span>{outcome.context}</span><small>{outcome.evidence} evidence</small></div>)}</div></div>
          </section>
          <ConstraintSection project={project} />
          <DecisionGrid project={project} />
          {project.sections.map((section) => <ProjectSection key={section.title} project={project} section={section} />)}
          <section className="case-next"><div><span className="case-section-label">Next case study</span><h2>{nextProject.name}</h2><p>{nextProject.summary}</p></div><Link href={`/work/${nextProject.slug}`} className="button button-primary">Read next <ArrowUpRight size={15} /></Link></section>
        </div>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
