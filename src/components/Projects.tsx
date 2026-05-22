"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import projectsData from "../data/projects.json";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github: string | null;
  live: string | null;
  featured: boolean;
  category: string;
}

function ProjectRow({
  project,
  index,
  num,
}: {
  project: Project;
  index: number;
  num: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="project-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Index number */}
      <div
        style={{
          fontFamily: "var(--font-jet), monospace",
          fontWeight: 700,
          fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
          color: hovered ? "var(--cyan)" : "var(--text-dim)",
          opacity: hovered ? 0.6 : 0.2,
          lineHeight: 1,
          transition: "color 0.25s, opacity 0.25s",
          paddingTop: "0.2rem",
          userSelect: "none",
        }}
      >
        {String(num).padStart(2, "0")}
      </div>

      {/* Content */}
      <div>
        {/* Title row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
            marginBottom: "0.4rem",
            flexWrap: "wrap",
          }}
        >
          <h3
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.2,
              transition: "color 0.2s",
            }}
          >
            {project.title}
          </h3>

          {/* Category + external link */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-jet), monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: hovered ? "var(--cyan)" : "var(--text-dim)",
                transition: "color 0.25s",
              }}
            >
              {project.category}
            </span>
            {project.github && (
              <ArrowUpRight
                size={13}
                style={{
                  color: hovered ? "var(--cyan)" : "var(--text-dim)",
                  transition: "color 0.25s",
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-jet), monospace",
            fontSize: "0.72rem",
            color: "var(--cyan)",
            letterSpacing: "0.05em",
            marginBottom: "0.65rem",
            opacity: 0.8,
          }}
        >
          {project.tagline}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "1rem",
            maxWidth: "52rem",
          }}
        >
          {project.description}
        </p>

        {/* Tech tags + GitHub link */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}
          >
            {project.tech.map((t) => (
              <span key={t} className="tech-tag">
                {t}
              </span>
            ))}
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="github-btn"
            >
              <GithubIcon size={13} /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="projects"
      className="section-pad"
      style={{
        background: "var(--bg-elevated)",
        borderTop: "1px solid rgba(0,217,255,0.07)",
        borderBottom: "1px solid rgba(0,217,255,0.07)",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div ref={ref}>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ marginBottom: "1rem" }}
          >
            <p className="section-header">// 04. Projects</p>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Things I&apos;ve built
            </h2>
          </motion.div>
        </div>

        {/* Indexed list */}
        <div style={{ borderBottom: "1px solid rgba(0,217,255,0.07)" }}>
          {projectsData.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i + 1}
              num={i + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
