"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Globe,
  Network,
  Users,
  Zap,
  CreditCard,
  Smartphone,
  Languages,
  ArrowUpRight,
  Home,
  Share2,
  BarChart2,
  Settings,
  Search,
  Phone,
  Coffee,
  Mail,
  Shield,
  Brain,
  List,
  Lock,
  Building2,
  Bell,
  Mic,
  FileSpreadsheet,
  TrendingUp,
  ClipboardList,
  BookOpen,
  GitCommit,
  Flame,
  Award,
  Map,
  Target,
  Clock,
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

// ── Orbit constants ────────────────────────────────────────────────────────────
const ORBIT_PURPLE      = "#7c3aed";
const ORBIT_PURPLE_DIM  = "rgba(124,58,237,0.22)";
const ORBIT_PURPLE_GLOW = "rgba(124,58,237,0.55)";

const ORBIT_FEATURES = [
  { Icon: Users,      label: "People Dashboard",       detail: "Track & organise your professional network" },
  { Icon: Network,    label: "Relationship Graph",      detail: "D3 force-directed visualisation" },
  { Icon: Zap,        label: "Gemini AI Search",        detail: "Semantic queries & smart contact insights" },
  { Icon: Brain,      label: "AI Contact Intelligence", detail: "Strength scoring & smart outreach nudges" },
  { Icon: Shield,     label: "OAuth SSO",               detail: "Google & LinkedIn one-click sign-in" },
  { Icon: CreditCard, label: "Stripe Billing",          detail: "Free + Pro subscription tiers" },
  { Icon: Smartphone, label: "PWA · Offline",           detail: "Installable on iOS & Android" },
  { Icon: Languages,  label: "RTL i18n",                detail: "Full English + Arabic support" },
];

const ORBIT_TECH = [
  "Next.js 16", "TypeScript", "Supabase", "Gemini AI",
  "OAuth 2.0", "Stripe", "TanStack Query", "Tailwind v4", "PWA",
];

// ── NexFlow constants ──────────────────────────────────────────────────────────
const NF_CYAN    = "#06b6d4";
const NF_DIM     = "rgba(6,182,212,0.22)";

const NF_FEATURES = [
  { Icon: ClipboardList,  label: "REQ Code Engine",        detail: "Atomic sequence locks — conflict-free under concurrent writes" },
  { Icon: Lock,           label: "Field-Level RBAC",       detail: "Marketing fields stripped server-side — never sent to Sales clients" },
  { Icon: Building2,      label: "Multi-Entity Platform",  detail: "HSL · MGL · MKL · HCL — isolated data, shared infrastructure" },
  { Icon: Bell,           label: "WhatsApp Handoff",       detail: "Configurable lead cards sent instantly to BU coordinators" },
  { Icon: Mic,            label: "Voice Transcription",    detail: "Egyptian Arabic dictation via Whisper AI, mixed Arabic/EN" },
  { Icon: BarChart2,      label: "Live Analytics",         detail: "KPIs, pipeline stages, source ROI, sector heatmap in real time" },
  { Icon: FileSpreadsheet,label: "Excel Migration",        detail: "Bulk import with column mapping, conflict detection & validation" },
  { Icon: TrendingUp,     label: "Full Audit Trail",       detail: "Every field change logged: user, timestamp, before → after" },
];

const NF_TECH = [
  "Next.js 14", "TypeScript", "PostgreSQL", "Prisma",
  "NextAuth v5", "Recharts", "Shadcn/ui", "Whisper AI", "PWA", "xlsx",
];

// ── Commit constants ───────────────────────────────────────────────────────────
const COMMIT_GREEN = "#10b981";
const COMMIT_DIM   = "rgba(16,185,129,0.22)";
const COMMIT_GLOW  = "rgba(16,185,129,0.55)";

const COMMIT_FEATURES = [
  { Icon: GitCommit, label: "Study Sessions",    detail: "Timer-style quick-log — every session is a commit; the keystone of the habit loop" },
  { Icon: Flame,     label: "Streak + Grid",     detail: "Daily activity lights up emerald; GitHub-style contribution heatmap" },
  { Icon: Map,       label: "Roadmap View",      detail: "Glowing transit line: completed stations lit, current one pulsing, real ETA to finish" },
  { Icon: BookOpen,  label: "Curriculum Engine", detail: "Programs → Semesters → Courses → Checkpoints — your degree, your rules" },
  { Icon: Target,    label: "Pacing Nudges",     detail: "\"Aim for ~0.8h/day\" — always encouraging, never \"you're behind\"" },
  { Icon: Award,     label: "XP & Badges",       detail: "Gamified milestones: Merged to Main, On a Roll, Early Bird, and more" },
  { Icon: Bell,      label: "Email Reminders",   detail: "Daily cron digest via Resend; graceful console fallback in dev" },
  { Icon: Clock,     label: "ETA Engine",        detail: "Smart deadline tracking with gentle reschedule — keeps momentum, never guilt" },
];

const COMMIT_TECH = [
  "Next.js 16", "React 19", "TypeScript", "Prisma 7",
  "Auth.js v5", "Tailwind v4", "Framer Motion", "SQLite → Postgres", "Resend",
];

// ── Orbit logo icon ────────────────────────────────────────────────────────────
function OrbitLogo() {
  return (
    <div
      style={{
        width: 52, height: 52, borderRadius: "13px",
        background: ORBIT_PURPLE,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 0 28px ${ORBIT_PURPLE_GLOW}, 0 4px 16px rgba(0,0,0,0.45)`,
        marginBottom: "0.85rem",
        flexShrink: 0,
      }}
    >
      <svg width="26" height="26" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="2.2" fill="white" />
        <circle cx="7" cy="7" r="4.5" stroke="white" strokeWidth="0.9" fill="none" opacity="0.65" />
        <circle cx="7" cy="7" r="6.4" stroke="white" strokeWidth="0.55" fill="none" opacity="0.35" />
      </svg>
    </div>
  );
}

// ── NexFlow logo icon ──────────────────────────────────────────────────────────
function NexFlowLogo() {
  return (
    <div
      style={{
        width: 52, height: 52, borderRadius: "13px",
        background: NF_CYAN,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 0 28px rgba(6,182,212,0.55), 0 4px 16px rgba(0,0,0,0.45)`,
        marginBottom: "0.85rem",
        flexShrink: 0,
      }}
    >
      <svg
        width="26" height="26" viewBox="0 0 24 24"
        fill="none" stroke="white" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    </div>
  );
}

// ── Commit logo icon ───────────────────────────────────────────────────────────
function CommitLogo() {
  return (
    <div
      style={{
        width: 52, height: 52, borderRadius: "13px",
        background: COMMIT_GREEN,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 0 28px ${COMMIT_GLOW}, 0 4px 16px rgba(0,0,0,0.45)`,
        marginBottom: "0.85rem",
        flexShrink: 0,
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="2" x2="12" y2="7.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
        <circle cx="12" cy="12" r="4" fill="white" />
        <line x1="12" y1="16.5" x2="12" y2="22" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
      </svg>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ORBIT MOCKUP COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function BrowserChrome({ activeTab, onTab }: { activeTab: number; onTab: (i: number) => void }) {
  const tabs = ["People", "Graph", "Timeline"];
  return (
    <div style={{ flexShrink: 0 }}>
      <div
        style={{
          background: "#150e2b",
          borderBottom: `1px solid ${ORBIT_PURPLE_DIM}`,
          padding: "0.45rem 0.75rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, opacity: 0.85 }} />
          ))}
        </div>
        <div
          style={{
            flex: 1, background: "#1c1038", border: `1px solid ${ORBIT_PURPLE_DIM}`,
            borderRadius: "4px", padding: "3px 8px", fontSize: "0.58rem",
            color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center",
            gap: "5px", fontFamily: "var(--font-jet), monospace",
          }}
        >
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#28c840", flexShrink: 0 }} />
          https://byorbit.io
        </div>
      </div>
      <div style={{ display: "flex", background: "#110a22", borderBottom: `1px solid ${ORBIT_PURPLE_DIM}` }}>
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => onTab(i)}
            style={{
              flex: 1, background: "none", border: "none",
              borderBottom: `2px solid ${i === activeTab ? ORBIT_PURPLE : "transparent"}`,
              padding: "0.38rem 0", fontSize: "0.58rem",
              fontFamily: "var(--font-jet), monospace",
              fontWeight: i === activeTab ? 700 : 400,
              letterSpacing: "0.05em",
              color: i === activeTab ? "#a78bfa" : "rgba(255,255,255,0.3)",
              cursor: "pointer", transition: "color 0.18s, border-color 0.18s",
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function Sidebar({ activeNav }: { activeNav: number }) {
  const navItems = [Home, Users, Share2, BarChart2, Settings];
  return (
    <div
      style={{
        width: "40px", background: "#110a22",
        borderRight: `1px solid ${ORBIT_PURPLE_DIM}`,
        display: "flex", flexDirection: "column",
        alignItems: "center", padding: "0.55rem 0", gap: "0.3rem", flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "24px", height: "24px", borderRadius: "5px",
          background: ORBIT_PURPLE, display: "flex", alignItems: "center",
          justifyContent: "center", marginBottom: "0.4rem",
          boxShadow: `0 0 8px ${ORBIT_PURPLE_GLOW}`, flexShrink: 0,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="2" fill="white" />
          <circle cx="7" cy="7" r="4.5" stroke="white" strokeWidth="0.8" fill="none" opacity="0.6" />
          <circle cx="7" cy="7" r="6.5" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
        </svg>
      </div>
      {navItems.map((Icon, i) => (
        <div
          key={i}
          style={{
            width: "28px", height: "28px", borderRadius: "5px",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: i === activeNav ? ORBIT_PURPLE_DIM : "transparent",
            color: i === activeNav ? "#a78bfa" : "rgba(255,255,255,0.2)",
            flexShrink: 0,
          }}
        >
          <Icon size={11} />
        </div>
      ))}
    </div>
  );
}

function PeopleMockup() {
  const people = [
    { name: "Sarah Chen",    role: "VP Eng · Google",   str: 88, color: ORBIT_PURPLE },
    { name: "Marcus Reid",   role: "Founder · YC W24",  str: 64, color: "#0891b2" },
    { name: "Layla Al-Amin", role: "CTO · Careem",      str: 93, color: "#059669" },
  ];
  const filters = ["All", "Colleagues", "Mentors", "Clients"];

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <Sidebar activeNav={1} />
      <div style={{ flex: 1, padding: "0.6rem", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#180938", border: `1px solid ${ORBIT_PURPLE_DIM}`, borderRadius: "4px", padding: "0.3rem 0.5rem", marginBottom: "0.4rem", flexShrink: 0 }}>
          <Search size={9} style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
          <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-jet), monospace" }}>Search connections...</span>
        </div>
        <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.45rem", flexShrink: 0 }}>
          {filters.map((f, i) => (
            <div
              key={f}
              style={{
                padding: "1px 6px", borderRadius: "3px", fontSize: "0.48rem",
                fontFamily: "var(--font-jet), monospace",
                background: i === 0 ? ORBIT_PURPLE : "rgba(124,58,237,0.1)",
                color: i === 0 ? "white" : "rgba(255,255,255,0.35)",
                border: i === 0 ? "none" : `1px solid ${ORBIT_PURPLE_DIM}`,
              }}
            >
              {f}
            </div>
          ))}
        </div>
        {people.map((p) => (
          <div
            key={p.name}
            style={{
              background: "#180938", border: `1px solid rgba(124,58,237,0.12)`,
              borderRadius: "5px", padding: "0.4rem 0.5rem", marginBottom: "0.3rem",
              display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0,
            }}
          >
            <div style={{ width: "21px", height: "21px", borderRadius: "50%", background: p.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", fontWeight: 700, color: "white" }}>
              {p.name.charAt(0)}
            </div>
            <div style={{ flex: 1, overflow: "hidden", minWidth: 0 }}>
              <div style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "0.58rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.5rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.role}</div>
            </div>
            <div style={{ width: "28px", flexShrink: 0 }}>
              <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "2px", height: "3px", overflow: "hidden" }}>
                <div style={{ width: `${p.str}%`, background: p.color, height: "100%" }} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.43rem", textAlign: "right", marginTop: "1px" }}>{p.str}%</div>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: "0.3rem", marginTop: "auto", paddingTop: "0.35rem", flexShrink: 0 }}>
          {[{ v: "247", l: "People" }, { v: "18", l: "Active" }, { v: "4", l: "Clusters" }].map((s) => (
            <div key={s.l} style={{ flex: 1, background: "#180938", border: `1px solid rgba(124,58,237,0.12)`, borderRadius: "4px", padding: "0.22rem 0.28rem", textAlign: "center" }}>
              <div style={{ color: "#a78bfa", fontWeight: 700, fontSize: "0.6rem" }}>{s.v}</div>
              <div style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.42rem" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GraphMockup() {
  const nodes = [
    { id: "you", x: 200, y: 118, r: 9,  color: ORBIT_PURPLE, label: "You" },
    { id: "c1",  x: 82,  y: 86,  r: 6,  color: "#9333ea",    label: "Sarah" },
    { id: "c2",  x: 52,  y: 48,  r: 4,  color: "#9333ea",    label: null },
    { id: "c3",  x: 62,  y: 150, r: 7,  color: "#9333ea",    label: "Layla" },
    { id: "c4",  x: 96,  y: 196, r: 4,  color: "#9333ea",    label: null },
    { id: "m1",  x: 315, y: 70,  r: 6,  color: "#22d3ee",    label: "Alex" },
    { id: "m2",  x: 360, y: 38,  r: 4,  color: "#22d3ee",    label: null },
    { id: "m3",  x: 332, y: 128, r: 5,  color: "#22d3ee",    label: null },
    { id: "cl1", x: 266, y: 202, r: 6,  color: "#34d399",    label: "Marcus" },
    { id: "cl2", x: 320, y: 222, r: 4,  color: "#34d399",    label: null },
    { id: "cl3", x: 248, y: 230, r: 3,  color: "#34d399",    label: null },
  ];
  const edges = [
    ["you","c1"],["you","c3"],["c1","c2"],["c1","c3"],["c3","c4"],
    ["you","m1"],["you","m3"],["m1","m2"],["m1","m3"],
    ["you","cl1"],["cl1","cl2"],["cl1","cl3"],
  ];
  const byId = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <Sidebar activeNav={2} />
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "0.5rem", right: "0.55rem", background: "rgba(124,58,237,0.15)", border: `1px solid ${ORBIT_PURPLE_DIM}`, borderRadius: "4px", padding: "2px 7px", fontSize: "0.48rem", fontFamily: "var(--font-jet), monospace", color: "#a78bfa", zIndex: 2 }}>
          11 nodes · 3 clusters
        </div>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="orbitGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {edges.map(([a, b], i) => {
            const na = byId(a); const nb = byId(b);
            return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />;
          })}
          {nodes.map((n) => (
            <g key={n.id} filter="url(#orbitGlow)">
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity={0.88} />
              {n.label && <text x={n.x} y={n.y + n.r + 4.5} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="4" fontFamily="monospace">{n.label}</text>}
            </g>
          ))}
        </svg>
        <div style={{ position: "absolute", bottom: "0.5rem", left: "0.5rem", display: "flex", gap: "0.6rem", alignItems: "center" }}>
          {[{ color: "#9333ea", label: "Colleagues" }, { color: "#22d3ee", label: "Mentors" }, { color: "#34d399", label: "Clients" }].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: l.color, flexShrink: 0 }} />
              <span style={{ fontSize: "0.44rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.35)" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineMockup() {
  const interactions = [
    { Icon: Phone,  label: "Phone call",    date: "Jun 2",  snippet: "Discussed engineering org structure..." },
    { Icon: Coffee, label: "Coffee meeting",date: "May 28", snippet: "Met at StartupWeek Dubai — great chemistry" },
    { Icon: Mail,   label: "Email",         date: "May 15", snippet: "Follow-up on the ML infra discussion..." },
  ];
  const tags = ["Colleague", "AI", "Bay Area"];

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <Sidebar activeNav={1} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "0.55rem 0.6rem", borderBottom: `1px solid rgba(124,58,237,0.15)`, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.3rem" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: ORBIT_PURPLE, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 700, color: "white", boxShadow: `0 0 8px ${ORBIT_PURPLE_GLOW}` }}>S</div>
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: "0.65rem" }}>Sarah Chen</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.5rem" }}>VP Engineering · Google</div>
            </div>
            <div style={{ display: "flex", gap: "2px", flexShrink: 0 }}>
              {[1,2,3,4,5].map((i) => <div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: i <= 4 ? "#a78bfa" : "rgba(124,58,237,0.2)" }} />)}
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            {tags.map((tag) => (
              <div key={tag} style={{ padding: "1px 6px", borderRadius: "3px", background: "rgba(124,58,237,0.15)", border: `1px solid ${ORBIT_PURPLE_DIM}`, fontSize: "0.46rem", fontFamily: "var(--font-jet), monospace", color: "#a78bfa" }}>{tag}</div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, padding: "0.55rem 0.6rem", overflow: "hidden" }}>
          <div style={{ fontSize: "0.5rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Interaction History</div>
          {interactions.map(({ Icon, label, date, snippet }, i) => (
            <div key={i} style={{ display: "flex", gap: "0.4rem", alignItems: "flex-start", paddingBottom: "0.35rem", marginBottom: "0.3rem", borderBottom: i < interactions.length - 1 ? `1px solid rgba(124,58,237,0.08)` : "none" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "4px", background: "rgba(124,58,237,0.14)", border: `1px solid ${ORBIT_PURPLE_DIM}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", flexShrink: 0 }}>
                <Icon size={9} />
              </div>
              <div style={{ flex: 1, overflow: "hidden", minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1px" }}>
                  <span style={{ fontSize: "0.58rem", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{label}</span>
                  <span style={{ fontSize: "0.48rem", color: "rgba(255,255,255,0.25)", flexShrink: 0, marginLeft: "0.3rem" }}>{date}</span>
                </div>
                <div style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.32)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{snippet}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "0.4rem 0.6rem", borderTop: `1px solid rgba(124,58,237,0.15)`, background: "#110a22", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <span style={{ fontSize: "0.5rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.35)" }}>
            Next check-in: <span style={{ color: "#a78bfa" }}>in 12 days</span>
          </span>
          <div style={{ background: "rgba(124,58,237,0.2)", border: `1px solid ${ORBIT_PURPLE_DIM}`, color: "#a78bfa", fontSize: "0.48rem", fontFamily: "var(--font-jet), monospace", padding: "2px 7px", borderRadius: "3px" }}>
            Set reminder
          </div>
        </div>
      </div>
    </div>
  );
}

function OrbitMockupPanel() {
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const TAB_COUNT = 3;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setTab((t) => (t + 1) % TAB_COUNT), 3400);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Interactive hint row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 0.15rem" }}>
        <span style={{ fontFamily: "var(--font-jet), monospace", fontSize: "0.56rem", color: "rgba(167,139,250,0.55)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          // interactive demo · click tabs to explore
        </span>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          {Array.from({ length: TAB_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setTab(i); setPaused(true); }}
              style={{
                width: i === tab ? "18px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === tab ? ORBIT_PURPLE : "rgba(124,58,237,0.22)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.35s ease, background 0.25s ease",
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          borderRadius: "10px", overflow: "hidden",
          border: `1px solid rgba(124,58,237,0.25)`,
          boxShadow: paused
            ? "0 0 55px rgba(124,58,237,0.22), 0 8px 40px rgba(0,0,0,0.6)"
            : "0 0 40px rgba(124,58,237,0.14), 0 8px 36px rgba(0,0,0,0.55)",
          background: "#0c0818", display: "flex", flexDirection: "column",
          minHeight: "480px", fontFamily: "var(--font-jet), monospace", position: "relative",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <BrowserChrome activeTab={tab} onTab={(i) => { setTab(i); setPaused(true); }} />
        {tab === 0 && <PeopleMockup />}
        {tab === 1 && <GraphMockup />}
        {tab === 2 && <TimelineMockup />}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// NEXFLOW MOCKUP COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function NexFlowBrowserChrome({ activeTab, onTab }: { activeTab: number; onTab: (i: number) => void }) {
  const tabs = ["Pipeline", "Analytics", "Permissions"];
  return (
    <div style={{ flexShrink: 0 }}>
      <div style={{ background: "#05111d", borderBottom: `1px solid ${NF_DIM}`, padding: "0.45rem 0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, opacity: 0.85 }} />
          ))}
        </div>
        <div style={{ flex: 1, background: "#081828", border: `1px solid ${NF_DIM}`, borderRadius: "4px", padding: "3px 8px", fontSize: "0.58rem", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: "5px", fontFamily: "var(--font-jet), monospace" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#28c840", flexShrink: 0 }} />
          https://nexflow-os.vercel.app
        </div>
      </div>
      <div style={{ display: "flex", background: "#040e1a", borderBottom: `1px solid ${NF_DIM}` }}>
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => onTab(i)}
            style={{
              flex: 1, background: "none", border: "none",
              borderBottom: `2px solid ${i === activeTab ? NF_CYAN : "transparent"}`,
              padding: "0.38rem 0", fontSize: "0.58rem",
              fontFamily: "var(--font-jet), monospace",
              fontWeight: i === activeTab ? 700 : 400,
              letterSpacing: "0.05em",
              color: i === activeTab ? NF_CYAN : "rgba(255,255,255,0.3)",
              cursor: "pointer", transition: "color 0.18s, border-color 0.18s",
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function NexFlowSidebar({ activeNav }: { activeNav: number }) {
  const navItems = [Home, List, BarChart2, Shield, Settings];
  return (
    <div style={{ width: "40px", background: "#040e1a", borderRight: `1px solid ${NF_DIM}`, display: "flex", flexDirection: "column", alignItems: "center", padding: "0.55rem 0", gap: "0.3rem", flexShrink: 0 }}>
      <div style={{ width: "24px", height: "24px", borderRadius: "5px", background: NF_CYAN, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.4rem", boxShadow: "0 0 8px rgba(6,182,212,0.55)", flexShrink: 0 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>
      {navItems.map((Icon, i) => (
        <div key={i} style={{ width: "28px", height: "28px", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", background: i === activeNav ? NF_DIM : "transparent", color: i === activeNav ? NF_CYAN : "rgba(255,255,255,0.2)", flexShrink: 0 }}>
          <Icon size={11} />
        </div>
      ))}
    </div>
  );
}

function PipelineTabMockup() {
  const leads = [
    { req: "HSL506240001", company: "Acme Industrial",  entity: "HSL", ec: "#06b6d4", status: "With Sales", sc: "#f59e0b", sb: "rgba(245,158,11,0.12)" },
    { req: "MGL506240002", company: "Cairo Steel Co.",  entity: "MGL", ec: "#818cf8", status: "Completed",  sc: "#22c55e", sb: "rgba(34,197,94,0.12)"  },
    { req: "MKL506240003", company: "Delta Machinery",  entity: "MKL", ec: "#f59e0b", status: "Submitted",  sc: "#60a5fa", sb: "rgba(96,165,250,0.12)" },
    { req: "HCL506240004", company: "Nile Trading",     entity: "HCL", ec: "#22c55e", status: "Draft",      sc: "rgba(255,255,255,0.3)", sb: "rgba(255,255,255,0.05)" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <NexFlowSidebar activeNav={1} />
      <div style={{ flex: 1, padding: "0.55rem", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#081828", border: `1px solid ${NF_DIM}`, borderRadius: "4px", padding: "0.3rem 0.5rem", marginBottom: "0.45rem", flexShrink: 0 }}>
          <Search size={9} style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
          <span style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-jet), monospace" }}>Search by REQ code or company...</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2.2fr 2.5fr 0.8fr 1.6fr", gap: "0.3rem", padding: "0 0.25rem", marginBottom: "0.25rem", flexShrink: 0 }}>
          {["REQ Code", "Company", "Entity", "Status"].map((h) => (
            <span key={h} style={{ fontSize: "0.44rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>
        {leads.map((l) => (
          <div key={l.req} style={{ display: "grid", gridTemplateColumns: "2.2fr 2.5fr 0.8fr 1.6fr", gap: "0.3rem", padding: "0.28rem 0.25rem", marginBottom: "0.18rem", background: "#081828", borderRadius: "4px", border: `1px solid rgba(6,182,212,0.07)`, alignItems: "center", flexShrink: 0 }}>
            <span style={{ fontSize: "0.49rem", fontFamily: "var(--font-jet), monospace", color: NF_CYAN, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.req}</span>
            <span style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.company}</span>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: l.ec, flexShrink: 0 }} />
              <span style={{ fontSize: "0.46rem", fontFamily: "var(--font-jet), monospace", color: l.ec }}>{l.entity}</span>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", padding: "1px 5px", borderRadius: "3px", background: l.sb, border: `1px solid ${l.sc}40` }}>
              <span style={{ fontSize: "0.43rem", fontFamily: "var(--font-jet), monospace", color: l.sc, whiteSpace: "nowrap" }}>{l.status}</span>
            </div>
          </div>
        ))}
        <div style={{ marginTop: "auto", display: "flex", gap: "0.3rem", paddingTop: "0.35rem", flexShrink: 0 }}>
          {[{ v: "4 Entities", c: NF_CYAN }, { v: "247 Leads", c: "rgba(255,255,255,0.45)" }, { v: "38% Conv.", c: "#22c55e" }].map((s) => (
            <div key={s.v} style={{ flex: 1, background: "#081828", border: `1px solid rgba(6,182,212,0.1)`, borderRadius: "3px", padding: "0.2rem 0.3rem", textAlign: "center" }}>
              <span style={{ fontSize: "0.45rem", fontFamily: "var(--font-jet), monospace", color: s.c }}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsTabMockup() {
  const kpis = [
    { label: "Total",      value: "247",  color: NF_CYAN    },
    { label: "Conversion", value: "38%",  color: "#22c55e"  },
    { label: "Pipeline",   value: "89",   color: "#f59e0b"  },
    { label: "Avg Resp.",  value: "4.2h", color: "#818cf8"  },
  ];
  const barData   = [0.55, 0.78, 0.62, 0.91, 0.7, 0.85, 0.95];
  const barColors = [NF_CYAN, "#818cf8", NF_CYAN, "#22c55e", "#f59e0b", NF_CYAN, "#22c55e"];

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <NexFlowSidebar activeNav={2} />
      <div style={{ flex: 1, padding: "0.55rem", overflow: "hidden", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.3rem", flexShrink: 0 }}>
          {kpis.map((k) => (
            <div key={k.label} style={{ background: "#081828", border: `1px solid ${NF_DIM}`, borderRadius: "5px", padding: "0.3rem 0.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: k.color, fontFamily: "var(--font-jet), monospace" }}>{k.value}</div>
              <div style={{ fontSize: "0.4rem", color: "rgba(255,255,255,0.3)", marginTop: "1px" }}>{k.label}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, background: "#081828", border: `1px solid ${NF_DIM}`, borderRadius: "5px", padding: "0.4rem 0.5rem", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem", flexShrink: 0 }}>
            <span style={{ fontSize: "0.46rem", fontFamily: "var(--font-jet), monospace", color: NF_CYAN, letterSpacing: "0.08em", textTransform: "uppercase" }}>Lead Volume · Last 7 Days</span>
            <div style={{ display: "flex", gap: "0.3rem" }}>
              {(["HSL", "MGL", "MKL", "HCL"] as const).map((e, i) => {
                const colors = [NF_CYAN, "#818cf8", "#f59e0b", "#22c55e"];
                return (
                  <div key={e} style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: colors[i] }} />
                    <span style={{ fontSize: "0.4rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.35)" }}>{e}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "0.25rem" }}>
            {barData.map((h, i) => (
              <div key={i} style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end" }}>
                <div style={{ width: "100%", borderRadius: "2px 2px 0 0", height: `${h * 100}%`, background: barColors[i], opacity: 0.75, minHeight: "4px" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: "0.18rem", flexShrink: 0 }}>
            {["M","T","W","T","F","S","S"].map((d, i) => (
              <span key={i} style={{ flex: 1, textAlign: "center", fontSize: "0.38rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.2)" }}>{d}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.25rem", flexShrink: 0 }}>
          {[{ label: "All Entities", active: true }, { label: "HSL" }, { label: "MGL" }, { label: "MKL" }, { label: "HCL" }].map((e) => (
            <div key={e.label} style={{ padding: "2px 6px", borderRadius: "3px", fontSize: "0.44rem", fontFamily: "var(--font-jet), monospace", background: e.active ? NF_CYAN : "rgba(6,182,212,0.08)", color: e.active ? "#05131f" : "rgba(255,255,255,0.35)", border: e.active ? "none" : `1px solid ${NF_DIM}` }}>
              {e.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PermissionsTabMockup() {
  const roles      = ["Marketing", "Sales", "Manager", "Admin"];
  const roleColors = [NF_CYAN, "#818cf8", "#60a5fa", "#f59e0b"];
  const fieldGroups = [
    { name: "MUTUAL",    desc: "Contact & company",  perms: [true,  true,  true, true] },
    { name: "MARKETING", desc: "Source, notes, route", perms: [true,  false, true, true] },
    { name: "SALES",     desc: "Response & status",  perms: [false, true,  true, true] },
  ];

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <NexFlowSidebar activeNav={3} />
      <div style={{ flex: 1, padding: "0.55rem", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "0.4rem", flexShrink: 0 }}>
          <span style={{ fontSize: "0.5rem", fontFamily: "var(--font-jet), monospace", color: NF_CYAN, letterSpacing: "0.08em", textTransform: "uppercase" }}>Field Permissions Matrix</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr repeat(4, 1fr)", gap: "0.22rem", marginBottom: "0.22rem", flexShrink: 0 }}>
          <div />
          {roles.map((r, i) => (
            <div key={r} style={{ textAlign: "center", padding: "0.22rem", background: `${roleColors[i]}18`, border: `1px solid ${roleColors[i]}40`, borderRadius: "3px" }}>
              <span style={{ fontSize: "0.42rem", fontFamily: "var(--font-jet), monospace", color: roleColors[i], fontWeight: 700 }}>{r}</span>
            </div>
          ))}
        </div>
        {fieldGroups.map((fg) => (
          <div key={fg.name} style={{ display: "grid", gridTemplateColumns: "1.8fr repeat(4, 1fr)", gap: "0.22rem", marginBottom: "0.22rem", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0.22rem 0.3rem", background: "#081828", border: `1px solid rgba(255,255,255,0.06)`, borderRadius: "3px" }}>
              <span style={{ fontSize: "0.49rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.8)", fontWeight: 700 }}>{fg.name}</span>
              <span style={{ fontSize: "0.4rem", color: "rgba(255,255,255,0.25)" }}>{fg.desc}</span>
            </div>
            {fg.perms.map((allowed, ri) => (
              <div key={ri} style={{ display: "flex", alignItems: "center", justifyContent: "center", background: allowed ? `${roleColors[ri]}12` : "rgba(239,68,68,0.08)", border: `1px solid ${allowed ? roleColors[ri] + "35" : "rgba(239,68,68,0.2)"}`, borderRadius: "3px", padding: "0.38rem 0" }}>
                <span style={{ fontSize: "0.62rem", color: allowed ? roleColors[ri] : "rgba(239,68,68,0.55)" }}>{allowed ? "✓" : "✗"}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{ marginTop: "auto", padding: "0.3rem 0.4rem", background: "#081828", border: `1px solid ${NF_DIM}`, borderRadius: "3px", flexShrink: 0 }}>
          <span style={{ fontSize: "0.43rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>
            MARKETING fields are stripped at the API layer before reaching the client — not just hidden in CSS.
          </span>
        </div>
      </div>
    </div>
  );
}

function NexFlowMockupPanel() {
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const TAB_COUNT = 3;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setTab((t) => (t + 1) % TAB_COUNT), 3400);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Interactive hint row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 0.15rem" }}>
        <span style={{ fontFamily: "var(--font-jet), monospace", fontSize: "0.56rem", color: `rgba(6,182,212,0.5)`, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          // interactive demo · click tabs to explore
        </span>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          {Array.from({ length: TAB_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setTab(i); setPaused(true); }}
              style={{
                width: i === tab ? "18px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === tab ? NF_CYAN : NF_DIM,
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.35s ease, background 0.25s ease",
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          borderRadius: "10px", overflow: "hidden",
          border: `1px solid rgba(6,182,212,0.25)`,
          boxShadow: paused
            ? "0 0 55px rgba(6,182,212,0.18), 0 8px 40px rgba(0,0,0,0.6)"
            : "0 0 40px rgba(6,182,212,0.1), 0 8px 36px rgba(0,0,0,0.55)",
          background: "#05111d", display: "flex", flexDirection: "column",
          minHeight: "480px", fontFamily: "var(--font-jet), monospace", position: "relative",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <NexFlowBrowserChrome activeTab={tab} onTab={(i) => { setTab(i); setPaused(true); }} />
        {tab === 0 && <PipelineTabMockup />}
        {tab === 1 && <AnalyticsTabMockup />}
        {tab === 2 && <PermissionsTabMockup />}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// COMMIT MOCKUP COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function CommitBrowserChrome({ activeTab, onTab }: { activeTab: number; onTab: (i: number) => void }) {
  const tabs = ["Dashboard", "Roadmap", "Streak"];
  return (
    <div style={{ flexShrink: 0 }}>
      <div style={{ background: "#041a10", borderBottom: `1px solid ${COMMIT_DIM}`, padding: "0.45rem 0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c, opacity: 0.85 }} />
          ))}
        </div>
        <div style={{ flex: 1, background: "#071f11", border: `1px solid ${COMMIT_DIM}`, borderRadius: "4px", padding: "3px 8px", fontSize: "0.58rem", color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: "5px", fontFamily: "var(--font-jet), monospace" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#28c840", flexShrink: 0 }} />
          https://commit.binhakim.dev/
        </div>
      </div>
      <div style={{ display: "flex", background: "#031410", borderBottom: `1px solid ${COMMIT_DIM}` }}>
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => onTab(i)}
            style={{
              flex: 1, background: "none", border: "none",
              borderBottom: `2px solid ${i === activeTab ? COMMIT_GREEN : "transparent"}`,
              padding: "0.38rem 0", fontSize: "0.58rem",
              fontFamily: "var(--font-jet), monospace",
              fontWeight: i === activeTab ? 700 : 400,
              letterSpacing: "0.05em",
              color: i === activeTab ? COMMIT_GREEN : "rgba(255,255,255,0.3)",
              cursor: "pointer", transition: "color 0.18s, border-color 0.18s",
            }}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function CommitSidebar({ activeNav }: { activeNav: number }) {
  const navItems = [Home, BookOpen, Map, BarChart2, Settings];
  return (
    <div style={{ width: "40px", background: "#031410", borderRight: `1px solid ${COMMIT_DIM}`, display: "flex", flexDirection: "column", alignItems: "center", padding: "0.55rem 0", gap: "0.3rem", flexShrink: 0 }}>
      <div style={{ width: "24px", height: "24px", borderRadius: "5px", background: COMMIT_GREEN, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.4rem", boxShadow: `0 0 8px ${COMMIT_GLOW}`, flexShrink: 0 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <line x1="12" y1="3" x2="12" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <circle cx="12" cy="12" r="3.5" fill="white" />
          <line x1="12" y1="16" x2="12" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </svg>
      </div>
      {navItems.map((Icon, i) => (
        <div key={i} style={{ width: "28px", height: "28px", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", background: i === activeNav ? COMMIT_DIM : "transparent", color: i === activeNav ? COMMIT_GREEN : "rgba(255,255,255,0.2)", flexShrink: 0 }}>
          <Icon size={11} />
        </div>
      ))}
    </div>
  );
}

function CommitDashboardMockup() {
  const sessions = [
    { course: "Express.js", duration: "1.2h", daysAgo: "today",  color: COMMIT_GREEN },
    { course: "Node.js Basics", duration: "0.9h", daysAgo: "yesterday", color: "#34d399" },
    { course: "Express.js", duration: "1.5h", daysAgo: "2d ago", color: COMMIT_GREEN },
  ];

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <CommitSidebar activeNav={0} />
      <div style={{ flex: 1, padding: "0.6rem", display: "flex", flexDirection: "column", gap: "0.4rem", overflow: "hidden" }}>
        {/* Next Up card */}
        <div style={{ background: "#071f11", border: `1px solid rgba(16,185,129,0.28)`, borderRadius: "6px", padding: "0.55rem 0.6rem", flexShrink: 0 }}>
          <div style={{ fontSize: "0.44rem", fontFamily: "var(--font-jet), monospace", color: COMMIT_GREEN, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.3rem" }}>▸ Next Up</div>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: "0.25rem" }}>Express.js — REST APIs</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.3rem" }}>
            <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.07)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: "68%", height: "100%", background: COMMIT_GREEN, borderRadius: "2px", boxShadow: `0 0 6px ${COMMIT_GLOW}` }} />
            </div>
            <span style={{ fontSize: "0.44rem", fontFamily: "var(--font-jet), monospace", color: COMMIT_GREEN, flexShrink: 0 }}>68%</span>
          </div>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <span style={{ fontSize: "0.48rem", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-jet), monospace" }}>⏱ aim for ~0.8h/day</span>
            <span style={{ fontSize: "0.48rem", color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-jet), monospace" }}>📅 due in 14 days</span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.3rem", flexShrink: 0 }}>
          {[{ v: "18", l: "Day Streak" }, { v: "47h", l: "Logged" }, { v: "1,240", l: "XP" }].map((s) => (
            <div key={s.l} style={{ background: "#071f11", border: `1px solid rgba(16,185,129,0.12)`, borderRadius: "4px", padding: "0.28rem", textAlign: "center" }}>
              <div style={{ color: COMMIT_GREEN, fontWeight: 700, fontSize: "0.62rem", fontFamily: "var(--font-jet), monospace" }}>{s.v}</div>
              <div style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.4rem" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Recent sessions */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ fontSize: "0.44rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.28rem" }}>Recent Sessions</div>
          {sessions.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.4rem", background: "#071f11", borderRadius: "4px", marginBottom: "0.22rem", border: `1px solid rgba(16,185,129,0.07)`, flexShrink: 0 }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.color, flexShrink: 0, boxShadow: `0 0 4px ${s.color}` }} />
              <span style={{ flex: 1, fontSize: "0.52rem", color: "rgba(255,255,255,0.75)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.course}</span>
              <span style={{ fontSize: "0.5rem", fontFamily: "var(--font-jet), monospace", color: COMMIT_GREEN, flexShrink: 0 }}>{s.duration}</span>
              <span style={{ fontSize: "0.44rem", color: "rgba(255,255,255,0.22)", flexShrink: 0 }}>{s.daysAgo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommitRoadmapMockup() {
  const stations = [
    { name: "Web Fundamentals",    sub: "HTML · CSS · JS",           done: true,    current: false },
    { name: "Node.js & npm",       sub: "Runtime · Modules · npm",   done: true,    current: false },
    { name: "Express.js APIs",     sub: "REST · Auth · Middleware",   done: false,   current: true  },
    { name: "Databases & Prisma",  sub: "SQL · ORM · Migrations",    done: false,   current: false },
    { name: "Fullstack Project",   sub: "Capstone · Deploy",         done: false,   current: false },
  ];

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <CommitSidebar activeNav={2} />
      <div style={{ flex: 1, padding: "0.6rem 0.7rem", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ fontSize: "0.44rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem", flexShrink: 0 }}>Backend Engineering · Semester 1</div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, overflow: "hidden" }}>
          {stations.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", flexShrink: 0 }}>
              {/* Track column */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "18px", flexShrink: 0 }}>
                {/* Node */}
                <div style={{
                  width: s.current ? "14px" : "10px",
                  height: s.current ? "14px" : "10px",
                  borderRadius: "50%",
                  background: s.done ? COMMIT_GREEN : s.current ? COMMIT_GREEN : "rgba(255,255,255,0.1)",
                  border: s.current ? `2px solid ${COMMIT_GREEN}` : s.done ? "none" : "1.5px solid rgba(255,255,255,0.18)",
                  boxShadow: s.current ? `0 0 10px ${COMMIT_GLOW}, 0 0 20px ${COMMIT_DIM}` : s.done ? `0 0 5px rgba(16,185,129,0.4)` : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: "0.2rem",
                  transition: "all 0.3s ease",
                }}>
                  {s.done && <svg width="6" height="6" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                {/* Connector line */}
                {i < stations.length - 1 && (
                  <div style={{ width: "2px", height: "28px", background: s.done ? `linear-gradient(${COMMIT_GREEN}, ${i + 1 < stations.length && stations[i+1].done ? COMMIT_GREEN : COMMIT_DIM})` : "rgba(255,255,255,0.08)", borderRadius: "1px" }} />
                )}
              </div>
              {/* Station info */}
              <div style={{ paddingBottom: i < stations.length - 1 ? "0.6rem" : 0, paddingTop: "0.1rem" }}>
                <div style={{ fontSize: "0.58rem", fontWeight: s.current ? 700 : 500, color: s.done ? "rgba(255,255,255,0.8)" : s.current ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.28)", lineHeight: 1.2 }}>{s.name}</div>
                <div style={{ fontSize: "0.44rem", color: s.current ? "rgba(16,185,129,0.7)" : "rgba(255,255,255,0.2)", fontFamily: "var(--font-jet), monospace", marginTop: "1px" }}>{s.current ? "⏱ ETA: Jun 18 · in progress" : s.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", padding: "0.3rem 0.4rem", background: "#071f11", border: `1px solid ${COMMIT_DIM}`, borderRadius: "4px", flexShrink: 0 }}>
          <span style={{ fontSize: "0.44rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.3)" }}>
            Program ETA: <span style={{ color: COMMIT_GREEN }}>Sep 4, 2026</span> · at current pace
          </span>
        </div>
      </div>
    </div>
  );
}

function CommitStreakMockup() {
  const grid = [
    [0,1,1,0,1,2,2,1,0,1,1,2],
    [1,0,1,1,1,1,2,0,1,2,1,1],
    [1,1,0,1,2,1,1,1,1,1,2,1],
    [0,1,1,1,1,2,0,2,1,1,1,2],
    [1,1,2,0,1,1,1,1,2,0,1,1],
    [1,0,1,1,1,2,1,1,1,1,2,2],
    [0,1,1,2,1,1,1,2,1,1,1,1],
  ];
  const cellColor = (v: number) => v === 0 ? "rgba(255,255,255,0.05)" : v === 1 ? "rgba(16,185,129,0.35)" : "rgba(16,185,129,0.75)";

  const badges = [
    { label: "Merged to Main", color: COMMIT_GREEN },
    { label: "On a Roll", color: "#f59e0b" },
    { label: "Early Bird", color: "#818cf8" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
      <CommitSidebar activeNav={3} />
      <div style={{ flex: 1, padding: "0.6rem", display: "flex", flexDirection: "column", gap: "0.45rem", overflow: "hidden" }}>
        {/* Streak header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          <div style={{ fontSize: "0.85rem" }}>🔥</div>
          <div>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>18-day streak</div>
            <div style={{ fontSize: "0.44rem", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-jet), monospace" }}>Last session: today · 1.2h</div>
          </div>
          <div style={{ marginLeft: "auto", padding: "2px 8px", background: "rgba(16,185,129,0.12)", border: `1px solid ${COMMIT_DIM}`, borderRadius: "4px", fontSize: "0.46rem", fontFamily: "var(--font-jet), monospace", color: COMMIT_GREEN }}>Lv. 4</div>
        </div>

        {/* Contribution grid */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: "0.4rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.28rem" }}>Activity · Last 12 weeks</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5px" }}>
            {grid.map((row, ri) => (
              <div key={ri} style={{ display: "flex", gap: "2.5px" }}>
                {row.map((v, ci) => (
                  <div key={ci} style={{ width: "9px", height: "9px", borderRadius: "2px", background: cellColor(v), flexShrink: 0 }} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* XP bar */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
            <span style={{ fontSize: "0.44rem", fontFamily: "var(--font-jet), monospace", color: COMMIT_GREEN, letterSpacing: "0.08em" }}>XP PROGRESS</span>
            <span style={{ fontSize: "0.44rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.3)" }}>1,240 / 1,500</span>
          </div>
          <div style={{ height: "5px", background: "rgba(255,255,255,0.07)", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: "83%", height: "100%", background: `linear-gradient(90deg, ${COMMIT_GREEN}, #34d399)`, borderRadius: "3px", boxShadow: `0 0 8px ${COMMIT_GLOW}` }} />
          </div>
        </div>

        {/* Badges */}
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: "0.4rem", fontFamily: "var(--font-jet), monospace", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Badges</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
            {badges.map((b) => (
              <div key={b.label} style={{ padding: "2px 8px", borderRadius: "3px", fontSize: "0.46rem", fontFamily: "var(--font-jet), monospace", background: `${b.color}14`, border: `1px solid ${b.color}40`, color: b.color }}>{b.label}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommitMockupPanel() {
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const TAB_COUNT = 3;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setTab((t) => (t + 1) % TAB_COUNT), 3400);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 0.15rem" }}>
        <span style={{ fontFamily: "var(--font-jet), monospace", fontSize: "0.56rem", color: `rgba(16,185,129,0.5)`, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          // interactive demo · click tabs to explore
        </span>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          {Array.from({ length: TAB_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setTab(i); setPaused(true); }}
              style={{
                width: i === tab ? "18px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === tab ? COMMIT_GREEN : COMMIT_DIM,
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.35s ease, background 0.25s ease",
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          borderRadius: "10px", overflow: "hidden",
          border: `1px solid rgba(16,185,129,0.25)`,
          boxShadow: paused
            ? "0 0 55px rgba(16,185,129,0.18), 0 8px 40px rgba(0,0,0,0.6)"
            : "0 0 40px rgba(16,185,129,0.1), 0 8px 36px rgba(0,0,0,0.55)",
          background: "#031410", display: "flex", flexDirection: "column",
          minHeight: "480px", fontFamily: "var(--font-jet), monospace", position: "relative",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <CommitBrowserChrome activeTab={tab} onTab={(i) => { setTab(i); setPaused(true); }} />
        {tab === 0 && <CommitDashboardMockup />}
        {tab === 1 && <CommitRoadmapMockup />}
        {tab === 2 && <CommitStreakMockup />}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN SECTION
// ══════════════════════════════════════════════════════════════════════════════

export default function LiveProjects() {
  const ref        = useRef(null);
  const inView     = useInView(ref, { once: true, margin: "-60px" });
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
        <div ref={ref}>

          {/* ── Section header ── */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ marginBottom: "3rem" }}
          >
            <p className="section-header">// 03. Live</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "0.6rem" }}>
              Shipped &amp; Deployed
            </h2>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", maxWidth: "44rem", lineHeight: 1.7 }}>
              Not prototypes. Not toy demos. Live, full-stack products running on real
              infrastructure with auth, billing, persistence, and production deployments.
            </p>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════════
              ORBIT CARD
          ══════════════════════════════════════════════════════════════════ */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
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
                    href="https://byorbit.io" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-jet), monospace", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--bg-base)", background: "var(--cyan)", padding: "0.65rem 1.4rem", borderRadius: "6px", textDecoration: "none", boxShadow: "0 0 22px rgba(0,217,255,0.38)", transition: "background 0.2s, box-shadow 0.2s, transform 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#33e1ff"; el.style.boxShadow = "0 0 36px rgba(0,217,255,0.58)"; el.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "var(--cyan)"; el.style.boxShadow = "0 0 22px rgba(0,217,255,0.38)"; el.style.transform = "translateY(0)"; }}
                  >
                    <Globe size={14} /> Visit App <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://github.com/ws0x/orbit" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-jet), monospace", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", background: "transparent", border: "1px solid rgba(0,217,255,0.25)", padding: "0.65rem 1.2rem", borderRadius: "6px", textDecoration: "none", transition: "color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--cyan)"; el.style.borderColor = "rgba(0,217,255,0.55)"; el.style.background = "rgba(0,217,255,0.06)"; el.style.boxShadow = "0 0 14px rgba(0,217,255,0.12)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--text-secondary)"; el.style.borderColor = "rgba(0,217,255,0.25)"; el.style.background = "transparent"; el.style.boxShadow = "none"; }}
                  >
                    <GithubIcon size={14} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════════
              NEXFLOW CARD
          ══════════════════════════════════════════════════════════════════ */}
          <motion.div
            custom={2} variants={fadeUp} initial="hidden"
            animate={inView ? "visible" : "hidden"}
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
                    href="https://nexflow-os.vercel.app" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-jet), monospace", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#05131f", background: NF_CYAN, padding: "0.65rem 1.4rem", borderRadius: "6px", textDecoration: "none", boxShadow: "0 0 22px rgba(6,182,212,0.38)", transition: "background 0.2s, box-shadow 0.2s, transform 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#22d3ee"; el.style.boxShadow = "0 0 36px rgba(6,182,212,0.58)"; el.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = NF_CYAN; el.style.boxShadow = "0 0 22px rgba(6,182,212,0.38)"; el.style.transform = "translateY(0)"; }}
                  >
                    <Globe size={14} /> Visit App <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://github.com/ws0x/nexflow" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-jet), monospace", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", background: "transparent", border: "1px solid rgba(6,182,212,0.25)", padding: "0.65rem 1.2rem", borderRadius: "6px", textDecoration: "none", transition: "color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = NF_CYAN; el.style.borderColor = "rgba(6,182,212,0.55)"; el.style.background = "rgba(6,182,212,0.06)"; el.style.boxShadow = "0 0 14px rgba(6,182,212,0.12)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--text-secondary)"; el.style.borderColor = "rgba(6,182,212,0.25)"; el.style.background = "transparent"; el.style.boxShadow = "none"; }}
                  >
                    <GithubIcon size={14} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════════
              COMMIT CARD
          ══════════════════════════════════════════════════════════════════ */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden"
            animate={inView ? "visible" : "hidden"}
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
                    href="https://commit.binhakim.dev/" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-jet), monospace", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#031410", background: COMMIT_GREEN, padding: "0.65rem 1.4rem", borderRadius: "6px", textDecoration: "none", boxShadow: "0 0 22px rgba(16,185,129,0.38)", transition: "background 0.2s, box-shadow 0.2s, transform 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#34d399"; el.style.boxShadow = "0 0 36px rgba(16,185,129,0.58)"; el.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = COMMIT_GREEN; el.style.boxShadow = "0 0 22px rgba(16,185,129,0.38)"; el.style.transform = "translateY(0)"; }}
                  >
                    <Globe size={14} /> Visit App <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://github.com/ws0x/commit" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-jet), monospace", fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", background: "transparent", border: "1px solid rgba(16,185,129,0.25)", padding: "0.65rem 1.2rem", borderRadius: "6px", textDecoration: "none", transition: "color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = COMMIT_GREEN; el.style.borderColor = "rgba(16,185,129,0.55)"; el.style.background = "rgba(16,185,129,0.06)"; el.style.boxShadow = "0 0 14px rgba(16,185,129,0.12)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = "var(--text-secondary)"; el.style.borderColor = "rgba(16,185,129,0.25)"; el.style.background = "transparent"; el.style.boxShadow = "none"; }}
                  >
                    <GithubIcon size={14} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
