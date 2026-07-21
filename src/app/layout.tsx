import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Noise from "@/components/Noise";
import AuroraBackground from "@/components/AuroraBackground";
import TerminalOverlay from "@/components/TerminalOverlay";
import AudioController from "@/components/AudioController";
import MobileTerminalButton from "@/components/MobileTerminalButton";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Ranjan Kumar | Creative Engineer",
  description:
    "AI Engineer, UI/UX Designer, and Full-Stack Developer blending intelligence with elegant design.",
  keywords: [
    "AI Engineer",
    "Creative Developer",
    "UI/UX Design",
    "React",
    "WebGL",
    "Portfolio",
    "Ranjan Kumar",
  ],
  authors: [{ name: "Ranjan Kumar" }],
  openGraph: {
    title: "Ranjan Kumar | Creative Engineer",
    description: "Building intelligent software with aesthetic precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)] font-[family-name:var(--font-body)] overflow-x-hidden cursor-none selection:bg-[var(--accent-cyan)] selection:text-black">
        <CustomCursor />
        <AudioController />
        <MobileTerminalButton />
        <TerminalOverlay />
        <SmoothScroll>
          <AuroraBackground />
          <Noise />
          {/* Main Content */}
          <div className="relative z-20">{children}</div>
        </SmoothScroll>
        
        {/* Vercel Metrics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
