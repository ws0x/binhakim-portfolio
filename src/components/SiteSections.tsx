import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import experienceData from "@/data/experience.json";
import credentials from "@/data/credentials.json";
import projectsData from "@/data/projects.json";
import type { MediumPost } from "@/lib/getMediumPosts";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

export function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="hero-pulse" /> Available for backend and full-stack roles</div>
          <p className="hero-command">$ whoami / systems-minded product engineer</p>
          <h1>
            <span className="hero-name-primary">Yusuf Naeem</span>
            <span className="hero-name-secondary">Abd El-Hakim</span>
          </h1>
          <p className="hero-role">Backend-leaning full-stack software engineer</p>
          <p className="hero-summary">I build production systems end to end, from APIs and data models to security boundaries and useful product surfaces. My strongest work turns messy operations into dependable software.</p>
          <div className="hero-actions">
            <a href="#work" className="button button-primary button-large">Explore selected work <ArrowUpRight size={16} /></a>
            <a href="/resume.pdf" download="Yusuf_Naeem_Resume.pdf" className="button button-secondary button-large" data-analytics="resume-download"><Download size={15} /> Download resume</a>
          </div>
          <div className="hero-proof"><span>APIs</span><span>Data systems</span><span>Applied security</span><span>Product delivery</span></div>
        </div>
        <div className="hero-portrait-wrap">
          <div className="portrait-orbit orbit-one" aria-hidden="true" />
          <div className="portrait-orbit orbit-two" aria-hidden="true" />
          <div className="hero-portrait">
            <Image alt="Yusuf Naeem Abd El-Hakim" height={720} priority sizes="(max-width: 900px) 72vw, 420px" src="/profile.jpg" width={720} />
          </div>
          <p className="portrait-caption"><span>01</span> systems-minded / people-first</p>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true"><span>Scroll to inspect the work</span><i /></div>
    </section>
  );
}

export function EvidenceStrip() {
  return (
    <section className="evidence-strip" aria-label="Selected evidence">
      <div className="section-shell evidence-grid">
        <div><span className="evidence-value">4 entities</span><span className="evidence-label">unified in NexFlow</span></div>
        <div><span className="evidence-value">API-level</span><span className="evidence-label">field filtering</span></div>
        <div><span className="evidence-value">Crash-safe</span><span className="evidence-label">local queue design</span></div>
        <div><span className="evidence-value">RLS</span><span className="evidence-label">tenant isolation</span></div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  const primary = experienceData.slice(0, 3);
  const earlier = experienceData.slice(3);
  return (
    <section id="experience" className="section-shell section-block experience-section">
      <div className="section-heading">
        <div><p className="section-label">02 / experience</p><h2>Where the systems met reality</h2></div>
        <p className="section-intro">The work spans internal platforms, security assessments, commerce, and API teams. The common thread is ownership from problem definition through production.</p>
      </div>
      <div className="experience-list">
        {primary.map((experience) => (
          <article className="experience-item" key={`${experience.company}-${experience.period}`}>
            <div className="experience-meta"><span>{experience.period}</span><span>{experience.location}</span></div>
            <div className="experience-content">
              <p className="experience-company">{experience.company}</p>
              <h3>{experience.title}</h3>
              <p className="experience-description">{experience.description}</p>
              <ul>{experience.bullets.slice(0, 3).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              <div className="stack-list">{experience.tech.slice(0, 6).map((technology) => <span key={technology}>{technology}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
      <details className="earlier-experience"><summary>Earlier work and foundations <span>+</span></summary><div className="earlier-grid">{earlier.map((experience) => <div key={`${experience.company}-${experience.period}`}><span>{experience.period}</span><strong>{experience.title}</strong><b>{experience.company}</b><p>{experience.description}</p></div>)}</div></details>
    </section>
  );
}

const CAPABILITIES = [
  { number: "01", title: "APIs and backend systems", detail: "REST design, Spring Boot, Node.js, server-side validation, background work, and integration boundaries." },
  { number: "02", title: "Data and persistence", detail: "PostgreSQL, SQLite, Prisma, RLS, transactions, migrations, audit history, and query-aware models." },
  { number: "03", title: "Security and authorization", detail: "OWASP-informed thinking, field-level access control, tenant isolation, secure local services, and least privilege." },
  { number: "04", title: "Applied AI", detail: "Whisper pipelines, semantic search, streaming generation, prompt context, and product boundaries that keep AI useful." },
  { number: "05", title: "Product delivery", detail: "Turning ambiguous workflows into shipped interfaces, usable defaults, documentation, and measurable operational change." },
  { number: "06", title: "Infrastructure ownership", detail: "Vercel, Nginx, Docker, caching, backups, domain hygiene, deployment checks, and cost-aware operations." },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="section-block section-tinted capabilities-section">
      <div className="section-shell">
        <div className="section-heading"><div><p className="section-label">03 / capabilities</p><h2>How I think about engineering</h2></div><p className="section-intro">Tools change. These are the problem spaces I can take responsibility for.</p></div>
        <div className="capability-grid">{CAPABILITIES.map((capability) => <article className="capability-card" key={capability.number}><span>{capability.number}</span><h3>{capability.title}</h3><p>{capability.detail}</p></article>)}</div>
      </div>
    </section>
  );
}

export function MoreWorkSection() {
  return (
    <section id="more-work" className="section-shell section-block archive-section">
      <div className="section-heading"><div><p className="section-label">04 / more work</p><h2>Smaller projects, different muscles</h2></div><p className="section-intro">The flagship case studies show depth. This archive shows range without competing for attention.</p></div>
      <div className="archive-list">{projectsData.map((project, index) => <article className="archive-item" key={project.id}><span className="archive-number">0{index + 1}</span><div><p className="archive-category">{project.category}</p><h3>{project.title}</h3><p className="archive-tagline">{project.tagline}</p><p>{project.description}</p><div className="stack-list">{project.tech.slice(0, 5).map((technology) => <span key={technology}>{technology}</span>)}</div></div><div className="archive-links">{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" data-analytics="project-outbound">Live <ArrowUpRight size={14} /></a>}{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" data-analytics="repository-click">Source <GithubIcon size={14} /></a>}</div></article>)}</div>
    </section>
  );
}

export function WritingSection({ posts }: { posts: MediumPost[] }) {
  return (
    <section id="writing" className="section-block section-tinted writing-section">
      <div className="section-shell">
        <div className="section-heading"><div><p className="section-label">05 / writing</p><h2>Technical notes with a point of view</h2></div><a className="text-link" href="https://medium.com/@binhakim" target="_blank" rel="noopener noreferrer" data-analytics="writing-click">All articles <ArrowUpRight size={14} /></a></div>
        <div className="writing-grid">{posts.slice(0, 3).map((post) => <a className="writing-card" href={post.url} target="_blank" rel="noopener noreferrer" key={post.url} data-analytics="writing-click"><div className="writing-meta"><span>{post.date}</span><span>{post.readTime}</span></div><h3>{post.title}</h3><p>{post.excerpt}</p><span className="text-link">Read on Medium <ArrowUpRight size={13} /></span></a>)}</div>
      </div>
    </section>
  );
}

export function BackgroundSection() {
  return (
    <section id="background" className="section-shell section-block background-section">
      <div className="section-heading"><div><p className="section-label">06 / background</p><h2>The context behind the work</h2></div><p className="section-intro">A compact record of the foundations that inform how I build, communicate, and keep learning.</p></div>
      <div className="background-grid">
        <article className="background-card background-education"><span className="card-label">Education</span><h3>{credentials.education.degree}</h3><p>{credentials.education.major} · {credentials.education.school}</p><span>{credentials.education.period} · {credentials.education.location}</span><p className="background-note">{credentials.education.graduate}</p></article>
        <article className="background-card"><span className="card-label">Credentials</span><ul className="credential-list">{credentials.certifications.map((cert) => <li key={cert.name}><strong>{cert.name}</strong><span>{cert.issuer}{cert.year ? ` · ${cert.year}` : ""}</span></li>)}</ul></article>
        <article className="background-card"><span className="card-label">Signals</span><div className="signal-block"><strong>{credentials.honours[0].title}</strong><span>{credentials.honours[0].detail} · {credentials.honours[0].year}</span></div><div className="signal-block"><strong>Languages</strong><span>{credentials.languages.map((language) => `${language.name} (${language.level})`).join(" · ")}</span></div></article>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
      <section id="contact" className="contact-section">
      <div className="section-shell contact-inner"><div><p className="section-label">07 / contact</p><h2>Let’s build something dependable.</h2><p>I’m open to backend and full-stack engineering roles, infrastructure work, and collaborations involving systems design, APIs, data, or applied security.</p></div><div className="contact-actions"><a href="mailto:yusufnaeemhakim@gmail.com" className="button button-primary button-large" data-analytics="contact-click"><Mail size={15} /> Email me</a><a href="https://linkedin.com/in/binhakim" target="_blank" rel="noopener noreferrer" className="button button-secondary button-large" data-analytics="contact-click"><LinkedinIcon size={15} /> LinkedIn</a><a href="https://github.com/ws0x" target="_blank" rel="noopener noreferrer" className="button button-quiet button-large" data-analytics="contact-click"><GithubIcon size={15} /> GitHub</a></div><div className="contact-location"><MapPin size={14} /> Cairo, Egypt · open to remote collaboration</div></div>
    </section>
  );
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="section-shell"><span>binhakim.dev · Yusuf Naeem Abd El-Hakim</span><span>Built with care for the systems behind the interface.</span><a href="#analytics-preferences">Analytics preferences</a></div></footer>;
}
