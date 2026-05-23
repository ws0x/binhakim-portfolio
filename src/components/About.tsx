"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import skillsData from "../data/skills.json";

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
              I&apos;m a Software Engineer with a strong academic foundation in
              Computer Science and hands-on professional experience building
              robust backend architectures, optimizing database performance, and
              managing modern web server infrastructure.
            </p>
            <p>
              I love deep-diving into system internals whether it&apos;s
              understanding how a query planner makes decisions, tracing a
              request through a reverse proxy, or designing message flows
              between async services.
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

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {skillsData.softSkills.map((skill, i) => (
              <div key={skill.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.45rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-jet), monospace",
                      fontSize: "0.75rem",
                      color: "var(--text-primary)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {skill.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-jet), monospace",
                      fontSize: "0.65rem",
                      color: "var(--cyan)",
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div
                  style={{
                    height: "4px",
                    background: "rgba(0,217,255,0.08)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="skill-bar-fill"
                    style={{
                      height: "100%",
                      width: inView ? `${skill.level}%` : "0%",
                      background: `linear-gradient(90deg, var(--cyan), rgba(0,102,255,0.8))`,
                      borderRadius: "2px",
                      transition: `width 1s ease ${0.3 + i * 0.1}s`,
                      boxShadow: "0 0 8px rgba(0,217,255,0.4)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
