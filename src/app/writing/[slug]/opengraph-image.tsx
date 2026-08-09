import { ImageResponse } from "next/og";
import { articleFor } from "@/lib/writing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const article = articleFor((await params).slug);
  return new ImageResponse(
    <div style={{ background: "#071014", color: "#e8f1f3", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px", fontFamily: "sans-serif" }}>
      <div style={{ color: "#00d9ff", fontSize: 26, marginBottom: 18 }}>binhakim.dev / writing</div>
      <div style={{ fontSize: 58, fontWeight: 700, maxWidth: 1020 }}>{article?.title ?? "Technical writing"}</div>
      <div style={{ fontSize: 24, color: "#9ab0b7", marginTop: 24 }}>Backend engineering · data · application security</div>
    </div>,
    { ...size },
  );
}
