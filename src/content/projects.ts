export type ProjectStatus =
  | "public"
  | "internal-production"
  | "beta"
  | "experimental"
  | "rebuilding"
  | "archived";

export type EvidenceLevel = "public" | "sanitized" | "owner-verified";

export type ProjectCollection = "featured" | "open-source" | "experiment" | "archive";

export type ProjectVisibility = "public" | "internal" | "private";

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

export interface WorkItem {
  slug: string;
  name: string;
  category: string;
  collection: ProjectCollection;
  status: ProjectStatus;
  statusLabel: string;
  verifiedAt: string;
  summary: string;
  audience: string;
  problem: string;
  role: string;
  visibility: ProjectVisibility;
  openSource: boolean;
  evidenceLevel: EvidenceLevel;
  stack: string[];
  links: ProjectLinks;
}

export interface ProjectCaseStudy extends WorkItem {
  collection: "featured";
  eyebrow: string;
  accent: "cyan" | "violet" | "green" | "amber";
  featuredOrder: number;
  timeline: string;
  constraints: string[];
  outcomes: ProjectOutcome[];
  engineeringHighlights: EngineeringHighlight[];
  media: ProjectMedia;
  sections: CaseStudySection[];
}

export interface ProjectArchive extends WorkItem {
  collection: "open-source" | "experiment" | "archive";
  tagline?: string;
}

export const PROJECTS = [
  {
    slug: "nexflow",
    name: "NexFlow",
    eyebrow: "Internal production platform",
    category: "B2B operations · security",
    collection: "featured",
    accent: "cyan",
    featuredOrder: 4,
    status: "internal-production",
    statusLabel: "Internal production",
    verifiedAt: "2026-08-11",
    summary:
      "A lead pipeline platform that replaced conflicting spreadsheets across four business entities with one auditable, role-aware workflow.",
    audience: "Marketing and Sales teams working across four business entities.",
    problem:
      "Marketing and Sales were working from separate Excel files with conflicting versions, weak ownership, and no reliable answer to what happened to a lead.",
    role: "Sole product engineer",
    visibility: "internal",
    openSource: true,
    evidenceLevel: "owner-verified",
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
    collection: "featured",
    accent: "amber",
    featuredOrder: 2,
    status: "beta",
    statusLabel: "Public beta",
    verifiedAt: "2026-08-11",
    summary:
      "A private local video and audio download manager with a guided CLI, browser interface, persistent queue, and no hosted processing backend.",
    audience: "People who need a privacy-first local media workflow.",
    problem:
      "Many download tools force users to choose between approachable interfaces and powerful controls, while cloud-based workflows create unnecessary privacy concerns.",
    role: "Product engineer and maintainer",
    visibility: "public",
    openSource: true,
    evidenceLevel: "public",
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
    collection: "featured",
    accent: "violet",
    featuredOrder: 3,
    status: "rebuilding",
    statusLabel: "Rebuilding",
    verifiedAt: "2026-08-11",
    summary:
      "A relationship operating system that turns professional contacts into a queryable, visual, and bilingual workspace.",
    audience: "Professionals who need reliable context for relationship follow-up.",
    problem:
      "Professional networks are usually scattered across contacts, notes, and memory, which makes follow-up inconsistent and relationship context difficult to query.",
    role: "Solo product engineer",
    visibility: "private",
    openSource: false,
    evidenceLevel: "owner-verified",
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
    collection: "featured",
    accent: "green",
    featuredOrder: 1,
    status: "beta",
    statusLabel: "Private beta",
    verifiedAt: "2026-08-11",
    summary:
      "A curriculum tracker that turns study sessions into commits, progress into a contribution graph, and unfinished learning into a visible completion loop.",
    audience: "Self-taught developers working through structured learning paths.",
    problem:
      "Self-taught developers often collect courses faster than they finish them. Existing trackers record tasks but rarely help users maintain momentum.",
    role: "Solo product engineer",
    visibility: "public",
    openSource: false,
    evidenceLevel: "sanitized",
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

export const ARCHIVE_PROJECTS = [
  {
    slug: "throughline",
    name: "Throughline",
    tagline: "Behavioral insight exploration",
    category: "AI · product exploration",
    collection: "experiment",
    status: "experimental",
    statusLabel: "Experimental",
    verifiedAt: "2026-08-31",
    summary: "An early exploration of how structured inputs could support more useful behavioral reflection. It is not a launched product.",
    audience: "People exploring structured reflection from assessment material.",
    problem: "Assessment reports are difficult to turn into focused, reviewable insight without overstating what the system knows.",
    role: "Concept and prototype exploration",
    visibility: "private",
    openSource: true,
    evidenceLevel: "owner-verified",
    stack: ["Next.js", "TypeScript", "AI workflows", "PostgreSQL"],
    links: { source: "https://github.com/ws0x/throughline" },
  },
  {
    slug: "epps-container-optimizer",
    name: "EPPS Container Optimizer",
    tagline: "3D bin-packing and logistics tool",
    category: "Algorithms · visualization",
    collection: "open-source",
    status: "public",
    statusLabel: "Public",
    verifiedAt: "2026-08-31",
    summary: "A browser-based tool for comparing container placements with door-clearance validation and PDF export.",
    audience: "Logistics teams planning container loads under practical constraints.",
    problem: "Manual container planning makes it difficult to compare viable placements and communicate a loading plan.",
    role: "Product engineer",
    visibility: "public",
    openSource: true,
    evidenceLevel: "public",
    stack: ["React", "Three.js", "Vite", "3D algorithms", "Bin packing", "PDF export"],
    links: {
      live: "https://ws0x.github.io/epps-sc-container-optimizer/",
      source: "https://github.com/ws0x/epps-sc-container-optimizer",
    },
  },
  {
    slug: "algorithm-visualizer",
    name: "Algorithm Visualizer",
    tagline: "Interactive computer-science learning tool",
    category: "Education · computer science",
    collection: "open-source",
    status: "archived",
    statusLabel: "Archived",
    verifiedAt: "2026-08-31",
    summary: "An interactive learning project that visualizes algorithms and data structures step by step.",
    audience: "Students learning algorithmic thinking and data structures.",
    problem: "Static examples make it hard for beginners to see how an algorithm changes state over time.",
    role: "Developer and educator",
    visibility: "public",
    openSource: true,
    evidenceLevel: "public",
    stack: ["React", "Vite", "JavaScript", "Canvas", "Algorithms", "Data structures"],
    links: {
      live: "https://ws0x.github.io/algo-visualizer/",
      source: "https://github.com/ws0x/algo-visualizer",
    },
  },
  {
    slug: "iread",
    name: "iREAD",
    tagline: "Reading platform and digital bookstore",
    category: "Academic · full-stack",
    collection: "archive",
    status: "archived",
    statusLabel: "Archived",
    verifiedAt: "2026-08-31",
    summary: "A graduation project that connected reading history, reviews, commerce, and community flows through one REST API.",
    audience: "Readers looking for a combined reading, review, and bookstore experience.",
    problem: "Reading history, reviews, and discovery are often split across disconnected experiences.",
    role: "Graduation project contributor",
    visibility: "private",
    openSource: false,
    evidenceLevel: "owner-verified",
    stack: ["Flutter", "React", "REST API", "Mobile and web"],
    links: {},
  },
] satisfies readonly ProjectArchive[];

export const WORK_ITEMS = [...PROJECTS, ...ARCHIVE_PROJECTS] as const satisfies readonly WorkItem[];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return [...PROJECTS].sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export function getProjectsByCollection(collection: Exclude<ProjectCollection, "featured">) {
  return ARCHIVE_PROJECTS.filter((project) => project.collection === collection);
}

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  public: "Public",
  "internal-production": "Internal production",
  beta: "Beta",
  experimental: "Experimental",
  rebuilding: "Rebuilding",
  archived: "Archived",
};
