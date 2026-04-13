"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface TrustScoreRingProps {
  score: number;
  classification: "FAKE" | "REAL" | "SUSPICIOUS";
  confidence: number;
}

function getScoreColor(score: number): { primary: string; secondary: string; glow: string } {
  if (score >= 65) return { primary: "#10b981", secondary: "#34d399", glow: "rgba(16,185,129,0.4)" };
  if (score >= 35) return { primary: "#f59e0b", secondary: "#fbbf24", glow: "rgba(245,158,11,0.4)" };
  return { primary: "#f43f5e", secondary: "#fb7185", glow: "rgba(244,63,94,0.4)" };
}

function getClassificationConfig(cls: "FAKE" | "REAL" | "SUSPICIOUS") {
  switch (cls) {
    case "REAL":
      return { label: "AUTHENTIC", emoji: "✓", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", color: "#10b981" };
    case "FAKE":
      return { label: "FAKE", emoji: "⚠", bg: "rgba(244,63,94,0.12)", border: "rgba(244,63,94,0.3)", color: "#f43f5e" };
    case "SUSPICIOUS":
      return { label: "SUSPICIOUS", emoji: "?", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", color: "#f59e0b" };
  }
}

export default function TrustScoreRing({ score, classification, confidence }: TrustScoreRingProps) {
  const { primary, secondary, glow } = getScoreColor(score);
  const config = getClassificationConfig(classification);

  const SIZE = 220;
  const STROKE_WIDTH = 14;
  const RADIUS = (SIZE - STROKE_WIDTH) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const animatedScore = useMotionValue(0);
  const smoothScore = useSpring(animatedScore, { damping: 20, stiffness: 60 });
  const dashOffset = useTransform(
    smoothScore,
    [0, 100],
    [CIRCUMFERENCE, CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      animatedScore.set(score);
    }, 300);
    return () => clearTimeout(timeout);
  }, [score, animatedScore]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-6"
    >
      {/* SVG Ring */}
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        {/* Glow backdrop */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `0 0 60px ${glow}`,
            background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          }}
        />

        <svg width={SIZE} height={SIZE} style={{ transform: "rotate(-90deg)", position: "relative", zIndex: 1 }}>
          {/* Background track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={STROKE_WIDTH}
          />

          {/* Progress arc */}
          <motion.circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            style={{ strokeDashoffset: dashOffset }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primary} />
              <stop offset="100%" stopColor={secondary} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 2 }}
        >
          <motion.span
            className="text-5xl font-bold"
            style={{ color: primary, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-white/40 font-medium mt-1 tracking-wider uppercase">
            Trust Score
          </span>
        </div>
      </div>

      {/* Classification Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        <div
          id="classification-badge"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm"
          style={{
            background: config.bg,
            border: `1px solid ${config.border}`,
            color: config.color,
            fontFamily: "'Space Grotesk', sans-serif",
            boxShadow: `0 0 20px ${config.border}`,
            letterSpacing: "0.08em",
          }}
        >
          <span>{config.emoji}</span>
          <span>{config.label}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: primary }}
          />
          <span className="text-xs text-white/40">
            {confidence}% confidence
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
