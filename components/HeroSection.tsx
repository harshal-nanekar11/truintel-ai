"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const FloatingOrb = dynamic(() => import("./three/FloatingOrb"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent)",
          animation: "orbFloat 3s ease-in-out infinite",
        }}
      />
    </div>
  ),
});

const STATS = [
  { value: "99.2%", label: "Detection Accuracy", color: "#6366f1" },
  { value: "< 2s", label: "Analysis Time", color: "#8b5cf6" },
  { value: "50M+", label: "Reviews Scanned", color: "#06b6d4" },
];

const BADGES = ["Amazon Reviews", "Flipkart", "Google Reviews", "Trustpilot", "Yelp"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "120px 5% 64px",
      }}
    >
      {/* Top radial accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(99,102,241,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── CENTERED HERO CONTENT ─────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Pill badge */}
        <motion.div variants={itemVariants} style={{ marginBottom: "20px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              fontSize: "0.72rem",
              fontWeight: 600,
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#818cf8",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#6366f1",
                boxShadow: "0 0 6px #6366f1",
                flexShrink: 0,
              }}
            />
            Powered by Advanced NLP
          </span>
        </motion.div>

        {/* Main headline — centered */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.02em",
            margin: "0 0 20px",
            color: "white",
          }}
        >
          Detect{" "}
          <span className="gradient-text">Fake Reviews</span>
          <br />
          <span style={{ color: "rgba(255,255,255,0.9)" }}>in </span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>Seconds</span>
        </motion.h1>

        {/* Sub-headline — centered */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.48)",
            maxWidth: "560px",
            margin: "0 auto 36px",
          }}
        >
          TruIntel AI uses advanced NLP heuristics to instantly analyze product
          reviews — giving you a{" "}
          <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>Trust Score</span>,
          suspicious phrase detection, and a full authenticity report.
        </motion.p>

        {/* CTA Buttons — centered row */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
            marginBottom: "52px",
          }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/analyze"
              id="hero-primary-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "15px 32px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                boxShadow: "0 0 40px rgba(99,102,241,0.45), 0 4px 20px rgba(0,0,0,0.4)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Analyze a Review
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/features?tab=6"
              id="hero-secondary-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "15px 32px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "color 0.2s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              See How It Works
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats row — centered */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "48px",
            flexWrap: "wrap",
          }}
        >
          {STATS.map(({ value, label, color }) => (
            <div
              key={label}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "2rem",
                  lineHeight: 1,
                  color,
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontSize: "0.68rem",
                  color: "rgba(255,255,255,0.35)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── 3D ORB — centered below content ─────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Halo rings */}
        {[440, 340, 400].map((size, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              background:
                i === 0 ? "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)" : undefined,
              border: i > 0 ? `1px ${i === 2 ? "dashed" : "solid"} rgba(99,102,241,0.12)` : undefined,
              animation: `orbFloat ${5 + i * 2}s ease-in-out infinite`,
              animationDelay: `${-i}s`,
            }}
          />
        ))}

        {/* Orb canvas */}
        <div style={{ width: "380px", height: "380px", position: "relative", zIndex: 1 }}>
          <FloatingOrb />
        </div>

        {/* Floating badges around orb */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="glass"
          style={{
            position: "absolute",
            left: "-20px",
            top: "60px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            borderRadius: "16px",
            border: "1px solid rgba(99,102,241,0.28)",
            zIndex: 2,
          }}
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6366f1", boxShadow: "0 0 8px #6366f1", flexShrink: 0 }} />
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: "'Space Grotesk', sans-serif", whiteSpace: "nowrap" }}>
            Trust Score: 94/100
          </span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="glass"
          style={{
            position: "absolute",
            right: "-20px",
            bottom: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            borderRadius: "16px",
            border: "1px solid rgba(16,185,129,0.28)",
            zIndex: 2,
          }}
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", flexShrink: 0 }} />
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: "'Space Grotesk', sans-serif", whiteSpace: "nowrap" }}>
            Verdict: ✓ Authentic
          </span>
        </motion.div>

        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="glass"
          style={{
            position: "absolute",
            right: "30px",
            top: "20px",
            padding: "8px 14px",
            borderRadius: "12px",
            border: "1px solid rgba(244,63,94,0.28)",
            zIndex: 2,
          }}
        >
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#f43f5e", fontFamily: "'Space Grotesk', sans-serif" }}>
            ⚠ Suspicious
          </span>
        </motion.div>
      </motion.div>

      {/* ── Platform Badges ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.28)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          Analyzes reviews from
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
          {BADGES.map((badge) => (
            <span
              key={badge}
              style={{
                padding: "6px 16px",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.38)",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
