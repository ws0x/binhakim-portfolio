export type ProjectStatus =
  | "public-live"
  | "internal-production"
  | "beta"
  | "rebuilding"
  | "private"
  | "archived";

export type EvidenceLevel = "public" | "sanitized" | "owner-verified";

export interface ProjectOutcome {
  value: string;
  context: string;
  evidence: EvidenceLevel;
}

export interface EngineeringHighlight {
  title: string;
  detail: string;
  decision: string;
}

export interface ProjectLinks {
  live?: string;
  source?: string;
  docs?: string;
}

export interface ProjectMedia {
  kind: "system" | "diagram";
  label: string;
  description: string;
}

export interface CaseStudySection {
  title: string;
  body: string;
  bullets?: string[];
}

export interface ProjectCaseStudy {
  slug: string;
  name: string;
  eyebrow: string;
  category: string;
  accent: "cyan" | "violet" | "green" | "amber";
  featuredOrder: number;
  status: ProjectStatus;
  statusLabel: string;
  verifiedAt: string;
  summary: string;
  problem: string;
  role: string;
  timeline: string;
  constraints: string[];
  outcomes: ProjectOutcome[];
  engineeringHighlights: EngineeringHighlight[];
  stack: string[];
  links: ProjectLinks;
  media: ProjectMedia;
  sections: CaseStudySection[];
}

export const PROJECTS = [
  {
    slug: "nexflow",
    name: "NexFlow",
    eyebrow: "Internal production platform",
    category: "B2B operations · security",
    accent: "cyan",
    featuredOrder: 1,
    status: "internal-production",
    statusLabel: "Internal production",
    verifiedAt: "2026-08-11",
    summary:
      "A lead pipeline platform that replaced conflicting spreadsheets across four business entities with one auditable, role-aware workflow.",
    problem:
      "Marketing and Sales were working from separate Excel files with conflicting versions, weak ownership, and no reliable answer to what happened to a lead.",
    role: "Sole product engineer",
    timeline: "2024–present",
    constraints: [
      "Four entities needed shared infrastructure with isolated operational views.",
      "Sensitive Marketing fields could never be sent to Sales clients.",
      "Existing Excel history had to migrate without losing auditability.",
    ],
    outcomes: [
      { value: "4 entities", context: "unified in one pipeline", evidence: "owner-verified" },
      { value: "Zero duplicates", context: "reported after REQ-coded intake replaced Excel", evidence: "owner-verified" },
      { value: "Hours → minutes", context: "lead entry and routing workflow", evidence: "owner-verified" },
    ],
    engineeringHighlights: [
      {
        title: "Server-side field permissions",
        detail: "Restricted fields are stripped before the response leaves the API, rather than hidden in the browser.",
        decision: "A UI-only permission check would leave sensitive data in network payloads.",
      },
      {
        title: "Atomic REQ identifiers",
        detail: "A transactional sequence table prevents duplicate daily identifiers under concurrent submissions.",
        decision: "MAX + 1 was rejected because concurrent writers could observe the same value.",
      },
      {
        title: "Migration with operational continuity",
        detail: "Column mapping, preview validation, conflict detection, and historical flags let the team move from Excel safely.",
        decision: "The import flow was designed as a controlled workflow, not a one-off script.",
      },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth", "Whisper AI"],
    links: {
      source: "https://github.com/ws0x/nexflow",
      docs: "https://github.com/ws0x/nexflow#architecture",
    },
    media: {
      kind: "diagram",
      label: "Request security path",
      description: "Session, role, business-unit, department, and field filtering converge before PostgreSQL.",
    },
    sections: [
      {
        title: "Architecture",
        body: "NexFlow uses a single Next.js application, PostgreSQL, and Prisma. Every protected request crosses session, role, business-unit, department, and field-filter checks before data is returned.",
        bullets: ["JWT session with role and business-unit scope", "PostgreSQL transactions for conflict-free identifiers", "Immutable lead history for field-level accountability"],
      },
      {
        title: "Security and reliability",
        body: "The important security boundary is the API response. A Sales user cannot receive Marketing-only keys, even if they construct a request outside the normal interface. The audit trail records who changed what, when, and from which value.",
      },
      {
        title: "What I would improve next",
        body: "The next step is replacing handoff links with a provider adapter that can support the WhatsApp Business API without changing the workflow call sites.",
      },
    ],
  },
  {
    slug: "videx",
    name: "Videx",
    eyebrow: "Local-first media workflow",
    category: "Python · systems · privacy",
    accent: "violet",
    featuredOrder: 2,
    status: "beta",
    statusLabel: "Public beta",
    verifiedAt: "2026-08-11",
    summary:
      "A private local video and audio download manager with a guided CLI, browser interface, persistent queue, and no hosted processing backend.",
    problem:
      "Many download tools force users to choose between approachable interfaces and powerful controls, while cloud-based workflows create unnecessary privacy concerns.",
    role: "Product engineer and maintainer",
    timeline: "2025–present",
    constraints: [
      "Media, credentials, queue history, and files must remain on the user’s machine.",
      "The CLI and browser UI must share the same validated download plans.",
      "A daemon crash must not lose or corrupt queued work.",
    ],
    outcomes: [
      { value: "Local-first", context: "no Videx download backend or user database", evidence: "public" },
      { value: "80% gate", context: "configured Python coverage threshold", evidence: "public" },
      { value: "One engine", context: "CLI and local browser app share queue services", evidence: "public" },
    ],
    engineeringHighlights: [
      {
        title: "SQLite as a process boundary",
        detail: "The queue persists plans, progress, output files, audit events, and cancellation requests across CLI and daemon processes.",
        decision: "A durable local queue gives the browser and CLI one source of truth without adding a hosted service.",
      },
      {
        title: "Loopback-only service",
        detail: "The companion binds to 127.0.0.1, validates Origin, uses a secure local session, and restricts output-file access.",
        decision: "The local network boundary is part of the product’s privacy model, not merely a deployment detail.",
      },
      {
        title: "Shared plans and safe recovery",
        detail: "Validated DownloadPlan objects are serialised into jobs, and running work is reclaimed after a daemon crash.",
        decision: "The queue owns recovery so a terminal closing does not make a user restart the whole workflow.",
      },
    ],
    stack: ["Python", "FastAPI", "SQLite", "yt-dlp", "FFmpeg", "React"],
    links: {
      source: "https://github.com/ws0x/Videx",
      live: "https://videx-app.vercel.app/",
      docs: "https://github.com/ws0x/Videx#architecture",
    },
    media: {
      kind: "system",
      label: "Local execution boundary",
      description: "A visual map of the CLI, local browser app, queue daemon, and loopback service.",
    },
    sections: [
      {
        title: "Architecture",
        body: "The public Vercel site is documentation only. The installed app starts a loopback service, while the CLI, browser interface, daemon, SQLite queue, yt-dlp, and FFmpeg remain on the user’s machine.",
        bullets: ["Shared validated plans between CLI and UI", "Forward-only SQLite migrations", "Output access limited to completed recorded jobs"],
      },
      {
        title: "Testing and release discipline",
        body: "Network extractors are mocked or served by local fixtures, so required tests never contact media websites. The project documents pytest, Ruff, mypy, and a coverage gate as part of the release workflow.",
      },
      {
        title: "What I would improve next",
        body: "The next quality step is a moderated onboarding round with non-technical desktop users, focusing on installation, the local privacy boundary, and queue recovery language.",
      },
    ],
  },
  {
    slug: "orbit",
    name: "Orbit",
    eyebrow: "Relationship intelligence product",
    category: "SaaS · AI · multi-tenant data",
    accent: "green",
    featuredOrder: 3,
    status: "rebuilding",
    statusLabel: "Rebuilding",
    verifiedAt: "2026-08-11",
    summary:
      "A relationship operating system that turns professional contacts into a queryable, visual, and bilingual workspace.",
    problem:
      "Professional networks are usually scattered across contacts, notes, and memory, which makes follow-up inconsistent and relationship context difficult to query.",
    role: "Solo product engineer",
    timeline: "2025–present",
    constraints: [
      "Users need fast relationship context without learning a CRM workflow.",
      "Multi-tenant data isolation must hold at the database layer.",
      "AI assistance must remain useful without becoming an opaque source of truth.",
    ],
    outcomes: [
      { value: "Database isolation", context: "tenant boundaries enforced with PostgreSQL RLS", evidence: "owner-verified" },
      { value: "Bilingual UX", context: "English and Arabic interface with RTL support", evidence: "owner-verified" },
      { value: "Rebuilding", context: "public landing page currently signals an offline product", evidence: "public" },
    ],
    engineeringHighlights: [
      {
        title: "RLS-first tenancy",
        detail: "Data isolation is enforced in PostgreSQL so the security boundary does not depend on every UI path remembering a filter.",
        decision: "Application-only tenant checks create too many places for a future feature to get wrong.",
      },
      {
        title: "Graph plus semantic search",
        detail: "A force-directed relationship view gives visual structure while Gemini-backed search handles natural-language questions.",
        decision: "The graph is for orientation; search is for retrieval. They solve different jobs and should not be collapsed.",
      },
      {
        title: "Billing as a system boundary",
        detail: "Stripe webhooks and server-side usage metering keep subscription state and limits out of client-only logic.",
        decision: "Payment events are external facts, so the application treats them as idempotent server-side inputs.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Gemini AI", "Stripe", "TanStack Query"],
    links: {},
    media: {
      kind: "system",
      label: "Relationship data model",
      description: "A conceptual network view showing people, roles, and relationship strength without exposing real contacts.",
    },
    sections: [
      {
        title: "Architecture",
        body: "Orbit combines a Next.js product surface with Supabase authentication and PostgreSQL RLS, a relationship graph, semantic search, Stripe billing, and bilingual interface primitives.",
        bullets: ["RLS protects tenant boundaries", "Server-side billing and usage metering", "Client cache hydration for responsive graph interactions"],
      },
      {
        title: "Product and AI boundary",
        body: "The product uses AI to retrieve and enrich context, while the relationship model remains the durable source of truth. That separation keeps generated suggestions useful without making them authoritative records.",
      },
      {
        title: "What I would improve next",
        body: "Before relaunching publicly, I would complete a privacy review of imported contacts, add clearer consent and deletion affordances, and publish a verified production status.",
      },
    ],
  },
  {
    slug: "commit",
    name: "commit_",
    eyebrow: "Learning completion product",
    category: "SaaS · education · behavior design",
    accent: "amber",
    featuredOrder: 4,
    status: "beta",
    statusLabel: "Private beta",
    verifiedAt: "2026-08-11",
    summary:
      "A curriculum tracker that turns study sessions into commits, progress into a contribution graph, and unfinished learning into a visible completion loop.",
    problem:
      "Self-taught developers often collect courses faster than they finish them. Existing trackers record tasks but rarely help users maintain momentum.",
    role: "Solo product engineer",
    timeline: "2025–present",
    constraints: [
      "Progress needs to feel encouraging rather than punitive.",
      "The data model must support programs, semesters, courses, and checkpoints.",
      "Local development and hosted production need a low-friction schema path.",
    ],
    outcomes: [
      { value: "Completion loop", context: "log → streak → next action → nudge → celebrate", evidence: "owner-verified" },
      { value: "SQLite → Postgres", context: "same product model across local and production environments", evidence: "owner-verified" },
      { value: "Private beta", context: "status is intentionally conservative until public access is verified", evidence: "sanitized" },
    ],
    engineeringHighlights: [
      {
        title: "Curriculum as a hierarchy",
        detail: "Programs, semesters, courses, and checkpoints create a flexible model for different learning paths.",
        decision: "A flat task list would make ETA and roadmap behavior brittle as curricula change.",
      },
      {
        title: "ETA without shame",
        detail: "Pacing logic translates remaining work into an achievable daily target rather than a failure state.",
        decision: "The product treats schedule changes as normal state transitions, not user failure.",
      },
      {
        title: "Operational reminders",
        detail: "Daily email digests use Resend with a development fallback, keeping the reminder path testable locally.",
        decision: "The product remains useful without making email delivery a hard dependency for local work.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "SQLite", "Resend"],
    links: {
      live: "https://commit.binhakim.dev/",
    },
    media: {
      kind: "system",
      label: "Completion loop",
      description: "An illustrative roadmap view showing a study session becoming progress, pacing, and the next action.",
    },
    sections: [
      {
        title: "Architecture",
        body: "Commit is built as a full-stack Next.js product with a relational curriculum model, Prisma persistence, authentication, email reminders, and a local SQLite path that can move to Postgres in production.",
        bullets: ["Programs → semesters → courses → checkpoints", "Server-owned progress and ETA calculations", "Resend delivery with a safe local fallback"],
      },
      {
        title: "Behavior design",
        body: "The interface uses Git language as a mental model, but the product goal is completion. Streaks and badges reinforce visible progress while pacing nudges avoid framing a missed day as a failure.",
      },
      {
        title: "What I would improve next",
        body: "Before a wider launch, I would verify the public app status, publish an honest onboarding path, and measure whether reminders help users return without creating notification fatigue.",
      },
    ],
  },
] satisfies readonly ProjectCaseStudy[];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return [...PROJECTS].sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  "public-live": "Public live",
  "internal-production": "Internal production",
  beta: "Private beta",
  rebuilding: "Rebuilding",
  private: "Private",
  archived: "Archived",
};
