import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          gap: 10,
          background: "#20337A",
          borderRadius: 36,
        }}
      >
        <div style={{ width: 44, height: 18, background: "#D9B45B", borderRadius: 4 }} />
        <div style={{ width: 78, height: 18, background: "#F3F5FB", borderRadius: 4 }} />
        <div style={{ width: 112, height: 18, background: "#F3F5FB", borderRadius: 4 }} />
      </div>
    ),
    { ...size }
  );
}
