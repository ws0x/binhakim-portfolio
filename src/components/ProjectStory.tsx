import Link from "next/link";
import { ArrowUpRight, ExternalLink, LockKeyhole } from "lucide-react";
import type { ProjectCaseStudy } from "@/content/projects";
import { GithubIcon } from "@/components/BrandIcons";
import ProjectDetailPanel from "@/components/ProjectDetailPanel";

function StatusPill({ project }: { project: ProjectCaseStudy }) {
  return (
    <span className={`status-pill status-${project.status}`}>
      <span className="status-dot" aria-hidden="true" />
      {project.statusLabel}
    </span>
  );
}

function ProjectVisual({ project, detail = false }: { project: ProjectCaseStudy; detail?: boolean }) {
  return (
    <figure className={`project-visual visual-${project.accent} ${detail ? "project-visual-detail" : ""}`}>
      <div className="visual-toolbar" aria-hidden="true">
        <span className="toolbar-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="toolbar-path">{project.slug}.system</span>
        <span className="toolbar-state">{project.media.kind === "diagram" ? "illustrative system diagram" : "conceptual product view"}</span>
      </div>

      {project.slug === "nexflow" && (
        <div className="visual-body visual-nexflow" aria-hidden="true">
          <div className="visual-heading"><span>security.pipeline</span><b>request trace</b></div>
          <div className="security-flow">
            {["Session", "Role", "BU scope", "Dept scope", "Field filter"].map((step, index) => (
              <div className="flow-step" key={step}>
                <span className="flow-index">0{index + 1}</span>
                <strong>{step}</strong>
                <small>{index === 4 ? "payload safe" : "verified"}</small>
              </div>
            ))}
          </div>
          <div className="visual-terminal"><span>REQ</span> HSL506240001 <em>atomic / auditable</em></div>
        </div>
      )}

      {project.slug === "videx" && (
        <div className="visual-body visual-videx" aria-hidden="true">
          <div className="visual-heading"><span>videx app</span><b>local queue</b></div>
          <div className="videx-layout">
            <div className="videx-sidebar"><span className="active">Queue</span><span>History</span><span>Settings</span></div>
            <div className="queue-panel">
              <div className="queue-card"><span className="queue-icon">DL</span><div><strong>authorized-media.mp4</strong><small>1080p / FFmpeg merge</small></div><b>74%</b></div>
              <div className="queue-card muted"><span className="queue-icon">OK</span><div><strong>playlist archive</strong><small>completed locally</small></div><b>done</b></div>
              <div className="local-badge"><LockKeyhole size={13} /> 127.0.0.1:8765 <span>no cloud path</span></div>
            </div>
          </div>
        </div>
      )}

      {project.slug === "orbit" && (
        <div className="visual-body visual-orbit" aria-hidden="true">
          <div className="visual-heading"><span>relationship.os</span><b>private graph</b></div>
          <div className="orbit-graph" aria-hidden="true">
            <span className="orbit-line line-a" /><span className="orbit-line line-b" /><span className="orbit-line line-c" />
            <span className="orbit-node node-main">you</span><span className="orbit-node node-a">mentor</span><span className="orbit-node node-b">team</span><span className="orbit-node node-c">client</span>
          </div>
          <div className="visual-terminal"><span>RLS</span> tenant boundary <em>enforced at database</em></div>
        </div>
      )}

      {project.slug === "commit" && (
        <div className="visual-body visual-commit" aria-hidden="true">
          <div className="visual-heading"><span>commit_ roadmap</span><b>next action</b></div>
          <div className="roadmap">
            <div className="roadmap-line" />
            {["HTTP foundations", "REST APIs", "PostgreSQL", "Ship a project"].map((item, index) => (
              <div className={`roadmap-stop ${index < 2 ? "complete" : index === 2 ? "current" : ""}`} key={item}>
                <span>{index < 2 ? "OK" : index === 2 ? ">" : ""}</span><small>{item}</small>
              </div>
            ))}
          </div>
          <div className="visual-terminal"><span>ETA</span> aim for ~0.8h/day <em>encouraging by design</em></div>
        </div>
      )}

      <figcaption>{project.media.description}</figcaption>
    </figure>
  );
}

function ProjectLinks({ project, includeCaseStudy = true }: { project: ProjectCaseStudy; includeCaseStudy?: boolean }) {
  if (!includeCaseStudy && !project.links.live && !project.links.source && !project.links.docs) return null;

  return (
    <div className="project-actions">
      {includeCaseStudy && (
        <Link href={`/work/${project.slug}`} className="button button-primary" data-analytics="case-study-open">
          Read case study <ArrowUpRight size={15} />
        </Link>
      )}
      {project.links.live && (
        <a className="button button-secondary" href={project.links.live} target="_blank" rel="noopener noreferrer" data-analytics="project-outbound">
          Visit product <ExternalLink size={14} />
        </a>
      )}
      {project.links.source && (
        <a className="button button-quiet" href={project.links.source} target="_blank" rel="noopener noreferrer" data-analytics="repository-click">
          Source <GithubIcon size={14} />
        </a>
      )}
      {project.links.docs && (
        <a className="button button-quiet" href={project.links.docs} target="_blank" rel="noopener noreferrer">
          Documentation <ArrowUpRight size={14} />
        </a>
      )}
    </div>
  );
}

export function ProjectStory({ project, index }: { project: ProjectCaseStudy; index: number }) {
  return (
    <article className={`project-story accent-${project.accent}`}>
      <div className="story-index">0{index}</div>
      <div className="story-copy">
        <div className="story-kicker"><span>{project.eyebrow}</span><StatusPill project={project} /></div>
        <h3>{project.name}</h3>
        <p className="story-category">{project.category}</p>
        <p className="story-summary">{project.summary}</p>

        <p className="story-proof-label">Verified signals</p>
        <div className="story-outcomes">
          {project.outcomes.map((outcome) => (
            <div key={outcome.value} className="outcome-item">
              <strong>{outcome.value}</strong>
              <span>{outcome.context}</span>
            </div>
          ))}
        </div>

        <ProjectLinks project={project} />
      </div>
      <ProjectVisual project={project} />
      <ProjectDetailPanel project={project} />
    </article>
  );
}

export function CaseStudyHero({ project }: { project: ProjectCaseStudy }) {
  return (
    <header className={`case-hero accent-${project.accent}`}>
      <div className="case-hero-copy">
        <Link className="back-link" href="/#work">← Selected work</Link>
        <div className="story-kicker"><span>{project.eyebrow}</span><StatusPill project={project} /></div>
        <h1>{project.name}</h1>
        <p className="case-summary">{project.summary}</p>
        <div className="case-facts">
          <div><span>Role</span><strong>{project.role}</strong></div>
          <div><span>Timeline</span><strong>{project.timeline}</strong></div>
          <div><span>Verified</span><strong>{project.verifiedAt}</strong></div>
        </div>
        <ProjectLinks project={project} includeCaseStudy={false} />
      </div>
      <ProjectVisual project={project} detail />
    </header>
  );
}

export function ProjectSection({ project, section }: { project: ProjectCaseStudy; section: { title: string; body: string; bullets?: string[] } }) {
  return (
    <section className="case-section">
      <div className="case-section-label">{project.name} / {section.title}</div>
      <div>
        <h2>{section.title}</h2>
        <p>{section.body}</p>
        {section.bullets && <ul className="proof-list">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
      </div>
    </section>
  );
}

export function DecisionGrid({ project }: { project: ProjectCaseStudy }) {
  return (
    <section className="case-section decision-section">
      <div className="case-section-label">{project.name} / decisions</div>
      <div>
        <h2>The engineering decisions</h2>
        <div className="decision-grid">
          {project.engineeringHighlights.map((highlight, index) => (
            <article key={highlight.title}>
              <span className="decision-number">0{index + 1}</span>
              <h3>{highlight.title}</h3>
              <p>{highlight.detail}</p>
              <small>{highlight.decision}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConstraintSection({ project }: { project: ProjectCaseStudy }) {
  return (
    <section className="case-section constraint-section">
      <div className="case-section-label">{project.name} / constraints</div>
      <div>
        <h2>The constraints shaped the system</h2>
        <ul className="constraint-list">{project.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul>
      </div>
    </section>
  );
}
