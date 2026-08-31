import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import experienceData from "@/data/experience.json";
import credentials from "@/data/credentials.json";
import type { MediumPost } from "@/lib/getMediumPosts";
import { GithubIcon, LinkedinIcon, TechIcon } from "@/components/BrandIcons";
import { EngineeringRadarStrip } from "@/components/EngineeringRadarStrip";
import { getProjectsByCollection } from "@/content/projects";

export function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="hero-pulse" /> Available for product engineering & full-stack roles</div>
          <p className="hero-command">$ whoami / product engineer bridging software systems and business operations</p>
          <h1>
            <span className="hero-name-primary">Yusuf Naeem</span>
            <span className="hero-name-secondary">Abd El-Hakim</span>
          </h1>
          <p className="hero-role">Product Engineer · Software Systems & Business Impact</p>
          <p className="hero-summary">I build production software end to end, unifying system architecture, resilient data flows, security boundaries, and real business operations into dependable products.</p>
          <div className="hero-actions">
            <Link href="/work" className="button button-primary button-large">Explore Binhakim Works <ArrowUpRight size={16} /></Link>
            <a href="/resume.pdf" download="Yusuf_Naeem_Resume.pdf" className="button button-secondary button-large" data-analytics="resume-download"><Download size={15} /> Download resume</a>
          </div>
          <div className="hero-proof"><span>Product Architecture</span><span>System Design</span><span>Applied Security</span><span>Business Outcomes</span></div>
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
    </section>
  );
}

export function EvidenceStrip() {
  return <EngineeringRadarStrip />;
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section-shell section-block experience-section">
      <div className="section-heading">
        <div><p className="section-label">02 / experience</p><h2>Where the systems met reality</h2></div>
        <p className="section-intro">The work spans internal platforms, security assessments, commerce, and API teams. The common thread is ownership from problem definition through production.</p>
      </div>
      <div className="experience-list">
        {experienceData.map((experience, index) => (
          <article className={`experience-item ${index === 0 ? "experience-current" : "experience-earlier"}`} key={`${experience.company}-${experience.period}`}>
            <div className="experience-meta"><span>{experience.period}</span><span>{experience.location}</span></div>
            <div className="experience-content">
              <p className="experience-company">{experience.company}</p>
              <h3>{experience.title}</h3>
              <p className="experience-description">{experience.description}</p>
              <ul>{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              <div className="experience-tech-list">
                {experience.tech.map((technology) => (
                  <span key={technology} className="experience-tech-badge">
                    <TechIcon name={technology} size={13} />
                    <span>{technology}</span>
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
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
  const secondaryProjects = [
    ...getProjectsByCollection("open-source"),
    ...getProjectsByCollection("experiment"),
    ...getProjectsByCollection("archive"),
  ];

  return (
    <section id="more-work" className="section-shell section-block archive-section">
      <div className="section-heading"><div><p className="section-label">04 / Binhakim Works</p><h2>Smaller products, honest status</h2></div><p className="section-intro">Binhakim Works is Yusuf Naeem&apos;s independent product lab and open-source practice. The flagship stories show depth. This collection shows range without inflating unfinished work.</p></div>
      <div className="archive-list">
        {secondaryProjects.map((project, index) => (
          <article className="archive-item" key={project.slug}>
            <span className="archive-number">0{index + 1}</span>
            <div>
              <p className="archive-category">{project.category}</p>
              <h3>{project.name}</h3>
              {project.tagline && <p className="archive-tagline">{project.tagline}</p>}
              <p>{project.summary}</p>
              <p className={`archive-status status-${project.status}`}>{project.statusLabel}</p>
              <div className="story-stack-inline archive-stack" aria-label={`${project.name} tech stack`}>
                {project.stack.map((technology) => (
                  <span key={technology} className="tech-tag">
                    <TechIcon name={technology} size={13} />
                    <span>{technology}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="archive-links">
              {project.links.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer" data-analytics="project-outbound">Visit <ArrowUpRight size={14} /></a>}
              {project.links.source && <a href={project.links.source} target="_blank" rel="noopener noreferrer" data-analytics="repository-click">Source <GithubIcon size={14} /></a>}
            </div>
          </article>
        ))}
      </div>
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
      <div className="section-heading">
        <div><p className="section-label">06 / background</p><h2>The context behind the work</h2></div>
        <p className="section-intro">A compact record of the foundations that inform how I build, communicate, and keep learning.</p>
      </div>
      <div className="background-grid">
        <article className="background-card background-education">
          <span className="card-label">Education & Foundation</span>
          <h3>{credentials.education.degree}</h3>
          <p className="education-school">{credentials.education.major} · {credentials.education.school}</p>
          <span className="education-meta">{credentials.education.period} · {credentials.education.location}</span>
          
          <div className="education-stats-grid">
            <div className="edu-stat-pill">
              <span>Overall GPA</span>
              <strong>{credentials.education.gpa}</strong>
            </div>
            <div className="edu-stat-pill">
              <span>Final Term</span>
              <strong>{credentials.education.finalSemesterGpa} / 4.00</strong>
            </div>
            <div className="edu-stat-pill stat-highlight">
              <span>Grad Project</span>
              <strong>Grade {credentials.education.gradProjectGrade}</strong>
            </div>
          </div>

          <div className="education-activities">
            <span className="activity-label">Communities & Peer Tutoring</span>
            <div className="activity-tags">
              {credentials.education.activities.map((act) => (
                <span key={act} className="activity-tag">{act}</span>
              ))}
            </div>
            <p className="education-tutoring">{credentials.education.volunteering}</p>
          </div>
        </article>

        <article className="background-card background-credentials">
          <span className="card-label">Verified Certifications & Training</span>
          <div className="cert-card-list">
            {credentials.certifications.map((cert) => (
              <div className="cert-item-card" key={cert.name}>
                <div className="cert-item-header">
                  <strong>{cert.name}</strong>
                  {cert.tag && <span className="cert-tag">{cert.tag}</span>}
                </div>
                <div className="cert-item-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  {cert.year && <span className="cert-year">{cert.year}</span>}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="background-card background-signals">
          <span className="card-label">Signals & Spoken Languages</span>
          <div className="honour-badge-card">
            <div className="honour-header">
              <span className="honour-trophy">🏆</span>
              <div>
                <strong>{credentials.honours[0].title}</strong>
                <span>{credentials.honours[0].detail} ({credentials.honours[0].year})</span>
              </div>
            </div>
          </div>

          <div className="language-signals-group">
            <p className="language-group-title">Languages & Mobility</p>
            <div className="language-item">
              <div className="lang-header">
                <div className="lang-flag-group">
                  <span className="lang-tag">AR</span>
                  <span className="lang-name">Arabic</span>
                </div>
                <span className="lang-level-badge level-native">Native / Bilingual</span>
              </div>
              <div className="lang-bar-track">
                <div className="lang-bar-fill fill-native" />
              </div>
            </div>

            <div className="language-item">
              <div className="lang-header">
                <div className="lang-flag-group">
                  <span className="lang-tag">EN</span>
                  <span className="lang-name">English</span>
                </div>
                <span className="lang-level-badge level-fluent">Professional C1</span>
              </div>
              <div className="lang-bar-track">
                <div className="lang-bar-fill fill-fluent" />
              </div>
            </div>

            <div className="language-item">
              <div className="lang-header">
                <div className="lang-flag-group">
                  <span className="lang-tag">DE</span>
                  <span className="lang-name">German</span>
                </div>
                <span className="lang-level-badge level-working">Limited Working</span>
              </div>
              <div className="lang-bar-track">
                <div className="lang-bar-fill fill-working" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-shell contact-inner"><div><p className="section-label">07 / contact</p><h2>Let’s build something dependable.</h2><p>I’m open to product engineering and full-stack roles, system architecture work, and high-impact software initiatives connecting technology with real business outcomes.</p></div><div className="contact-actions"><a href="mailto:yusufnaeemhakim@gmail.com" className="button button-primary button-large" data-analytics="contact-click"><Mail size={15} /> Email me</a><a href="https://linkedin.com/in/binhakim" target="_blank" rel="noopener noreferrer" className="button button-secondary button-large" data-analytics="contact-click"><LinkedinIcon size={15} /> LinkedIn</a><a href="https://github.com/ws0x" target="_blank" rel="noopener noreferrer" className="button button-quiet button-large" data-analytics="contact-click"><GithubIcon size={15} /> GitHub</a></div><div className="contact-location"><MapPin size={14} /> Cairo, Egypt · open to remote collaboration</div></div>
    </section>
  );
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="section-shell"><span>binhakim.dev · Yusuf Naeem Abd El-Hakim</span><span>Built with care for the systems behind the interface.</span><a href="#analytics-preferences">Analytics preferences</a></div></footer>;
}
