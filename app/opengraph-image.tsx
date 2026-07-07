import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Babylon Translation Agency — Lutsk, Ukraine";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #17255C 0%, #20337A 55%, #2A418F 100%)",
          color: "#F3F5FB",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ width: 72, height: 20, background: "#D9B45B", borderRadius: 5 }} />
          <div style={{ width: 128, height: 20, background: "#F3F5FB", borderRadius: 5 }} />
          <div style={{ width: 184, height: 20, background: "#F3F5FB", borderRadius: 5 }} />
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, marginTop: 44, letterSpacing: -2 }}>
          Babylon
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 10, color: "#C9D2EE" }}>
          Translation Agency · Lutsk
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 34, color: "#D9B45B", letterSpacing: 6 }}>
          TRANSLATION · APOSTILLE · LEGALIZATION
        </div>
      </div>
    ),
    { ...size }
  );
}
