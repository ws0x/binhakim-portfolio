import { ImageResponse } from "next/og";
import { getProject } from "@/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const name = project?.name ?? "Selected work";
  const summary = project?.summary ?? "Systems built for real constraints.";
  const accent = project?.accent === "violet" ? "#a78bfa" : project?.accent === "green" ? "#34d399" : project?.accent === "amber" ? "#fbbf24" : "#67e8f9";

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#070b13", color: "#eef2ff", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: accent, fontSize: 24, letterSpacing: 4 }}><span>BINHAKIM.DEV</span><span>CASE STUDY</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}><div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -4 }}>{name}</div><div style={{ fontSize: 30, color: "#a7b0c2", lineHeight: 1.3, maxWidth: 950 }}>{summary}</div></div>
      <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#69758a" }}><span>Yusuf Naeem Abd El-Hakim</span><span>·</span><span>Backend-leaning full-stack engineer</span></div>
    </div>,
    { ...size },
  );
}
