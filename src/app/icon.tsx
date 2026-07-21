import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: "3px",
        color: "#ffffff",
        backgroundColor: "#829b91",
        borderRadius: "14px",
        fontFamily: "Arial, sans-serif",
        fontSize: "30px",
        fontWeight: 700,
        letterSpacing: "-3px",
      }}
    >
      TT
    </div>,
    {
      ...size,
    },
  );
}
