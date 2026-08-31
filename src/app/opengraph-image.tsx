import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#070b13", color: "#eef2ff", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#67e8f9", fontSize: 24, letterSpacing: 4 }}><span>BINHAKIM.DEV</span><span>PORTFOLIO</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}><div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -4 }}>Yusuf Naeem</div><div style={{ fontSize: 34, color: "#a7b0c2" }}>Product Engineer · Software Systems & Business Impact</div></div>
      <div style={{ display: "flex", fontSize: 22, color: "#69758a" }}>Product delivery · software systems · data architecture · business outcomes</div>
    </div>,
    { ...size },
  );
}
