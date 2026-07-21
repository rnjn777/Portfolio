import { ImageResponse } from "next/og";
import { personalInfo } from "@/lib/data";

export const runtime = "edge";
export const alt = "Ranjan Kumar - AI Engineer & Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          position: "relative",
        }}
      >
        {/* Decorative Grid Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Abstract Glows representing Neural Network */}
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 150,
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(188, 19, 254, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 50,
            right: 150,
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(0, 243, 255, 0.25) 0%, transparent 70%)",
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "80px",
            width: "100%",
            height: "100%",
            zIndex: 10,
          }}
        >
          {/* Brutalist Tag */}
          <div
            style={{
              display: "flex",
              backgroundColor: "#f5f5f5",
              color: "#050505",
              padding: "12px 24px",
              fontFamily: "monospace",
              fontSize: 24,
              fontWeight: "bold",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "40px",
            }}
          >
            {personalInfo.title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 90,
              fontWeight: 800,
              color: "#f5f5f5",
              letterSpacing: "-0.05em",
              lineHeight: 1.1,
              marginBottom: "30px",
            }}
          >
            {personalInfo.name}
          </div>
          
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#a0a0a0",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            {personalInfo.tagline}
          </div>

          {/* Footer Line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "auto",
              paddingTop: "40px",
              borderTop: "1px solid rgba(0, 243, 255, 0.3)",
              fontFamily: "monospace",
              fontSize: 20,
              color: "#00f3ff",
              letterSpacing: "0.1em",
            }}
          >
            <div>SYSTEM: ONLINE</div>
            <div>STATUS: SECURE</div>
            <div>LOC: NEW DELHI</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
