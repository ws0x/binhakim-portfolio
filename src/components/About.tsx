"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Cpu, ScanSearch, Layers, FileCode2, LayoutDashboard } from "lucide-react";
import skillsData from "../data/skills.json";

const TRAITS = [
  {
    Icon: LayoutDashboard,
    name: "System Design",
    desc: "Structure before syntax, always",
  },
  {
    Icon: Layers,
    name: "Problem Decomposition",
    desc: "Divide, conquer, iterate",
  },
  {
    Icon: Cpu,
    name: "Systems Thinking",
    desc: "Seeing the full picture before touching a line",
  },
  {
    Icon: ScanSearch,
    name: "Critical Analysis",
    desc: "Cutting through noise to find the real problem",
  },
  {
    Icon: FileCode2,
    name: "Technical Writing",
    desc: "Turning complexity into clarity",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="section-pad"
      style={{ maxWidth: "72rem", margin: "0 auto" }}
    >
      {/* Section label */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ marginBottom: "3.5rem" }}
      >
        <p className="section-header">// 01. About</p>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          Engineering systems that{" "}
          <span style={{ color: "var(--cyan)" }}>just work</span>
        </h2>
      </motion.div>

      <div className="about-grid">
        {/* Bio panel */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="panel"
          style={{ padding: "2rem" }}
        >
          <p className="panel-label" style={{ marginBottom: "1.25rem" }}>
            $ cat profile.txt
          </p>

          <div
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <p>
              I&apos;m a software engineer who takes systems from a blank schema
              to production without supervision. Three years designing REST APIs,
              relational data models, and access-control layers built to hold
              under concurrent load — plus the deployment, reliability, and
              hardening that come after launch.
            </p>
            <p>
              Offensive-security training in the OWASP Top 10 shapes how I work:
              systems get threat-modelled before they ship rather than patched
              afterwards. I&apos;m equally comfortable on the commercial side —
              gathering requirements across business units, running cost-benefit
              analysis for executive decisions, and redesigning the processes the
              software is meant to serve.
            </p>
            <p>
              Two self-directed SaaS products taken solo from idea to public
              launch: Orbit, a Professional Relationship OS with OAuth SSO,
              Gemini semantic search, and Stripe billing, runs live at{" "}
              <a
                href="https://byorbit.io"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--cyan)", textDecoration: "none" }}
              >
                byorbit.io
              </a>
              , and Commit, a curriculum tracker for self-taught developers, at{" "}
              <a
                href="https://commit.binhakim.dev"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--cyan)", textDecoration: "none" }}
              >
                commit.binhakim.dev
              </a>
              .
            </p>
            <p>
              I&apos;m now formalising that practice through graduate research in
              distributed systems and software system design.
            </p>
            <p>
              When I&apos;m not building systems, I write on{" "}
              <a
                href="https://medium.com/@binhakim"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--cyan)", textDecoration: "none" }}
              >
                Medium
              </a>{" "}
              about backend engineering, databases, and infrastructure patterns
              I&apos;ve found useful.
            </p>
          </div>

          {/* Links row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginTop: "1.75rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(0,217,255,0.1)",
            }}
          >
            {[
              { label: "GitHub", href: "https://github.com/ws0x" },
              { label: "LinkedIn", href: "https://linkedin.com/in/binhakim" },
              { label: "Medium", href: "https://medium.com/@binhakim" },
              {
                label: "Email",
                href: "mailto:yusufnaeemhakim@gmail.com",
              },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="tech-tag"
                style={{ textDecoration: "none" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* System diagnostics panel */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="panel"
          style={{ padding: "2rem" }}
        >
          <p className="panel-label" style={{ marginBottom: "1.25rem" }}>
            $ diagnostics --soft-skills
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {TRAITS.map((trait) => (
              <div key={trait.name} className="trait-card">
                <div className="trait-icon-wrap">
                  <trait.Icon size={15} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-jet), monospace",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      letterSpacing: "0.03em",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {trait.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text-dim)",
                      letterSpacing: "0.01em",
                      lineHeight: 1.4,
                    }}
                  >
                    {trait.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
