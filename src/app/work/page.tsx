import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon, TechIcon } from "@/components/BrandIcons";
import { getFeaturedProjects, getProjectsByCollection, type ProjectArchive } from "@/content/projects";

const WORKS_URL = "https://www.binhakim.dev/work";

export const metadata: Metadata = {
  title: "Binhakim Works",
  description: "Binhakim Works is Yusuf Naeem's independent product lab and open-source practice, collecting dependable software, experiments, and engineering case studies.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Binhakim Works | Independent product lab",
    description: "Independent products, open-source software, experiments, and engineering case studies by Yusuf Naeem.",
    url: "/work",
    images: [{ url: "/work/opengraph-image", width: 1200, height: 630, alt: "Binhakim Works by Yusuf Naeem" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Binhakim Works | Independent product lab",
    description: "Independent products, open-source software, experiments, and engineering case studies by Yusuf Naeem.",
    images: ["/work/opengraph-image"],
  },
};

function ArchiveProjectCard({ project }: { project: ProjectArchive }) {
  return (
    <article className="works-project-card">
      <div className="works-card-header">
        <p>{project.category}</p>
        <span className={`status-pill status-${project.status}`}>
          <span className="status-dot" aria-hidden="true" />
          {project.statusLabel}
        </span>
      </div>
      <h3>{project.name}</h3>
      {project.tagline && <p className="works-card-tagline">{project.tagline}</p>}
      <p className="works-card-summary">{project.summary}</p>
      <p className="works-card-meta">For {project.audience}</p>
      <div className="story-stack-inline works-card-stack" aria-label={`${project.name} technology stack`}>
        {project.stack.map((technology) => (
          <span key={technology} className="tech-tag">
            <TechIcon name={technology} size={13} />
            <span>{technology}</span>
          </span>
        ))}
      </div>
      <div className="works-card-footer">
        <span>Verified {project.verifiedAt}</span>
        <div className="works-card-actions">
          {project.links.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer" data-analytics="project-outbound">Visit <ExternalLink size={14} /></a>}
          {project.links.source && <a href={project.links.source} target="_blank" rel="noopener noreferrer" data-analytics="repository-click">Source <GithubIcon size={14} /></a>}
        </div>
      </div>
    </article>
  );
}

export default function BinhakimWorksPage() {
  const featuredProjects = getFeaturedProjects();
  const collections = [
    {
      id: "open-source",
      title: "Open source",
      description: "Smaller public projects with source available for inspection and reuse.",
      projects: getProjectsByCollection("open-source"),
    },
    {
      id: "experiments",
      title: "Experiments",
      description: "Early explorations that are useful to show, but are not presented as launched products.",
      projects: getProjectsByCollection("experiment"),
    },
    {
      id: "archive",
      title: "Archive",
      description: "Earlier work retained for context, with its historical status stated plainly.",
      projects: getProjectsByCollection("archive"),
    },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Binhakim Works",
    description: "The independent product lab and open-source practice of Yusuf Naeem.",
    url: WORKS_URL,
    isPartOf: { "@type": "WebSite", url: "https://www.binhakim.dev" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [...featuredProjects, ...collections.flatMap((collection) => collection.projects)].map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          description: project.summary,
          url: project.collection === "featured" ? `${WORKS_URL}/${project.slug}` : project.links.live || project.links.source || WORKS_URL,
        },
      })),
    },
  };

  return (
    <main id="main-content" className="works-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="section-shell works-hero">
        <p className="section-label">Binhakim Works / independent product lab</p>
        <h1>Independent products and open-source work by Yusuf Naeem.</h1>
        <div className="works-hero-grid">
          <div className="works-hero-copy">
            <p>Binhakim Works collects four flagship systems alongside selected open-source work, experiments, and archive projects. It is Yusuf&apos;s independent practice, not a conventional company.</p>
            <a className="works-jump-link" href="#featured-products">Explore four flagship systems <ArrowUpRight size={15} /></a>
          </div>
          <dl>
            <div><dt>Builder</dt><dd>Yusuf Naeem</dd></div>
            <div><dt>Focus</dt><dd>Product engineering</dd></div>
            <div><dt>Evidence</dt><dd>Public or verified</dd></div>
          </dl>
        </div>
      </header>

      <section className="section-shell works-section" aria-labelledby="featured-products">
        <div className="works-section-heading">
          <div><p className="section-label">01 / featured products</p><h2 id="featured-products">Four systems with engineering depth</h2></div>
          <p>Start with the product. Each case study then shows the problem, one key engineering decision, and the level of evidence behind its claims.</p>
        </div>
        <div className="works-feature-grid">
          {featuredProjects.map((project) => (
            <article className={`works-feature-card accent-${project.accent}`} key={project.slug}>
              <div className="works-card-header">
                <p>{project.eyebrow}</p>
                <span className={`status-pill status-${project.status}`}><span className="status-dot" aria-hidden="true" />{project.statusLabel}</span>
              </div>
              <h3><Link href={`/work/${project.slug}`}>{project.name}</Link></h3>
              <p className="works-card-summary">{project.summary}</p>
              <p className="works-card-meta"><span>Built for</span>{project.audience}</p>
              <p className="works-card-decision"><span>Key engineering decision</span>{project.engineeringHighlights[0]?.title}</p>
              <div className="story-stack-inline works-card-stack" aria-label={`${project.name} technology stack`}>
                {project.stack.map((technology) => <span key={technology} className="tech-tag"><TechIcon name={technology} size={13} /><span>{technology}</span></span>)}
              </div>
              <div className="works-card-footer">
                <span>Verified {project.verifiedAt}</span>
                <div className="works-card-actions">
                  <Link href={`/work/${project.slug}`} data-analytics="case-study-open">Case study <ArrowUpRight size={14} /></Link>
                  {project.links.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer" data-analytics="project-outbound">Visit <ExternalLink size={14} /></a>}
                  {project.links.source && <a href={project.links.source} target="_blank" rel="noopener noreferrer" data-analytics="repository-click">Source <GithubIcon size={14} /></a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {collections.map((collection, index) => (
        <section className="section-shell works-section works-secondary-section" aria-labelledby={collection.id} key={collection.id}>
          <div className="works-section-heading">
            <div><p className="section-label">0{index + 2} / {collection.id}</p><h2 id={collection.id}>{collection.title}</h2></div>
            <p>{collection.description}</p>
          </div>
          <div className="works-secondary-grid">
            {collection.projects.map((project) => <ArchiveProjectCard key={project.slug} project={project} />)}
          </div>
        </section>
      ))}

      <section className="section-shell works-cta" aria-labelledby="works-contact">
        <div><p className="section-label">Binhakim Works / collaborations</p><h2 id="works-contact">Need someone who can turn an uncertain workflow into dependable software?</h2></div>
        <a href="mailto:yusufnaeemhakim@gmail.com" className="button button-primary button-large" data-analytics="contact-click">Email Yusuf <ArrowUpRight size={16} /></a>
      </section>
    </main>
  );
}
