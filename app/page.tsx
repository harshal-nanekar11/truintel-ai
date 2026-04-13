import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import Link from "next/link";
import { LogoIcon } from "@/components/Logo";
import CTAButton from "@/components/CTAButton";


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
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "36px" }}>

            {/* GitHub */}
            <a href="https://github.com/harshal-nanekar11" target="_blank" rel="noopener noreferrer"
              title="GitHub"
              style={{
                width: "42px", height: "42px", borderRadius: "12px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.45)", textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLAnchorElement).style.color = "white"; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com/in/harshal-nanekar" target="_blank" rel="noopener noreferrer"
              title="LinkedIn"
              style={{
                width: "42px", height: "42px", borderRadius: "12px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(10,102,194,0.08)", border: "1px solid rgba(10,102,194,0.2)",
                color: "rgba(10,102,194,0.7)", textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(10,102,194,0.2)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(10,102,194,0.5)"; (e.currentTarget as HTMLAnchorElement).style.color = "#0a66c2"; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(10,102,194,0.08)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(10,102,194,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(10,102,194,0.7)"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com/harshal_nanekar" target="_blank" rel="noopener noreferrer"
              title="Instagram"
              style={{
                width: "42px", height: "42px", borderRadius: "12px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(225,48,108,0.08)", border: "1px solid rgba(225,48,108,0.2)",
                color: "rgba(225,48,108,0.7)", textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(225,48,108,0.2)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(225,48,108,0.5)"; (e.currentTarget as HTMLAnchorElement).style.color = "#e1306c"; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(225,48,108,0.08)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(225,48,108,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(225,48,108,0.7)"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>

            {/* Gmail */}
            <a href="mailto:harshal.nanekar@gmail.com"
              title="Email"
              style={{
                width: "42px", height: "42px", borderRadius: "12px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(234,67,53,0.08)", border: "1px solid rgba(234,67,53,0.2)",
                color: "rgba(234,67,53,0.7)", textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(234,67,53,0.2)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(234,67,53,0.5)"; (e.currentTarget as HTMLAnchorElement).style.color = "#ea4335"; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(234,67,53,0.08)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(234,67,53,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(234,67,53,0.7)"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
            </a>
          </div>

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
