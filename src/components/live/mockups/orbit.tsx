"use client";

import { useState, useEffect } from "react";
import { BarChart2, Coffee, Home, Mail, Phone, Search, Settings, Share2, Users } from "lucide-react";
import { ORBIT_PURPLE, ORBIT_PURPLE_DIM, ORBIT_PURPLE_GLOW } from "../data";

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

export default function OrbitMockupPanel() {
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
          {"// interactive demo · click tabs to explore"}
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
