import { ImageResponse } from "next/og";

export const alt = "Yusuf Naeem, Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#071014", color: "#e8f1f3", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px", fontFamily: "sans-serif" }}>
      <div style={{ color: "#00d9ff", fontSize: 28, marginBottom: 20 }}>binhakim.dev</div>
      <div style={{ fontSize: 68, fontWeight: 700 }}>Secure systems.</div>
      <div style={{ fontSize: 68, fontWeight: 700, color: "#00d9ff" }}>Useful products.</div>
      <div style={{ fontSize: 25, color: "#9ab0b7", marginTop: 28 }}>Yusuf Naeem · Software Engineer · Cairo</div>
    </div>,
    { ...size },
  );
}
