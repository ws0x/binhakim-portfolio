export type StudioProductStatus = "release-candidate" | "public-beta" | "open-source" | "private-beta" | "rebuilding";

export interface StudioProductLink {
  label: string;
  href: string;
}

export interface StudioProduct {
  slug: string;
  name: string;
  category: string;
  status: StudioProductStatus;
  statusLabel: string;
  availability: string;
  summary: string;
  audience: string;
  proof: string;
  technicalNote: string;
  platforms: string[];
  capabilities: string[];
  keywords: string[];
  details: Array<{ title: string; body: string }>;
  links: StudioProductLink[];
}

export const STUDIO_PRODUCTS: readonly StudioProduct[] = [
  {
    slug: "marginsync",
    name: "MarginSync",
    category: "Reading intelligence",
    status: "release-candidate",
    statusLabel: "Release candidate",
    availability: "Source is available. Store publication and live migration canary are still pending.",
    summary: "Sync Kindle highlights into Notion without overwriting the notes and decisions you make there.",
    audience: "Readers who want their Kindle highlights in a usable, owned knowledge system.",
    proof: "Local-first sync with resumable jobs, backup preflight, and controlled Notion writes.",
    technicalNote: "The extension keeps the Kindle snapshot in IndexedDB and treats Notion as a controlled projection with user-owned fields.",
    platforms: ["Chrome extension", "Kindle", "Notion"],
    capabilities: ["Kindle highlight capture", "Resumable local sync", "Controlled Notion projection", "User-field preservation"],
    keywords: ["Kindle highlights", "Notion sync", "reading notes", "local-first reading"],
    details: [
      { title: "What it protects", body: "MarginSync separates source data from your interpretation. Kindle highlights stay intact, while your Notion status, tags, and notes remain yours." },
      { title: "What is available", body: "The release candidate can be built and loaded from source. Public store release remains intentionally withheld until migration and background-soak gates are complete." },
    ],
    links: [
      { label: "View source", href: "https://github.com/ws0x/hakim" },
      { label: "Read documentation", href: "https://github.com/ws0x/hakim#readme" },
    ],
  },
  {
    slug: "videx",
    name: "Videx",
    category: "Local media workflow",
    status: "public-beta",
    statusLabel: "Public beta",
    availability: "Available for Windows, Linux, and Python users.",
    summary: "Download authorized video, audio, playlists, and subtitles locally through a CLI or browser interface.",
    audience: "People who want a capable media workflow without handing their files, history, or credentials to a hosted service.",
    proof: "The CLI and browser interface share one validated local queue, with no Videx account, analytics, or cloud storage.",
    technicalNote: "The installed app runs a loopback-only service with a durable SQLite queue, while the public site provides documentation and downloads only.",
    platforms: ["Windows", "Linux", "Python", "Browser interface"],
    capabilities: ["Video and audio downloads", "Playlist queuing", "Subtitle downloads", "Local browser control"],
    keywords: ["local video downloader", "audio downloader", "yt-dlp interface", "privacy-first media tool"],
    details: [
      { title: "Use it responsibly", body: "Videx is for media you own or are authorized to save. It does not bypass access restrictions or grant rights to third-party content." },
      { title: "How it works", body: "Install Videx, run the local app, preview an authorized URL, and queue work on your own machine." },
    ],
    links: [
      { label: "Get Videx", href: "https://videx-app.vercel.app/download.html" },
      { label: "View source", href: "https://github.com/ws0x/Videx" },
    ],
  },
  {
    slug: "cerebro",
    name: "Cerebro",
    category: "Knowledge mapping CLI",
    status: "open-source",
    statusLabel: "Open source",
    availability: "Available from source for Python 3.10 and newer.",
    summary: "Turn videos, audio, PDFs, web articles, and folders into editable mind maps instead of flat summaries.",
    audience: "People who want to turn dense material into a structured map they can inspect and refine.",
    proof: "A map, reduce, and link pipeline produces OPML, XMind, or Markdown, with an offline heuristic fallback.",
    technicalNote: "Cerebro grounds generated structure in the source material and keeps a deterministic fallback available when an AI provider is not configured.",
    platforms: ["Python 3.10+", "CLI", "OPML", "XMind", "Markdown"],
    capabilities: ["Video and audio ingestion", "PDF and article processing", "Mind-map generation", "Portable exports"],
    keywords: ["mind map CLI", "video to mind map", "PDF knowledge mapping", "structured notes"],
    details: [
      { title: "More than a summary", body: "Cerebro groups related ideas, promotes themes into parent concepts, and preserves relationships across branches of a map." },
      { title: "Choose your output", body: "Export a portable OPML file, a native XMind map, or Markdown for an editor, outliner, or personal knowledge base." },
    ],
    links: [
      { label: "View source", href: "https://github.com/ws0x/cerebro" },
      { label: "Quick start", href: "https://github.com/ws0x/cerebro#installation" },
    ],
  },
  {
    slug: "commit",
    name: "Commit",
    category: "Learning completion",
    status: "private-beta",
    statusLabel: "Private beta",
    availability: "Not accepting public access yet.",
    summary: "Turn a structured learning path into visible progress, a practical next action, and a completion loop that does not punish missed days.",
    audience: "Self-taught developers working through courses, programs, and project-based learning paths.",
    proof: "A relational curriculum model connects programs, courses, checkpoints, pacing, and reminders.",
    technicalNote: "The product keeps progress and pacing calculations server-owned so the completion loop remains consistent across devices and environments.",
    platforms: ["Web platform", "Learning workflows"],
    capabilities: ["Curriculum planning", "Checkpoint tracking", "Pacing support", "Completion loops"],
    keywords: ["learning progress tracker", "course completion", "developer learning planner"],
    details: [
      { title: "Why it exists", body: "Most learning trackers record tasks. Commit focuses on the gap between collecting courses and actually finishing them." },
      { title: "Current status", body: "Commit is being developed in private beta. This page documents its purpose without implying public availability." },
    ],
    links: [],
  },
  {
    slug: "orbit",
    name: "Orbit",
    category: "Relationship context",
    status: "rebuilding",
    statusLabel: "Rebuilding",
    availability: "No public demo or repository is available while the product is rebuilt.",
    summary: "A relationship workspace designed to make professional context, follow-up, and history easier to understand.",
    audience: "Professionals who need reliable context across people, notes, and relationship history.",
    proof: "The rebuild retains database-level tenant isolation and bilingual interface foundations as non-negotiable product boundaries.",
    technicalNote: "Orbit treats relationship data as sensitive. Its architecture uses database-level row security rather than relying on interface-only separation.",
    platforms: ["Web platform", "Relationship workspace"],
    capabilities: ["Relationship context", "Follow-up history", "Tenant isolation", "Bilingual foundations"],
    keywords: ["relationship workspace", "professional follow-up", "contact context"],
    details: [
      { title: "What is being rebuilt", body: "The product is being rethought before relaunch, with privacy, consent, and clear ownership of imported contact data treated as first-class concerns." },
      { title: "Current status", body: "Orbit is not launched. This description is intentionally limited to its direction and verified architectural boundaries." },
    ],
    links: [],
  },
];

export function getStudioProduct(slug: string) {
  return STUDIO_PRODUCTS.find((product) => product.slug === slug);
}

export function getStudioProductsByAvailability() {
  return {
    available: STUDIO_PRODUCTS.slice(0, 3),
    inDevelopment: STUDIO_PRODUCTS.slice(3),
  } as const;
}
