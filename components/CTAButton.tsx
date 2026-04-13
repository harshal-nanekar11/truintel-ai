"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTAButton() {
  return (
    <Link href="/analyze" id="cta-analyze-button" style={{ textDecoration: "none", position: "relative", display: "inline-block", marginTop: "8px" }}>
      <motion.div
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.97 }}
        style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "12px" }}
      >
        {/* Outer rotating gradient ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: "-3px",
            borderRadius: "20px",
            background:
              "conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #6366f1)",
            padding: "3px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Pulsing outer glow — bottom only, so it never bleeds up into text above */}
        <motion.div
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "-18px",
            left: "10%",
            right: "10%",
            height: "28px",
            borderRadius: "50%",
            background: "rgba(99,102,241,0.55)",
            pointerEvents: "none",
            filter: "blur(14px)",
          }}
        />

        {/* Main button body */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 40px",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6366f1 100%)",
            boxShadow:
              "0 0 60px rgba(99,102,241,0.5), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
            overflow: "hidden",
          }}
        >
          {/* Shimmer sweep */}
          <motion.div
            animate={{ x: ["-120%", "220%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "40%", height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
              transform: "skewX(-20deg)",
            }}
          />

          {/* Scan icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ position: "relative" }}>
            <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" opacity="0.9" />
            <path d="M16.5 16.5L21 21" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            <path d="M8 11h6M11 8v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </svg>

          <span
            style={{
              position: "relative",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "1.05rem",
              color: "white",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            Start Analyzing
          </span>

          {/* Arrow */}
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "relative", fontSize: "1.25rem", color: "white" }}
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}
