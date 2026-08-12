"use client";

import { useState } from "react";
import { ArrowUpRight, Cpu, Database, Lock, Terminal, Zap } from "lucide-react";
import { TechIcon } from "@/components/BrandIcons";

interface RadarPillar {
  id: string;
  label: string;
  icon: typeof Cpu;
  metric: string;
  metricLabel: string;
  description: string;
  techs: string[];
  projectLink: string;
  projectName: string;
}

const PILLARS: RadarPillar[] = [
  {
    id: "backend",
    label: "Backend & APIs",
    icon: Terminal,
    metric: "4 Business Entities",
    metricLabel: "Unified in auditable pipeline",
    description: "Server-side field permission filtering, atomic REQ identifier sequences, and strict REST API contract boundaries.",
    techs: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth"],
    projectLink: "#work",
    projectName: "NexFlow",
  },
  {
    id: "local-systems",
    label: "Local-First & Data",
    icon: Database,
    metric: "Crash-Safe Queue",
    metricLabel: "Durable SQLite transaction boundary",
    description: "Loopback-only service architecture, local network privacy boundaries, and daemon auto-recovery.",
    techs: ["Python", "FastAPI", "SQLite", "yt-dlp", "FFmpeg"],
    projectLink: "#work",
    projectName: "Videx",
  },
  {
    id: "security",
    label: "Security & RLS",
    icon: Lock,
    metric: "PostgreSQL RLS",
    metricLabel: "Database-enforced tenant isolation",
    description: "Row-Level Security ensuring multi-tenant data boundaries are guaranteed at the database layer.",
    techs: ["Supabase", "PostgreSQL", "TypeScript", "Stripe"],
    projectLink: "#work",
    projectName: "Orbit",
  },
  {
    id: "ai-pipelines",
    label: "Applied AI & Automation",
    icon: Zap,
    metric: "Whisper & Gemini",
    metricLabel: "Production speech & semantic search",
    description: "Locally testable AI pipelines with context boundaries, streaming responses, and reliable email notifications.",
    techs: ["Whisper AI", "Gemini AI", "Resend", "Next.js"],
    projectLink: "#work",
    projectName: "commit_",
  },
];

export function EngineeringRadarStrip() {
  const [activeId, setActiveId] = useState<string>("backend");
  const activePillar = PILLARS.find((p) => p.id === activeId) || PILLARS[0];

  return (
    <section className="engineering-radar-strip" aria-label="Interactive engineering capability matrix">
      <div className="section-shell">
        <div className="radar-header">
          <div className="radar-title-group">
            <span className="radar-badge">
              <span className="radar-pulse" /> Live System Radar
            </span>
            <h3>Core Engineering Pillars & System Matrix</h3>
          </div>
          <div className="radar-tabs" role="tablist" aria-label="Select engineering domain">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const isActive = pillar.id === activeId;
              return (
                <button
                  key={pillar.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`radar-tab ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveId(pillar.id)}
                >
                  <Icon size={14} />
                  <span>{pillar.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="radar-content-card">
          <div className="radar-main">
            <div className="radar-metric-badge">
              <strong>{activePillar.metric}</strong>
              <span>{activePillar.metricLabel}</span>
            </div>
            <div className="radar-desc">
              <h4>{activePillar.label}</h4>
              <p>{activePillar.description}</p>
            </div>
          </div>

          <div className="radar-stack-group">
            <span className="radar-stack-label">Core Stack Icons & Tools</span>
            <div className="radar-stack-list">
              {activePillar.techs.map((tech) => (
                <span key={tech} className="radar-tech-pill">
                  <TechIcon name={tech} size={14} />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>

          <a href={activePillar.projectLink} className="radar-action-link">
            <span>Inspect in {activePillar.projectName}</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
