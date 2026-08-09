"use client";

import { useState, useEffect } from "react";
import { BarChart2, BookOpen, Home, Map, Settings } from "lucide-react";
import { COMMIT_DIM, COMMIT_GLOW, COMMIT_GREEN } from "../data";

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

export default function CommitMockupPanel() {
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
