import { ImageResponse } from "next/og";
import { workCaseStudies } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = workCaseStudies.find((item) => item.slug === slug);
  const name = study?.name ?? "Case study";
  const accent = study?.accent ?? "#00d9ff";
  return new ImageResponse(
    <div style={{ background: "#071014", color: "#e8f1f3", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px", fontFamily: "sans-serif" }}>
      <div style={{ color: accent, fontSize: 26, marginBottom: 18 }}>binhakim.dev / work</div>
      <div style={{ fontSize: 76, fontWeight: 700 }}>{name}</div>
      <div style={{ fontSize: 28, color: "#9ab0b7", marginTop: 22 }}>{study?.tagline ?? "Engineering case study"}</div>
    </div>,
    { ...size },
  );
}
