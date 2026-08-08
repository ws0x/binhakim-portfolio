/* Wordmark lockups for the three live products. */
import { COMMIT_GLOW, COMMIT_GREEN, NF_CYAN, ORBIT_PURPLE, ORBIT_PURPLE_GLOW } from "./data";

export function OrbitLogo() {
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
export function NexFlowLogo() {
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
export function CommitLogo() {
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
