/* Product copy and palette for the three live products.
 * Extracted from LiveProjects.tsx so the cards, the mockups and (in a later
 * phase) the /work case-study pages can share a single source. */
import { Award, BarChart2, Bell, BookOpen, Brain, Building2, ClipboardList, Clock, CreditCard, FileSpreadsheet, Flame, GitCommit, Languages, Lock, Map, Mic, Network, Shield, Smartphone, Target, TrendingUp, Users, Zap } from "lucide-react";

// ── Orbit constants ────────────────────────────────────────────────────────────
export const ORBIT_PURPLE      = "#7c3aed";
export const ORBIT_PURPLE_DIM  = "rgba(124,58,237,0.22)";
export const ORBIT_PURPLE_GLOW = "rgba(124,58,237,0.55)";

export const ORBIT_FEATURES = [
  { Icon: Users,      label: "People Dashboard",       detail: "Track & organise your professional network" },
  { Icon: Network,    label: "Relationship Graph",      detail: "D3 force-directed visualisation" },
  { Icon: Zap,        label: "Gemini AI Search",        detail: "Semantic queries & smart contact insights" },
  { Icon: Brain,      label: "AI Contact Intelligence", detail: "Strength scoring & smart outreach nudges" },
  { Icon: Shield,     label: "OAuth SSO",               detail: "Google & LinkedIn one-click sign-in" },
  { Icon: CreditCard, label: "Stripe Billing",          detail: "Free + Pro subscription tiers" },
  { Icon: Smartphone, label: "PWA · Offline",           detail: "Installable on iOS & Android" },
  { Icon: Languages,  label: "RTL i18n",                detail: "Full English + Arabic support" },
];

export const ORBIT_TECH = [
  "Next.js 16", "TypeScript", "Supabase", "Gemini AI",
  "OAuth 2.0", "Stripe", "TanStack Query", "Tailwind v4", "PWA",
];

// ── NexFlow constants ──────────────────────────────────────────────────────────
export const NF_CYAN    = "#06b6d4";
export const NF_DIM     = "rgba(6,182,212,0.22)";

export const NF_FEATURES = [
  { Icon: ClipboardList,  label: "REQ Code Engine",        detail: "Atomic sequence locks — conflict-free under concurrent writes" },
  { Icon: Lock,           label: "Field-Level RBAC",       detail: "Marketing fields stripped server-side — never sent to Sales clients" },
  { Icon: Building2,      label: "Multi-Entity Platform",  detail: "HSL · MGL · MKL · HCL — isolated data, shared infrastructure" },
  { Icon: Bell,           label: "WhatsApp Handoff",       detail: "Configurable lead cards sent instantly to BU coordinators" },
  { Icon: Mic,            label: "Voice Transcription",    detail: "Egyptian Arabic dictation via Whisper AI, mixed Arabic/EN" },
  { Icon: BarChart2,      label: "Live Analytics",         detail: "KPIs, pipeline stages, source ROI, sector heatmap in real time" },
  { Icon: FileSpreadsheet,label: "Excel Migration",        detail: "Bulk import with column mapping, conflict detection & validation" },
  { Icon: TrendingUp,     label: "Full Audit Trail",       detail: "Every field change logged: user, timestamp, before → after" },
];

export const NF_TECH = [
  "Next.js 14", "TypeScript", "PostgreSQL", "Prisma",
  "NextAuth v5", "Recharts", "Shadcn/ui", "Whisper AI", "PWA", "xlsx",
];

// ── Commit constants ───────────────────────────────────────────────────────────
export const COMMIT_GREEN = "#10b981";
export const COMMIT_DIM   = "rgba(16,185,129,0.22)";
export const COMMIT_GLOW  = "rgba(16,185,129,0.55)";

export const COMMIT_FEATURES = [
  { Icon: GitCommit, label: "Study Sessions",    detail: "Timer-style quick-log — every session is a commit; the keystone of the habit loop" },
  { Icon: Flame,     label: "Streak + Grid",     detail: "Daily activity lights up emerald; GitHub-style contribution heatmap" },
  { Icon: Map,       label: "Roadmap View",      detail: "Glowing transit line: completed stations lit, current one pulsing, real ETA to finish" },
  { Icon: BookOpen,  label: "Curriculum Engine", detail: "Programs → Semesters → Courses → Checkpoints — your degree, your rules" },
  { Icon: Target,    label: "Pacing Nudges",     detail: "\"Aim for ~0.8h/day\" — always encouraging, never \"you're behind\"" },
  { Icon: Award,     label: "XP & Badges",       detail: "Gamified milestones: Merged to Main, On a Roll, Early Bird, and more" },
  { Icon: Bell,      label: "Email Reminders",   detail: "Daily cron digest via Resend; graceful console fallback in dev" },
  { Icon: Clock,     label: "ETA Engine",        detail: "Smart deadline tracking with gentle reschedule — keeps momentum, never guilt" },
];

export const COMMIT_TECH = [
  "Next.js 16", "React 19", "TypeScript", "Prisma 7",
  "Auth.js v5", "Tailwind v4", "Framer Motion", "SQLite → Postgres", "Resend",
];

// ── Orbit logo icon ────────────────────────────────────────────────────────────
