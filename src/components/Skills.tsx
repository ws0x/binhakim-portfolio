"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import skillsData from "../data/skills.json";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

// Core stack — primary technologies
const FEATURED = [
  { name: "Java",        cat: "LANG",     glyph: "JV" },
  { name: "TypeScript",  cat: "LANG",     glyph: "TS" },
  { name: "Spring Boot", cat: "BACKEND",  glyph: "SB" },
  { name: "PostgreSQL",  cat: "DATABASE", glyph: "PG" },
  { name: "Next.js",     cat: "FRONTEND", glyph: "NX" },
  { name: "Node.js",     cat: "BACKEND",  glyph: "NJ" },
  { name: "Nginx",       cat: "INFRA",    glyph: "NG" },
  { name: "Git",         cat: "TOOLING",  glyph: "GT" },
];

// Short display labels for the manifest panel
const LABEL_MAP: Record<string, string> = {
  "Languages":      "LANG",
  "Frontend":       "FRONTEND",
  "Backend":        "BACKEND",
  "Databases":      "DATABASE",
  "AI / LLM":       "AI/LLM",
  "Infrastructure": "INFRA",
  "Security":       "SEC",
  "Practices":      "TOOLING",
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="section-pad"
      style={{
        background: "var(--bg-elevated)",
        borderTop: "1px solid rgba(0,217,255,0.07)",
        borderBottom: "1px solid rgba(0,217,255,0.07)",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ marginBottom: "3rem" }}
        >
          <p className="section-header">// 02. Tech Stack</p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Tools I Build With
          </h2>
        </motion.div>

        {/* Two-panel layout */}
        <div className="skills-layout">

          {/* ── LEFT: Core stack cards ─────────────────────── */}
          <div>
            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="skills-cmd-label"
            >
              $ core --primary
            </motion.p>

            <div className="featured-grid">
              {FEATURED.map((feat, i) => (
                <motion.div
                  key={feat.name}
                  custom={i + 2}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="skill-card"
                >
                  {/* Glyph badge */}
                  <span className="skill-card-glyph">{feat.glyph}</span>

                  {/* Tech name */}
                  <span className="skill-card-name">{feat.name}</span>

                  {/* Status row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "var(--success)",
                        boxShadow: "0 0 6px rgba(16,185,129,0.5)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-jet), monospace",
                        fontSize: "0.58rem",
                        letterSpacing: "0.14em",
                        color: "var(--text-dim)",
                        textTransform: "uppercase",
                      }}
                    >
                      {feat.cat}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Full manifest ───────────────────────── */}
          <motion.div
            custom={8}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <p className="skills-cmd-label">$ stack --all</p>

            <div className="manifest-panel">
              {skillsData.categories.map((cat, i) => (
                <div
                  key={cat.label}
                  className="manifest-row"
                  style={{
                    borderBottom:
                      i < skillsData.categories.length - 1
                        ? "1px solid rgba(0,217,255,0.05)"
                        : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-jet), monospace",
                      fontSize: "0.58rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--cyan)",
                      opacity: 0.65,
                    }}
                  >
                    {LABEL_MAP[cat.label] ?? cat.label.toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-jet), monospace",
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {cat.skills.map((skill, si) => (
                      <span key={skill}>
                        <span className="manifest-skill">{skill}</span>
                        {si < cat.skills.length - 1 && (
                          <span style={{ color: "var(--text-dim)", opacity: 0.5, margin: "0 0.4rem" }}>·</span>
                        )}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
