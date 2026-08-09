"use client";

import Reveal from "./ui/Reveal";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Globe } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { COMMIT_FEATURES, COMMIT_GREEN, COMMIT_TECH, NF_CYAN, NF_FEATURES, NF_TECH, ORBIT_FEATURES, ORBIT_TECH } from "./live/data";
import { CommitLogo, NexFlowLogo, OrbitLogo } from "./live/logos";
import OrbitMockupPanel from "./live/mockups/orbit";
import NexFlowMockupPanel from "./live/mockups/nexflow";
import CommitMockupPanel from "./live/mockups/commit";

export default function LiveProjects() {
  const [orbitHovered,  setOrbitHovered]  = useState(false);
  const [nfHovered,     setNfHovered]     = useState(false);
  const [commitHovered, setCommitHovered] = useState(false);

  return (
    <section
      id="live-projects"
      className="section-pad"
      style={{
        background:
          "radial-gradient(ellipse at 25% 55%, rgba(124,58,237,0.05) 0%, transparent 55%), radial-gradient(ellipse at 75% 0%, rgba(0,217,255,0.06) 0%, transparent 50%), var(--bg-elevated)",
        borderTop:    "1px solid rgba(0,217,255,0.07)",
        borderBottom: "1px solid rgba(0,217,255,0.07)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,217,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px", pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "72rem", margin: "0 auto", position: "relative" }}>
        <div>

          {/* ── Section header ── */}
          <Reveal as="div" delay={0}
            style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap" }}
          >
            <div>
              <p className="section-header">{"// 03. Live"}</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "0.6rem" }}>
                Shipped &amp; Deployed
              </h2>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", maxWidth: "44rem", lineHeight: 1.7 }}>
                Production products with authentication, persistence and deployed workflows.
              </p>
            </div>
            <Link href="/work" className="github-btn">Read the case studies <ArrowUpRight size={13} /></Link>
          </Reveal>

          {/* ══════════════════════════════════════════════════════════════════
              COMMIT CARD
          ══════════════════════════════════════════════════════════════════ */}
          <Reveal as="div" delay={3}
            style={{ marginTop: "2.5rem" }}
          >
            <div
              className="live-card-grid"
              onMouseEnter={() => setCommitHovered(true)}
              onMouseLeave={() => setCommitHovered(false)}
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${commitHovered ? "rgba(16,185,129,0.42)" : "rgba(16,185,129,0.16)"}`,
                borderRadius: "14px",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease",
                boxShadow: commitHovered
                  ? "0 0 0 1px rgba(16,185,129,0.14), 0 0 60px rgba(16,185,129,0.1), 0 12px 60px rgba(0,0,0,0.5)"
                  : "0 0 0 1px rgba(16,185,129,0.04), 0 6px 40px rgba(0,0,0,0.45)",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Corner accent */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "280px", height: "280px", background: "radial-gradient(circle at top right, rgba(16,185,129,0.08), transparent 65%)", borderRadius: "0 14px 0 0", pointerEvents: "none" }} />

              {/* ── Left: info ── */}
              <div style={{ position: "relative" }}>
                <CommitLogo />

                {/* Status row */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.4rem", flexWrap: "wrap" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.28)", borderRadius: "100px", padding: "4px 12px 4px 8px" }}>
                    <span className="online-dot" style={{ width: "7px", height: "7px" }} />
                    <span style={{ fontFamily: "var(--font-jet), monospace", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", color: "var(--success)", textTransform: "uppercase" }}>Live Now</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-jet), monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-dim)" }}>SaaS · EdTech</span>
                </div>

                <h3 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.035em", lineHeight: 1, marginBottom: "0.45rem" }}>commit_</h3>
                <p style={{ fontFamily: "var(--font-jet), monospace", fontSize: "0.75rem", color: COMMIT_GREEN, letterSpacing: "0.08em", marginBottom: "1.1rem", opacity: 0.82 }}>
                  Finish What You Started Learning
                </p>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1.75rem", maxWidth: "44rem" }}>
                  A habit-forming curriculum tracker for self-taught developers who are great at starting but rarely finish. The entire product speaks{" "}
                  <strong style={{ color: "var(--text-primary)" }}>git</strong>: a study session is a <em>commit</em>, your streak is a <em>contribution graph</em>, finishing a course is <em>merging to main</em>. Built around a{" "}
                  <strong style={{ color: "var(--text-primary)" }}>completion loop</strong> — log a session → keep the streak → see what&apos;s next → get a nudge → celebrate → repeat. Features a smart ETA engine, a gamification layer with XP and badges, a glowing transit-style roadmap, pacing nudges that encourage instead of guilt, and daily email digests via Resend — all on SQLite locally and Postgres in production with a one-line schema swap.
                </p>

                {/* Feature chips */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.6rem", marginBottom: "1.75rem" }}>
                  {COMMIT_FEATURES.map(({ Icon, label, detail }) => (
                    <div
                      key={label}
                      style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", padding: "0.65rem 0.75rem", background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.09)", borderRadius: "7px", transition: "background 0.2s, border-color 0.2s" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(16,185,129,0.07)"; el.style.borderColor = "rgba(16,185,129,0.22)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(16,185,129,0.03)"; el.style.borderColor = "rgba(16,185,129,0.09)"; }}
                    >
                      <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.16)", display: "flex", alignItems: "center", justifyContent: "center", color: COMMIT_GREEN, flexShrink: 0 }}>
                        <Icon size={13} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "0.15rem" }}>{label}</div>
                        <div style={{ fontSize: "0.67rem", color: "var(--text-dim)", lineHeight: 1.3 }}>{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* ── Right: mockup + tech + CTAs ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <CommitMockupPanel />

                {/* Tech */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {COMMIT_TECH.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <a
                    href="https://commit.binhakim.dev/" target="_blank" rel="noopener noreferrer" data-track="project" data-target="commit-live"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-jet), monospace", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#031410", background: COMMIT_GREEN, padding: "0.65rem 1.4rem", borderRadius: "6px", textDecoration: "none", boxShadow: "0 0 22px rgba(16,185,129,0.38)", transition: "background 0.2s, box-shadow 0.2s, transform 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#34d399"; el.style.boxShadow = "0 0 36px rgba(16,185,129,0.58)"; el.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = COMMIT_GREEN; el.style.boxShadow = "0 0 22px rgba(16,185,129,0.38)"; el.style.transform = "translateY(0)"; }}
                  >
                    <Globe size={14} /> Visit App <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://github.com/ws0x" target="_blank" rel="noopener noreferrer" data-track="github" data-target="profile"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-jet), monospace", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", background: "transparent", border: "1px solid rgba(16,185,129,0.25)", padding: "0.65rem 1.2rem", borderRadius: "6px", textDecoration: "none", transition: "color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = COMMIT_GREEN; el.style.borderColor = "rgba(16,185,129,0.55)"; el.style.background = "rgba(16,185,129,0.06)"; el.style.boxShadow = "0 0 14px rgba(16,185,129,0.12)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--text-secondary)"; el.style.borderColor = "rgba(16,185,129,0.25)"; el.style.background = "transparent"; el.style.boxShadow = "none"; }}
                  >
                    <GithubIcon size={14} /> GitHub profile
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ══════════════════════════════════════════════════════════════════
              ORBIT CARD
          ══════════════════════════════════════════════════════════════════ */}
          <Reveal as="div" delay={1} style={ { marginTop: "2.5rem" } }>
            <div
              className="live-card-grid"
              onMouseEnter={() => setOrbitHovered(true)}
              onMouseLeave={() => setOrbitHovered(false)}
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${orbitHovered ? "rgba(0,217,255,0.38)" : "rgba(0,217,255,0.16)"}`,
                borderRadius: "14px",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease",
                boxShadow: orbitHovered
                  ? "0 0 0 1px rgba(0,217,255,0.12), 0 0 60px rgba(0,217,255,0.09), 0 12px 60px rgba(0,0,0,0.5)"
                  : "0 0 0 1px rgba(0,217,255,0.04), 0 6px 40px rgba(0,0,0,0.45)",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Corner accent */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "280px", height: "280px", background: "radial-gradient(circle at top right, rgba(0,217,255,0.07), transparent 65%)", borderRadius: "0 14px 0 0", pointerEvents: "none" }} />

              {/* ── Left: info ── */}
              <div style={{ position: "relative" }}>
                <OrbitLogo />

                {/* Status row */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.4rem", flexWrap: "wrap" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.28)", borderRadius: "100px", padding: "4px 12px 4px 8px" }}>
                    <span className="online-dot" style={{ width: "7px", height: "7px" }} />
                    <span style={{ fontFamily: "var(--font-jet), monospace", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", color: "var(--success)", textTransform: "uppercase" }}>Live Now</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-jet), monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-dim)" }}>Full-Stack SaaS</span>
                </div>

                <h3 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.035em", lineHeight: 1, marginBottom: "0.45rem" }}>Orbit</h3>
                <p style={{ fontFamily: "var(--font-jet), monospace", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.08em", marginBottom: "1.1rem", opacity: 0.82 }}>Professional Relationship OS</p>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1.75rem", maxWidth: "44rem" }}>
                  A full-stack <strong style={{ color: "var(--text-primary)" }}>Professional Relationship OS </strong> that turns your professional network into a queryable, visual, and AI-powered system. OAuth SSO via Google &amp; LinkedIn, Gemini AI semantic search, D3 force-directed relationship graph, Stripe billing, Supabase RLS multi-tenancy, push reminders and a bilingual EN/AR interface, all deployed on Vercel.
                </p>

                {/* Feature chips */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.6rem", marginBottom: "1.75rem" }}>
                  {ORBIT_FEATURES.map(({ Icon, label, detail }) => (
                    <div
                      key={label}
                      style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", padding: "0.65rem 0.75rem", background: "rgba(0,217,255,0.03)", border: "1px solid rgba(0,217,255,0.09)", borderRadius: "7px", transition: "background 0.2s, border-color 0.2s" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(0,217,255,0.07)"; el.style.borderColor = "rgba(0,217,255,0.22)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(0,217,255,0.03)"; el.style.borderColor = "rgba(0,217,255,0.09)"; }}
                    >
                      <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: "rgba(0,217,255,0.07)", border: "1px solid rgba(0,217,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan)", flexShrink: 0 }}>
                        <Icon size={13} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "0.15rem" }}>{label}</div>
                        <div style={{ fontSize: "0.67rem", color: "var(--text-dim)", lineHeight: 1.3 }}>{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* ── Right: mockup + tech + CTAs ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <OrbitMockupPanel />

                {/* Tech */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {ORBIT_TECH.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <a
                    href="https://byorbit.io" target="_blank" rel="noopener noreferrer" data-track="project" data-target="orbit-live"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-jet), monospace", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--bg-base)", background: "var(--cyan)", padding: "0.65rem 1.4rem", borderRadius: "6px", textDecoration: "none", boxShadow: "0 0 22px rgba(0,217,255,0.38)", transition: "background 0.2s, box-shadow 0.2s, transform 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#33e1ff"; el.style.boxShadow = "0 0 36px rgba(0,217,255,0.58)"; el.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "var(--cyan)"; el.style.boxShadow = "0 0 22px rgba(0,217,255,0.38)"; el.style.transform = "translateY(0)"; }}
                  >
                    <Globe size={14} /> Visit App <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://github.com/ws0x/orbit" target="_blank" rel="noopener noreferrer" data-track="github" data-target="orbit"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-jet), monospace", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", background: "transparent", border: "1px solid rgba(0,217,255,0.25)", padding: "0.65rem 1.2rem", borderRadius: "6px", textDecoration: "none", transition: "color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--cyan)"; el.style.borderColor = "rgba(0,217,255,0.55)"; el.style.background = "rgba(0,217,255,0.06)"; el.style.boxShadow = "0 0 14px rgba(0,217,255,0.12)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--text-secondary)"; el.style.borderColor = "rgba(0,217,255,0.25)"; el.style.background = "transparent"; el.style.boxShadow = "none"; }}
                  >
                    <GithubIcon size={14} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ══════════════════════════════════════════════════════════════════
              NEXFLOW CARD
          ══════════════════════════════════════════════════════════════════ */}
          <Reveal as="div" delay={2}
            style={{ marginTop: "2.5rem" }}
          >
            <div
              className="live-card-grid"
              onMouseEnter={() => setNfHovered(true)}
              onMouseLeave={() => setNfHovered(false)}
              style={{
                background: "var(--bg-card)",
                border: `1px solid ${nfHovered ? "rgba(6,182,212,0.42)" : "rgba(6,182,212,0.16)"}`,
                borderRadius: "14px",
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease",
                boxShadow: nfHovered
                  ? "0 0 0 1px rgba(6,182,212,0.14), 0 0 60px rgba(6,182,212,0.1), 0 12px 60px rgba(0,0,0,0.5)"
                  : "0 0 0 1px rgba(6,182,212,0.04), 0 6px 40px rgba(0,0,0,0.45)",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Corner accent */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "280px", height: "280px", background: "radial-gradient(circle at top right, rgba(6,182,212,0.08), transparent 65%)", borderRadius: "0 14px 0 0", pointerEvents: "none" }} />

              {/* ── Left: info ── */}
              <div style={{ position: "relative" }}>
                <NexFlowLogo />

                {/* Status row */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.4rem", flexWrap: "wrap" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.28)", borderRadius: "100px", padding: "4px 12px 4px 8px" }}>
                    <span className="online-dot" style={{ width: "7px", height: "7px" }} />
                    <span style={{ fontFamily: "var(--font-jet), monospace", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.16em", color: "var(--success)", textTransform: "uppercase" }}>Live Now</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-jet), monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-dim)" }}>Internal Platform · B2B</span>
                </div>

                <h3 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.035em", lineHeight: 1, marginBottom: "0.45rem" }}>NexFlow</h3>
                <p style={{ fontFamily: "var(--font-jet), monospace", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.08em", marginBottom: "1.1rem", opacity: 0.82 }}>
                  Intelligent Lead Pipeline Management
                </p>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1.75rem", maxWidth: "44rem" }}>
                  An internal B2B platform that replaced Excel-based lead tracking across <strong style={{ color: "var(--text-primary)" }}>4 business entities</strong>. Built with a field-level RBAC system that strips Marketing data <em>server-side</em> before it reaches Sales clients — not just hidden in the UI. Features an <strong style={{ color: "var(--text-primary)" }}>atomic REQ code engine</strong> for conflict-free concurrent writes, Whisper AI voice transcription in Egyptian Arabic, real-time WhatsApp handoff cards, and a full audit trail logging every field change with user, timestamp, and before → after values.
                </p>

                {/* Feature chips */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.6rem", marginBottom: "1.75rem" }}>
                  {NF_FEATURES.map(({ Icon, label, detail }) => (
                    <div
                      key={label}
                      style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", padding: "0.65rem 0.75rem", background: "rgba(6,182,212,0.03)", border: "1px solid rgba(6,182,212,0.09)", borderRadius: "7px", transition: "background 0.2s, border-color 0.2s" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(6,182,212,0.07)"; el.style.borderColor = "rgba(6,182,212,0.22)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(6,182,212,0.03)"; el.style.borderColor = "rgba(6,182,212,0.09)"; }}
                    >
                      <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.16)", display: "flex", alignItems: "center", justifyContent: "center", color: NF_CYAN, flexShrink: 0 }}>
                        <Icon size={13} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "0.15rem" }}>{label}</div>
                        <div style={{ fontSize: "0.67rem", color: "var(--text-dim)", lineHeight: 1.3 }}>{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* ── Right: mockup + tech + CTAs ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <NexFlowMockupPanel />

                {/* Tech */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {NF_TECH.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <a
                    href="https://github.com/ws0x/nexflow" target="_blank" rel="noopener noreferrer" data-track="github" data-target="nexflow"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-jet), monospace", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#05131f", background: NF_CYAN, padding: "0.65rem 1.4rem", borderRadius: "6px", textDecoration: "none", boxShadow: "0 0 22px rgba(6,182,212,0.38)", transition: "background 0.2s, box-shadow 0.2s, transform 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#22d3ee"; el.style.boxShadow = "0 0 36px rgba(6,182,212,0.58)"; el.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = NF_CYAN; el.style.boxShadow = "0 0 22px rgba(6,182,212,0.38)"; el.style.transform = "translateY(0)"; }}
                  >
                    <GithubIcon size={14} /> Repository <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://github.com/ws0x/nexflow" target="_blank" rel="noopener noreferrer" data-track="github" data-target="nexflow"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-jet), monospace", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", background: "transparent", border: "1px solid rgba(6,182,212,0.25)", padding: "0.65rem 1.2rem", borderRadius: "6px", textDecoration: "none", transition: "color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = NF_CYAN; el.style.borderColor = "rgba(6,182,212,0.55)"; el.style.background = "rgba(6,182,212,0.06)"; el.style.boxShadow = "0 0 14px rgba(6,182,212,0.12)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--text-secondary)"; el.style.borderColor = "rgba(6,182,212,0.25)"; el.style.background = "transparent"; el.style.boxShadow = "none"; }}
                  >
                    <GithubIcon size={14} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
