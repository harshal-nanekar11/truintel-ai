import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "TruIntel AI – Fake Review Detector",
  description:
    "AI-powered fake review detection engine. Instantly analyze product reviews for authenticity with our advanced NLP trust scoring system.",
  keywords: [
    "fake review detector",
    "AI review analysis",
    "trust score",
    "NLP",
    "product reviews",
    "Amazon reviews",
  ],
  authors: [{ name: "Harshal Nanekar" }],
  openGraph: {
    title: "TruIntel AI – Fake Review Detector",
    description:
      "AI-powered fake review detection. Get instant trust scores for any product review.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#04040a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Ambient background orbs */}
        <div className="ambient-bg" aria-hidden="true">
          <div className="ambient-orb ambient-orb-1" />
          <div className="ambient-orb ambient-orb-2" />
          <div className="ambient-orb ambient-orb-3" />
        </div>

        {/* Grid background */}
        <div
          className="fixed inset-0 grid-bg pointer-events-none"
          style={{ zIndex: 1 }}
          aria-hidden="true"
        />

        <ClientProviders>{children}</ClientProviders>
        <Analytics />
      </body>
    </html>
  );
}
