import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#070b13", color: "#eef2ff", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#67e8f9", fontSize: 24, letterSpacing: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="34" height="34" viewBox="0 0 200 200" fill="none">
            <rect x="18" y="18" width="164" height="164" rx="32" fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeWidth="4" strokeOpacity="0.35" />
            <rect x="42" y="44" width="22" height="112" rx="6" fill="#ffffff" />
            <path d="M58 44H106C124 44 132 58 124 72C118 82 106 86 58 86" stroke="#ffffff" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M58 86H114C134 86 142 102 130 118C122 128 106 130 58 130" stroke="#ffffff" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <rect x="136" y="44" width="22" height="112" rx="6" fill="#ffffff" />
            <rect x="108" y="90" width="34" height="20" fill="#ffffff" />
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
