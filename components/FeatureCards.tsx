"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// ── Premium SVG icons per feature ────────────────────────────────────────
const ICONS: Record<string, React.ReactNode> = {
  "trust-score": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" opacity="0.4"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  ),
  "phrase-detection": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 10.5h5M10.5 8v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  "sentiment-analysis": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polyline points="3,16 7,10 11,13 15,7 21,12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 20h18" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
      <circle cx="21" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  ),
  "authenticity-signals": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L14.5 8.5H20L15.5 12L17.5 17.5L12 14L6.5 17.5L8.5 12L4 8.5H9.5L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
    </svg>
  ),
  "real-time": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  "explanations": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6"/>
      <line x1="7" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="7" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="7" y1="16" x2="11" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="16" r="2.5" fill="currentColor" opacity="0.7"/>
    </svg>
  ),
};

const FEATURES = [
  {
    id: "trust-score",
    title: "Trust Score Engine",
    description: "Our NLP engine scores every review 0–100 using 15+ heuristic signals — from phrase patterns to sentiment extremity.",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.3)",
    stat: "99.2%",
    statLabel: "Accuracy",
  },
  {
    id: "phrase-detection",
    title: "Phrase Detection",
    description: "Identifies known fake-review language patterns: generic superlatives, bot-like phrases, and marketing filler words.",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.3)",
    stat: "200+",
    statLabel: "Patterns",
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    description: "Detects unnatural sentiment — overly positive reviews with no critique are a strong indicator of manipulation.",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.3)",
    stat: "0.961",
    statLabel: "F1 Score",
  },
  {
    id: "authenticity-signals",
    title: "Authenticity Signals",
    description: "Rewards real signals: detailed comparisons, time-based feedback, specific product attributes, and balanced critique.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.3)",
    stat: "6",
    statLabel: "Dimensions",
  },
  {
    id: "real-time",
    title: "Real-Time Analysis",
    description: "Paste any review and get a complete authenticity report in under 2 seconds. Instant results, no waiting.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.3)",
    stat: "<2s",
    statLabel: "Latency",
  },
  {
    id: "explanations",
    title: "Detailed Explanations",
    description: "Every verdict comes with a categorized explanation card breakdown — know exactly why a review is suspicious.",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.3)",
    stat: "100%",
    statLabel: "Transparent",
  },
];

// ── Interactive card with tilt on hover ───────────────────────────────────
function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href="/features" style={{ textDecoration: "none", display: "block" }}>
      <motion.div
        id={`feature-card-${feature.id}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
        whileHover={{ y: -8, transition: { duration: 0.22 } }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          position: "relative",
          borderRadius: "20px",
          padding: "24px",
          cursor: "pointer",
          height: "100%",
          boxSizing: "border-box",
          background: hovered
            ? `linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.02) 100%)`
            : "rgba(255,255,255,0.025)",
          border: `1px solid ${hovered ? feature.color + "50" : "rgba(255,255,255,0.07)"}`,
          backdropFilter: "blur(20px)",
          boxShadow: hovered ? `0 20px 48px rgba(0,0,0,0.4), 0 0 36px ${feature.glow}` : "0 4px 24px rgba(0,0,0,0.2)",
          transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
          overflow: "hidden",
        }}
      >
        {/* Top gradient accent bar */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: 0,
            left: "12%",
            right: "12%",
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
            borderRadius: "1px",
          }}
        />

        {/* Background glow blob */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${feature.glow} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Icon + stat row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "18px" }}>
          {/* Icon box */}
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 3 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: feature.color,
              background: `${feature.color}15`,
              border: `1px solid ${feature.color}35`,
              boxShadow: hovered ? `0 0 20px ${feature.glow}` : "none",
              transition: "box-shadow 0.3s",
            }}
          >
            {ICONS[feature.id]}
          </motion.div>

          {/* Stat chip */}
          <div style={{
            textAlign: "right",
            padding: "4px 10px",
            borderRadius: "8px",
            background: `${feature.color}12`,
            border: `1px solid ${feature.color}28`,
          }}>
            <div style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 800,
              fontSize: "0.95rem",
              color: feature.color,
              lineHeight: 1.1,
            }}>{feature.stat}</div>
            <div style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>{feature.statLabel}</div>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 700,
          fontSize: "1.02rem",
          color: "white",
          marginBottom: "10px",
          lineHeight: 1.3,
        }}>
          {feature.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.42)",
          lineHeight: 1.65,
          marginBottom: "20px",
        }}>
          {feature.description}
        </p>

        {/* Explore link */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: feature.color,
            fontFamily: "'Space Grotesk',sans-serif",
            letterSpacing: "0.02em",
          }}>
            Explore
          </span>
          <motion.span
            animate={{ x: hovered ? [0, 5, 3] : 0 }}
            transition={{ duration: 0.4 }}
            style={{ color: feature.color, fontSize: "0.85rem", display: "inline-block" }}
          >
            →
          </motion.span>
        </div>

        {/* Bottom accent bar */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: "20%",
            right: "20%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${feature.color}60, transparent)`,
            borderRadius: "1px",
            transformOrigin: "center",
          }}
        />
      </motion.div>
    </Link>
  );
}

// ── Section ───────────────────────────────────────────────────────────────
export default function FeatureCards() {
  return (
    <section
      id="features"
      style={{
        position: "relative",
        padding: "96px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Section heading */}
      <div style={{ textAlign: "center", marginBottom: "60px", maxWidth: "640px", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: "999px",
            fontSize: "0.7rem",
            fontWeight: 600,
            marginBottom: "20px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.1em",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.2)",
            color: "#818cf8",
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            Capabilities
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            color: "white",
            marginBottom: "16px",
            lineHeight: 1.1,
          }}>
            How{" "}
            <span className="gradient-text">TruIntel AI</span>{" "}
            Works
          </h2>
          <p style={{ fontSize: "0.97rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
            Six detection layers work together to give you the most accurate fake-review verdict possible.
          </p>
        </motion.div>
      </div>

      {/* Feature Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "22px",
          width: "100%",
          maxWidth: "1080px",
          padding: "0 32px",
          boxSizing: "border-box",
        }}
        className="feature-grid-home"
      >
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.id} feature={feature} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .feature-grid-home { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .feature-grid-home { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
