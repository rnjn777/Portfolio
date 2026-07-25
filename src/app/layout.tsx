import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Noise from "@/components/ui/Noise";
import AuroraBackground from "@/components/ui/AuroraBackground";
import TerminalOverlay from "@/components/ui/TerminalOverlay";
import AudioController from "@/components/ui/AudioController";
import MobileTerminalButton from "@/components/ui/MobileTerminalButton";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

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
  metadataBase: new URL("https://ranjankumar.dev"),
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
    url: "https://ranjankumar.dev", // Update with actual domain
    siteName: "Ranjan Kumar Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Ranjan Kumar - Creative Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranjan Kumar | Creative Engineer",
    description: "Building intelligent software with aesthetic precision.",
    images: ["/profile.png"],
    creator: "@ranjankumar", // Update with actual handle
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
      <body className="min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)] font-[family-name:var(--font-body)] overflow-x-hidden cursor-none selection:bg-[var(--accent-cyan)] selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
