"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TrustScoreRing from "@/components/ui/TrustScoreRing";
import HighlightedReview from "@/components/HighlightedReview";
import ExplanationCards from "@/components/ExplanationCards";
import { AnalysisResult } from "@/lib/types";

// ── Mini animated bar ──────────────────────────────────────────────────────
function ScoreBar({
  label, value, max = 100, color, delay = 0, icon,
}: { label: string; value: number; max?: number; color: string; delay?: number; icon: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      style={{ marginBottom: "12px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
        <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontFamily: "'Space Grotesk',sans-serif" }}>
          {icon} {label}
        </span>
        <span style={{ fontSize: "0.78rem", fontWeight: 700, color, fontFamily: "'Space Grotesk',sans-serif" }}>
          {value}/{max}
        </span>
      </div>
      <div style={{ height: "8px", borderRadius: "4px", background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 0.9, ease: "easeOut", delay: delay + 0.2 }}
          style={{ height: "100%", borderRadius: "4px", background: color }}
        />
      </div>
    </motion.div>
  );
}

// ── Semi-circle sentiment gauge ──────────────────────────────────────────
function SentimentGauge({ score }: { score: number }) {
  // score: -100 to +100, center 0
  const normalized = Math.min(Math.max((score + 100) / 200, 0), 1); // 0..1
  const angleDeg = -90 + normalized * 180; // -90..+90 (left=neg, right=pos)
  const color = score > 20 ? "#10b981" : score < -20 ? "#f43f5e" : "#f59e0b";
  const label = score > 20 ? "Positive" : score < -20 ? "Negative" : "Neutral";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
      <svg viewBox="0 0 180 100" style={{ width: "180px" }}>
        {/* Background arcs */}
        <path d="M 15 92 A 75 75 0 0 1 90 17" fill="none" stroke="rgba(244,63,94,0.2)" strokeWidth="12" strokeLinecap="round" />
        <path d="M 90 17 A 75 75 0 0 1 165 92" fill="none" stroke="rgba(16,185,129,0.2)" strokeWidth="12" strokeLinecap="round" />
        {/* Center divider */}
        <line x1="90" y1="17" x2="90" y2="29" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        {/* Needle */}
        <motion.line
          x1="90" y1="92"
          x2="90" y2="26"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ rotate: -90 }}
          animate={{ rotate: angleDeg }}
          transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.4 }}
          style={{ originX: 0.5, originY: 1 }}
        />
        <circle cx="90" cy="92" r="6" fill={color} />
        <circle cx="90" cy="92" r="3" fill="white" />
        {/* Labels */}
        <text x="10" y="98" fill="rgba(244,63,94,0.6)" fontSize="9" fontFamily="Space Grotesk,sans-serif">−NEG</text>
        <text x="148" y="98" fill="rgba(16,185,129,0.6)" fontSize="9" fontFamily="Space Grotesk,sans-serif">+POS</text>
      </svg>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "1.15rem", fontWeight: 800, color, fontFamily: "'Space Grotesk',sans-serif" }}>{label}</div>
        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontFamily: "'Space Grotesk',sans-serif" }}>
          Score {score > 0 ? "+" : ""}{score}
        </div>
      </div>
    </div>
  );
}

// ── Donut chart for signal breakdown ────────────────────────────────────
function SignalDonut({
  phraseScore, sentimentScore, authenticityScore, patternScore,
}: { phraseScore: number; sentimentScore: number; authenticityScore: number; patternScore: number }) {
  const total = phraseScore + sentimentScore + authenticityScore + patternScore || 1;
  const segments = [
    { label: "Phrase Flags", value: phraseScore, color: "#f43f5e" },
    { label: "Sentiment", value: sentimentScore, color: "#818cf8" },
    { label: "Authenticity", value: authenticityScore, color: "#10b981" },
    { label: "Patterns", value: patternScore, color: "#f59e0b" },
  ];

  const cx = 60, cy = 60, r = 50, inner = 30;
  let cumAngle = -90;
  const slices = segments.map((s) => {
    const pct = s.value / total;
    const startAngle = cumAngle;
    const endAngle = cumAngle + pct * 360;
    cumAngle = endAngle;
    const toRad = (a: number) => (a * Math.PI) / 180;
    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const ix1 = cx + inner * Math.cos(toRad(startAngle));
    const iy1 = cy + inner * Math.sin(toRad(startAngle));
    const ix2 = cx + inner * Math.cos(toRad(endAngle));
    const iy2 = cy + inner * Math.sin(toRad(endAngle));
    const large = pct > 0.5 ? 1 : 0;
    const path = pct > 0.01
      ? `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${inner} ${inner} 0 ${large} 0 ${ix1} ${iy1} Z`
      : "";
    return { ...s, path, pct };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <svg viewBox="0 0 120 120" style={{ width: "120px", flexShrink: 0 }}>
        {slices.map((s, i) => (
          <motion.path key={i} d={s.path} fill={s.color}
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.85, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "backOut" }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            stroke="rgba(4,4,14,0.8)" strokeWidth="2"
          />
        ))}
        <circle cx={cx} cy={cy} r={inner - 2} fill="rgba(4,4,14,0.95)" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.55)", fontFamily: "'Space Grotesk',sans-serif" }}>{s.label}</span>
            <span style={{ fontSize: "0.73rem", fontWeight: 700, color: s.color, fontFamily: "'Space Grotesk',sans-serif", marginLeft: "auto" }}>
              {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Confidence meter ─────────────────────────────────────────────────────
function ConfidenceMeter({ confidence }: { confidence: number }) {
  const color = confidence > 80 ? "#10b981" : confidence > 60 ? "#f59e0b" : "#f43f5e";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontFamily: "'Space Grotesk',sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          AI Confidence
        </span>
        <span style={{ fontSize: "0.95rem", fontWeight: 800, color, fontFamily: "'Space Grotesk',sans-serif" }}>{confidence}%</span>
      </div>
      <div style={{ height: "10px", borderRadius: "5px", background: "rgba(255,255,255,0.06)", overflow: "hidden", position: "relative" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          style={{
            height: "100%", borderRadius: "5px",
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 12px ${color}66`,
          }}
        />
        {/* Shimmer */}
        <motion.div
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1, delay: 1 }}
          style={{
            position: "absolute", top: 0, left: 0,
            width: "40%", height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", fontFamily: "'Space Grotesk',sans-serif" }}>Low</span>
        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", fontFamily: "'Space Grotesk',sans-serif" }}>Medium</span>
        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", fontFamily: "'Space Grotesk',sans-serif" }}>High</span>
      </div>
    </div>
  );
}

// ── Flag severity chart ──────────────────────────────────────────────────
function FlagChart({ phrases }: { phrases: Array<{ phrase: string; reason: string; severity: string }> }) {
  const high = phrases.filter(p => p.severity === "high").length;
  const medium = phrases.filter(p => p.severity === "medium").length;
  const low = phrases.filter(p => !p.severity || p.severity === "low").length;
  const total = phrases.length || 1;
  const bars = [
    { label: "High Risk", count: high, color: "#f43f5e", max: total },
    { label: "Medium Risk", count: medium, color: "#f59e0b", max: total },
    { label: "Low Risk", count: low, color: "#fb923c", max: total },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {bars.map((b, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", fontFamily: "'Space Grotesk',sans-serif" }}>{b.label}</span>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: b.color, fontFamily: "'Space Grotesk',sans-serif" }}>{b.count}</span>
          </div>
          <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(b.count / b.max) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 + i * 0.1 }}
              style={{ height: "100%", borderRadius: "3px", background: b.color, opacity: 0.8 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Back to Home button ──────────────────────────────────────────────────
function BackHome() {
  return (
    <Link href="/" style={{ textDecoration: "none" }}>
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "8px 18px", borderRadius: "999px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          fontSize: "0.78rem", color: "rgba(255,255,255,0.5)",
          fontFamily: "'Space Grotesk',sans-serif",
          cursor: "pointer",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Home
      </motion.div>
    </Link>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function ResultsPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [originalReview, setOriginalReview] = useState<string>("");
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("truintel_result");
    const review = sessionStorage.getItem("truintel_review");
    if (!stored) { router.replace("/analyze"); return; }
    try {
      setResult(JSON.parse(stored));
      setOriginalReview(review || "");
      setLoaded(true);
    } catch {
      router.replace("/analyze");
    }
  }, [router]);

  if (!loaded || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-transparent"
          style={{ borderTopColor: "#6366f1", borderRightColor: "#8b5cf6" }}
        />
      </div>
    );
  }

  const sentimentScore = result.sentimentScore ?? 0;
  const sentimentLabel = sentimentScore > 20 ? "Positive" : sentimentScore < -20 ? "Negative" : "Neutral";
  const sentimentColor = sentimentScore > 20 ? "#10b981" : sentimentScore < -20 ? "#f43f5e" : "#f59e0b";

  const classColor = result.classification === "REAL" ? "#10b981"
    : result.classification === "FAKE" ? "#f43f5e" : "#f59e0b";
  const classGrad = result.classification === "REAL"
    ? "linear-gradient(135deg,rgba(16,185,129,0.12),rgba(16,185,129,0.04))"
    : result.classification === "FAKE"
    ? "linear-gradient(135deg,rgba(244,63,94,0.12),rgba(244,63,94,0.04))"
    : "linear-gradient(135deg,rgba(245,158,11,0.12),rgba(245,158,11,0.04))";
  const classBorder = result.classification === "REAL"
    ? "1px solid rgba(16,185,129,0.28)"
    : result.classification === "FAKE"
    ? "1px solid rgba(244,63,94,0.28)"
    : "1px solid rgba(245,158,11,0.28)";

  // Derived scores for signal breakdown
  const phraseScore = result.suspiciousPhrases.length * 8;
  const sentimentSignal = Math.max(0, Math.abs(sentimentScore) - 20);
  const authenticitySignal = Math.max(0, 80 - result.trustScore);
  const patternScore = Math.max(0, result.explanations?.length ? result.explanations.length * 10 : 20);

  return (
    <main className="page-content min-h-screen">
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "100px 24px 60px" }}>

        {/* ── Page Header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <BackHome />
            <Link href="/analyze" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontSize: "0.75rem", color: "rgba(255,255,255,0.3)",
              textDecoration: "none", fontFamily: "'Space Grotesk',sans-serif",
            }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Analyze another
            </Link>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/analyze" style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 22px", borderRadius: "12px",
              textDecoration: "none", fontSize: "0.85rem", fontWeight: 700, color: "white",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              boxShadow: "0 0 24px rgba(99,102,241,0.4)",
              fontFamily: "'Space Grotesk',sans-serif",
            }}>
              + Analyze Another
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Title ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{ textAlign: "center", marginBottom: "36px" }}
        >
          <h1 style={{
            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800,
            fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "white",
            marginBottom: "8px",
          }}>
            Analysis <span className="gradient-text">Results</span>
          </h1>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", fontFamily: "'Space Grotesk',sans-serif" }}>
            {result.reviewLength} words · {result.suspiciousPhrases.length} flag{result.suspiciousPhrases.length !== 1 ? "s" : ""} detected · {result.confidence}% confidence
          </p>
        </motion.div>

        {/* ── Verdict Banner ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            borderRadius: "20px", padding: "20px 28px",
            marginBottom: "28px",
            display: "flex", alignItems: "center", gap: "20px",
            background: classGrad, border: classBorder,
            backdropFilter: "blur(20px)",
          }}
        >
          <div style={{ fontSize: "2.8rem", flexShrink: 0 }}>
            {result.classification === "REAL" ? "✅" : result.classification === "FAKE" ? "🚨" : "⚠️"}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: classColor, marginBottom: "4px" }}>
              {result.classification === "REAL" ? "This review appears authentic"
                : result.classification === "FAKE" ? "This review is likely fabricated"
                : "This review has suspicious elements"}
            </h2>
            <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontFamily: "'Inter',sans-serif" }}>
              Trust Score <strong style={{ color: classColor }}>{result.trustScore}/100</strong> with{" "}
              <strong style={{ color: classColor }}>{result.confidence}%</strong> confidence.{" "}
              {result.classification === "FAKE"
                ? `${result.suspiciousPhrases.length} suspicious phrases detected across the review text.`
                : result.classification === "REAL"
                ? "Specific product details, balanced feedback, and natural language detected."
                : "Mixed signals — treat this review with caution."}
            </p>
          </div>
          {/* Score pill */}
          <div style={{
            flexShrink: 0, textAlign: "center",
            padding: "12px 20px", borderRadius: "14px",
            background: "rgba(0,0,0,0.3)", border: `1px solid ${classColor}33`,
          }}>
            <div style={{ fontSize: "2rem", fontWeight: 900, color: classColor, fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1 }}>
              {result.trustScore}
            </div>
            <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Trust Score
            </div>
          </div>
        </motion.div>

        {/* ── Main Grid ─────────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "24px" }} className="results-grid">

          {/* ─── LEFT COLUMN ────────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Trust Score Ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
              style={{
                borderRadius: "22px", padding: "24px", textAlign: "center",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
              }}
            >
              <TrustScoreRing
                score={result.trustScore}
                classification={result.classification}
                confidence={result.confidence}
              />
            </motion.div>

            {/* Confidence Meter */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                borderRadius: "18px", padding: "20px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <ConfidenceMeter confidence={result.confidence} />
            </motion.div>

            {/* Sentiment Gauge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              style={{
                borderRadius: "18px", padding: "20px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
              }}
            >
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Space Grotesk',sans-serif", alignSelf: "flex-start" }}>
                Sentiment Meter
              </p>
              <SentimentGauge score={sentimentScore} />
            </motion.div>

            {/* Score Breakdown bars */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                borderRadius: "18px", padding: "20px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Space Grotesk',sans-serif", marginBottom: "14px" }}>
                Score Breakdown
              </p>
              <ScoreBar label="Trust Score" value={result.trustScore} color={classColor} delay={0.35} icon="🎯" />
              <ScoreBar label="Authenticity" value={Math.max(0,100-authenticitySignal)} color="#10b981" delay={0.4} icon="✅" />
              <ScoreBar label="Language Natural." value={Math.max(0,100-phraseScore)} color="#818cf8" delay={0.45} icon="🔍" />
              <ScoreBar label="Sentiment Balance" value={Math.max(0,100-sentimentSignal)} color="#06b6d4" delay={0.5} icon="📈" />
            </motion.div>

            {/* Flag Severity chart */}
            {result.suspiciousPhrases.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                style={{
                  borderRadius: "18px", padding: "20px",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Space Grotesk',sans-serif", marginBottom: "14px" }}>
                  🚩 Flag Severity
                </p>
                <FlagChart phrases={result.suspiciousPhrases} />
              </motion.div>
            )}

            {/* Signal distribution donut */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                borderRadius: "18px", padding: "20px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Space Grotesk',sans-serif", marginBottom: "14px" }}>
                Signal Distribution
              </p>
              <SignalDonut
                phraseScore={phraseScore + 1}
                sentimentScore={sentimentSignal + 1}
                authenticityScore={authenticitySignal + 1}
                patternScore={patternScore + 1}
              />
            </motion.div>
          </div>

          {/* ─── RIGHT COLUMN ───────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Annotated Review */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              style={{
                borderRadius: "22px", padding: "24px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(24px)",
              }}
            >
              <HighlightedReview
                highlightedText={result.highlightedText}
                suspiciousPhrases={result.suspiciousPhrases}
              />
            </motion.div>

            {/* Explanation Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              style={{
                borderRadius: "22px", padding: "24px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(24px)",
              }}
            >
              <ExplanationCards explanations={result.explanations} />
            </motion.div>

            {/* Flagged Phrases — full list */}
            {result.suspiciousPhrases.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                style={{
                  borderRadius: "22px", padding: "24px",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <h3 style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Space Grotesk',sans-serif", marginBottom: "16px" }}>
                  🚩 All Flagged Phrases ({result.suspiciousPhrases.length})
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {result.suspiciousPhrases.map((phrase, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.04 }}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: "12px",
                        padding: "10px 14px", borderRadius: "10px",
                        background: phrase.severity === "high"
                          ? "rgba(244,63,94,0.06)"
                          : phrase.severity === "medium"
                          ? "rgba(245,158,11,0.06)"
                          : "rgba(251,146,60,0.06)",
                        border: `1px solid ${phrase.severity === "high" ? "rgba(244,63,94,0.15)" : phrase.severity === "medium" ? "rgba(245,158,11,0.15)" : "rgba(251,146,60,0.15)"}`,
                      }}
                    >
                      <span style={{
                        flexShrink: 0, marginTop: "3px",
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: phrase.severity === "high" ? "#f43f5e" : phrase.severity === "medium" ? "#f59e0b" : "#fb923c",
                        boxShadow: `0 0 6px ${phrase.severity === "high" ? "#f43f5e" : phrase.severity === "medium" ? "#f59e0b" : "#fb923c"}`,
                      }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.8)", fontStyle: "italic", fontFamily: "'Inter',sans-serif" }}>
                          &ldquo;{phrase.phrase}&rdquo;
                        </span>
                        <p style={{ fontSize: "0.73rem", color: "rgba(255,255,255,0.35)", marginTop: "3px", lineHeight: 1.5, fontFamily: "'Inter',sans-serif" }}>
                          {phrase.reason}
                        </p>
                      </div>
                      <span style={{
                        fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px",
                        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600,
                        textTransform: "uppercase", letterSpacing: "0.05em",
                        background: phrase.severity === "high" ? "rgba(244,63,94,0.15)" : phrase.severity === "medium" ? "rgba(245,158,11,0.15)" : "rgba(251,146,60,0.15)",
                        color: phrase.severity === "high" ? "#fb7185" : phrase.severity === "medium" ? "#fbbf24" : "#fb923c",
                      }}>
                        {phrase.severity || "low"}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive style */}
      <style>{`
        @media (max-width: 900px) {
          .results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
