import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import Link from "next/link";
import { LogoIcon } from "@/components/Logo";
import CTAButton from "@/components/CTAButton";
import SocialLinks from "@/components/SocialLinks";

export default function HomePage() {
  return (
    <main className="page-content min-h-screen">
      <Navbar />
      <HeroSection />
      <FeatureCards />

      {/* ── CTA Section ──────────────────────────────────────────────────────── */}
      <section className="relative py-32 px-6 flex flex-col items-center text-center">
        {/* Background accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-8 uppercase tracking-widest"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
              color: "#818cf8",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Get Started Free
          </div>

          <h2
            className="text-5xl sm:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-white">Stop Trusting</span>
            <br />
            <span className="gradient-text">Fake Reviews</span>
          </h2>

          <p className="text-lg text-white/40 leading-relaxed" style={{ marginBottom: "56px" }}>
            Paste any product review below and let our AI engine tell you
            exactly how authentic it is — in under 2 seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ paddingTop: "8px" }}>
            <CTAButton />
          </div>
        </div>
      </section>

      <footer
        className="border-t px-6"
        style={{ borderColor: "rgba(255,255,255,0.05)", paddingTop: "60px", paddingBottom: "52px" }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

          {/* Logo + brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "36px" }}>
            <LogoIcon size={28} />
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "rgba(255,255,255,0.45)" }}>TruIntel AI</span>
          </div>

          {/* Wide divider */}
          <div style={{ width: "200px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)", marginBottom: "40px" }} />

          {/* ── Developer credit highlight ── */}
          <div style={{
            padding: "28px 48px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.06) 50%, rgba(6,182,212,0.05) 100%)",
            border: "1px solid rgba(99,102,241,0.18)",
            boxShadow: "0 0 60px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
            marginBottom: "40px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Subtle top shine */}
            <div style={{
              position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(139,92,246,0.6), transparent)",
            }} />

            <p style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}>
              Designed &amp; Developed by
            </p>

            {/* Name with glow */}
            <p style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 40%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(99,102,241,0.55)) drop-shadow(0 0 40px rgba(139,92,246,0.3))",
              marginBottom: "0",
            }}>
              Harshal Nanekar
            </p>

            {/* Shimmer underline */}
            <div style={{
              width: "60%",
              height: "2px",
              margin: "12px auto 0",
              background: "linear-gradient(90deg, transparent, #6366f1, #a78bfa, #06b6d4, transparent)",
              borderRadius: "2px",
              opacity: 0.6,
            }} />
          </div>

          {/* ── Social Links ── */}
          <SocialLinks />

          {/* Built with */}
          <p style={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "'Space Grotesk',sans-serif",
            letterSpacing: "0.04em",
            marginBottom: "20px",
          }}>
            Built with Next.js · TypeScript · Three.js · Framer Motion
          </p>

          {/* Thin rule */}
          <div style={{ width: "60px", height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "20px" }} />

          {/* Copyright */}
          <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.12)", fontFamily: "'Space Grotesk',sans-serif" }}>
            © 2026 TruIntel AI. All rights reserved.
          </p>
        </div>
      </footer>


    </main>
  );
}
