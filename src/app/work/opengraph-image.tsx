import { ImageResponse } from "next/og";

export const alt = "Binhakim Works, independent product lab by Yusuf Naeem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "74px", background: "linear-gradient(135deg, #070b13, #0f2131)", color: "#edf3fb" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px", color: "#67e8f9", fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>
          <span style={{ width: 14, height: 14, borderRadius: 999, background: "#67e8f9" }} />
          Independent product lab
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -5 }}>Binhakim Works</div>
          <div style={{ maxWidth: 840, color: "#a1afc1", fontSize: 37, lineHeight: 1.25 }}>Products, open-source software, experiments, and engineering case studies by Yusuf Naeem.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#a1afc1", fontSize: 26 }}>
          <span>binhakim.dev/work</span>
          <span>Yusuf Naeem</span>
        </div>
      </div>
    ),
    size,
  );
}
