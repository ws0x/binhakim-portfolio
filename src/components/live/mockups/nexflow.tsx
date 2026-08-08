"use client";

import { useState, useEffect } from "react";
import { BarChart2, Home, List, Search, Settings, Shield } from "lucide-react";
import { NF_CYAN, NF_DIM } from "../data";

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

export default function NexFlowMockupPanel() {
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
