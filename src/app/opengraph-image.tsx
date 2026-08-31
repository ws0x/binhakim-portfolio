import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#070b13", color: "#eef2ff", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#67e8f9", fontSize: 24, letterSpacing: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="34" height="34" viewBox="0 0 200 200" fill="none">
            <rect x="24" y="24" width="152" height="152" rx="28" fill="#ffffff" />
            <line x1="56" y1="46" x2="56" y2="154" stroke="#070b13" strokeWidth="14" strokeLinecap="round" />
            <rect x="74" y="48" width="56" height="42" rx="10" fill="#070b13" />
            <rect x="86" y="58" width="32" height="22" rx="5" fill="#ffffff" />
            <rect x="74" y="104" width="66" height="46" rx="12" fill="#070b13" />
            <rect x="86" y="114" width="42" height="26" rx="6" fill="#ffffff" />
            <polygon points="144,48 160,48 148,152 132,152" fill="#070b13" />
          </svg>
          <span>BINHAKIM.DEV</span>
        </div>
        <span>PORTFOLIO</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}><div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -4 }}>Yusuf Naeem</div><div style={{ fontSize: 34, color: "#a7b0c2" }}>Product Engineer · Software Systems & Business Impact</div></div>
      <div style={{ display: "flex", fontSize: 22, color: "#69758a" }}>Product delivery · software systems · data architecture · business outcomes</div>
    </div>,
    { ...size },
  );
}
