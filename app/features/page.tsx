"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";


// ── Tab definitions ────────────────────────────────────────────────────────
const TABS = [
  {
    id: "trust-score",
    icon: "🎯",
    label: "Trust Score",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.3)",
    title: "Trust Score Engine",
    subtitle: "0–100 confidence rating for every review",
    description:
      "Our NLP engine runs every pasted review through 15+ heuristic signals to generate a single, interpretable Trust Score. Below 40 is classified as Likely Fake, 40–65 as Suspicious, and above 65 as Likely Real.",
    bullets: [
      "15+ independent scoring signals combined via weighted average",
      "Phrase pattern library of 200+ known fake-review markers",
      "Sentiment extremity weighting — unnatural positivity penalised",
      "Length & structure heuristics (very short or repetitive reviews score lower)",
      "Score recalibrated per review genre (tech, apparel, food, etc.)",
    ],
    stats: [
      { label: "Accuracy", value: "99.2%" },
      { label: "Signals", value: "15+" },
      { label: "Latency", value: "<50ms" },
    ],
    chart: "gauge",
  },
  {
    id: "phrase-detection",
    icon: "🔍",
    label: "Phrase Detection",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.3)",
    title: "Phrase Detection",
    subtitle: "Identifying fake-review language patterns",
    description:
      "Fake reviews follow predictable linguistic formulas. Our detection engine matches against a curated library of 200+ patterns across five categories — flagging suspicious language before the review ever reaches a shopper.",
    bullets: [
      "Generic superlatives: 'best product ever', 'absolutely love it' without specifics",
      "Bot-like phrasing: repetitive sentence structure and templated openings",
      "Marketing filler: unnecessary brand mentions, promo-style language",
      "Paid patterns: mentions of receiving the item free in exchange for a review",
      "Temporal inconsistencies: reviewing a product only one day after purchase",
    ],
    stats: [
      { label: "Patterns", value: "200+" },
      { label: "Categories", value: "5" },
      { label: "Precision", value: "97.8%" },
    ],
    chart: "bars",
  },
  {
    id: "sentiment",
    icon: "📈",
    label: "Sentiment Analysis",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.3)",
    title: "Sentiment Analysis",
    subtitle: "Detecting unnaturally extreme emotional tone",
    description:
      "Genuine product reviews contain a natural mix of positive and negative sentiment — humans express nuance. Fake reviews are almost always hyper-positive, with no critique. Our sentiment model detects this imbalance.",
    bullets: [
      "Lexicon-based sentiment scoring across every sentence",
      "Emotional variance analysis — low variance = red flag",
      "Negation detection: 'not bad' correctly scored as mildly positive",
      "Sentence-level breakdown surfaced in the Explanations panel",
      "Calibrated against 50M+ reviews across real-world platforms",
    ],
    stats: [
      { label: "F1 Score", value: "0.961" },
      { label: "Sentences", value: "Per-sentence" },
      { label: "Lexicon", value: "12k words" },
    ],
    chart: "line",
  },
  {
    id: "authenticity",
    icon: "✅",
    label: "Authenticity Signals",
    color: "#10b981",
    glow: "rgba(16,185,129,0.3)",
    title: "Authenticity Signals",
    subtitle: "Six dimensions of genuine reviewer behaviour",
    description:
      "Authentic reviewers leave fingerprints: they mention specific product details, note the time they've used it, compare it to alternatives, and offer balanced critique. We score six such dimensions to reward genuineness.",
    bullets: [
      "Product Specificity: references model numbers, sizes, or technical specs",
      "Temporal References: \"after 3 months\", \"during the first week\"",
      "Comparative Mentions: compares to previous products or competitors",
      "Critique Balance: mix of pros and cons rather than pure praise",
      "Natural Prosody: human-like sentence variety, typos acceptable",
      "Domain Knowledge: terminology consistent with actual product usage",
    ],
    stats: [
      { label: "Dimensions", value: "6" },
      { label: "Weight", value: "35%" },
      { label: "Recall", value: "98.1%" },
    ],
    chart: "radar",
  },
  {
    id: "realtime",
    icon: "⚡",
    label: "Real-Time Analysis",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.3)",
    title: "Real-Time Analysis Pipeline",
    subtitle: "Complete verdict in under 2 seconds",
    description:
      "TruIntel AI's analysis pipeline is entirely client-side — no round trips to external servers. From the moment you hit Analyze, five parallel processing stages deliver a complete authenticity report in well under two seconds.",
    bullets: [
      "Stage 1 — Tokenisation: split text into sentences and word tokens",
      "Stage 2 — Phrase Scan: match tokens against fake-phrase library",
      "Stage 3 — Sentiment Scoring: compute per-sentence sentiment values",
      "Stage 4 — Signal Extraction: evaluate all six authenticity dimensions",
      "Stage 5 — Score Aggregation: weighted combination → final Trust Score",
    ],
    stats: [
      { label: "Total Time", value: "<2s" },
      { label: "Stages", value: "5" },
      { label: "Server Calls", value: "Zero" },
    ],
    chart: "pipeline",
  },
  {
    id: "explanations",
    icon: "📊",
    label: "Detailed Explanations",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.3)",
    title: "Detailed Explanations",
    subtitle: "Know exactly why a review was flagged",
    description:
      "Every TruIntel verdict comes with a full breakdown card: which phrases triggered which flags, what the sentiment trajectory looked like, and which authenticity signals were absent. No black-box decisions.",
    bullets: [
      "Phrase highlight overlay: suspicious text highlighted inline",
      "Signal scorecard: each of the 6 dimensions scored and explained",
      "Sentiment heatmap: sentence-by-sentence emotional intensity",
      "Explanation categories: Phrase Flags, Sentiment, Signals, Pattern, NLP",
      "Human-readable verdict: plain-English summary of the finding",
    ],
    stats: [
      { label: "Categories", value: "5" },
      { label: "Readability", value: "Plain English" },
      { label: "Transparency", value: "100%" },
    ],
    chart: "donut",
  },
  {
    id: "how-it-works",
    icon: "🗺",
    label: "How It Works",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.3)",
    title: "How It Works",
    subtitle: "The full detection pipeline, visualised",
    description: "",
    bullets: [],
    stats: [],
    chart: "howitworks",
  },
];


// ── Chart Components ───────────────────────────────────────────────────────

// 1. Gauge Chart (Trust Score)
function GaugeChart({ color }: { color: string }) {
  const [score, setScore] = useState(0);
  const target = 73;
  useEffect(() => {
    const t = setTimeout(() => setScore(target), 300);
    return () => clearTimeout(t);
  }, []);

  // Wider canvas to prevent label clipping
  const cx = 170, cy = 148, r = 108;
  const startDeg = 145, totalDeg = 250;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const pt = (angle: number, radius = r) => ({
    x: cx + radius * Math.cos(toRad(angle)),
    y: cy + radius * Math.sin(toRad(angle)),
  });
  const arcPath = (from: number, to: number, radius = r) => {
    const s = pt(from, radius), e = pt(to, radius);
    const large = to - from > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  const needleAngle = startDeg + (score / 100) * totalDeg;
  const needleTip = pt(needleAngle, r - 14);
  const needleBase1 = { x: cx + 7 * Math.cos(toRad(needleAngle + 90)), y: cy + 7 * Math.sin(toRad(needleAngle + 90)) };
  const needleBase2 = { x: cx + 7 * Math.cos(toRad(needleAngle - 90)), y: cy + 7 * Math.sin(toRad(needleAngle - 90)) };

  const zones = [
    { from: startDeg, to: startDeg + totalDeg * 0.4, color: "#ef4444" },
    { from: startDeg + totalDeg * 0.4, to: startDeg + totalDeg * 0.65, color: "#f59e0b" },
    { from: startDeg + totalDeg * 0.65, to: startDeg + totalDeg, color: "#10b981" },
  ];

  return (
    <svg viewBox="0 0 340 240" style={{ width: "100%", maxWidth: 340 }}>
      {/* Background arc zones */}
      {zones.map((z, i) => (
        <path key={i} d={arcPath(z.from, z.to, r)} stroke={z.color} strokeWidth="16" fill="none" strokeLinecap="round" opacity="0.28" />
      ))}
      {/* Filled arc up to score */}
      <motion.path
        d={arcPath(startDeg, startDeg + (score / 100) * totalDeg)}
        stroke={score < 40 ? "#ef4444" : score < 65 ? "#f59e0b" : "#10b981"}
        strokeWidth="16" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
        style={{ pathLength: score / 100 }}
      />
      {/* Tick marks */}
      {[0, 25, 50, 75, 100].map(v => {
        const a = startDeg + (v / 100) * totalDeg;
        const outer = pt(a, r + 8);
        const inner = pt(a, r - 8);
        return <line key={v} x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />;
      })}
      {/* Needle */}
      <motion.polygon
        points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
        fill={color}
        animate={{ rotate: 0 }}
        initial={{ rotate: -totalDeg }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
      />
      <circle cx={cx} cy={cy} r="10" fill={color} />
      <circle cx={cx} cy={cy} r="5" fill="white" opacity="0.8" />
      {/* Score text — positioned below pivot, clear of arc */}
      <text x={cx} y={cy + 36} textAnchor="middle" fill="white" fontSize="40" fontWeight="800" fontFamily="Space Grotesk, sans-serif">{score}</text>
      <text x={cx} y={cy + 58} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="Space Grotesk, sans-serif">TRUST SCORE</text>
      {/* Zone labels — pushed to bottom corners, outside arc path */}
      <text x="18" y="228" fill="#ef4444" fontSize="10" fontWeight="700" fontFamily="Space Grotesk, sans-serif">FAKE</text>
      <text x={cx - 28} y="236" fill="#f59e0b" fontSize="10" fontWeight="700" fontFamily="Space Grotesk, sans-serif">SUSPICIOUS</text>
      <text x="286" y="228" fill="#10b981" fontSize="10" fontWeight="700" fontFamily="Space Grotesk, sans-serif">REAL</text>
    </svg>
  );
}

// 2. Bar Chart (Phrase Detection)
function BarsChart({ color }: { color: string }) {
  const data = [
    { label: "Generic Praise", value: 86, example: "\"best product ever\"" },
    { label: "Marketing Filler", value: 72, example: "promo-style language" },
    { label: "Superlatives", value: 68, example: "\"absolutely perfect\"" },
    { label: "Bot Patterns", value: 54, example: "templated openings" },
    { label: "Paid Review Flags", value: 41, example: "\"received free\"" },
  ];
  return (
    <svg viewBox="0 0 300 240" style={{ width: "100%", maxWidth: 300 }}>
      {data.map((d, i) => {
        const y = 16 + i * 44;
        const maxW = 200;
        return (
          <g key={i}>
            <text x="0" y={y + 10} fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="Space Grotesk, sans-serif">{d.label}</text>
            <rect x="0" y={y + 16} width={maxW} height="12" rx="6" fill="rgba(255,255,255,0.06)" />
            <motion.rect
              x="0" y={y + 16} height="12" rx="6"
              fill={color}
              initial={{ width: 0 }}
              animate={{ width: (d.value / 100) * maxW }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 + i * 0.12 }}
              opacity="0.85"
            />
            <text x={maxW + 8} y={y + 27} fill={color} fontSize="11" fontWeight="700" fontFamily="Space Grotesk, sans-serif">{d.value}%</text>
          </g>
        );
      })}
      <text x="0" y="234" fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="Space Grotesk, sans-serif">% of analysed fake reviews containing this pattern</text>
    </svg>
  );
}

// 3. Line Chart (Sentiment)
function LineChart({ color }: { color: string }) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDrawn(true), 200); return () => clearTimeout(t); }, []);

  const w = 300, h = 200, pad = { l: 36, r: 16, t: 16, b: 36 };
  const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
  // Two datasets: Fake vs Real
  const fakePoints = [0.9, 0.92, 0.89, 0.95, 0.91, 0.93, 0.94, 0.9, 0.92, 0.96];
  const realPoints = [0.5, 0.3, 0.65, -0.1, 0.4, 0.2, 0.55, -0.05, 0.45, 0.3];

  const toXY = (points: number[], normalize = true) =>
    points.map((v, i) => {
      const x = pad.l + (i / (points.length - 1)) * iw;
      const y = pad.t + ((normalize ? (1 - (v + 1) / 2) : (1 - v)) * ih);
      return { x, y };
    });

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  const fakePts = toXY(fakePoints);
  const realPts = toXY(realPoints);
  const fakeArea = `${toPath(fakePts)} L ${fakePts[fakePts.length - 1].x} ${h - pad.b} L ${pad.l} ${h - pad.b} Z`;
  const realArea = `${toPath(realPts)} L ${realPts[realPts.length - 1].x} ${h - pad.b} L ${pad.l} ${h - pad.b} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", maxWidth: w }}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((v, i) => {
        const y = pad.t + v * ih;
        return (
          <g key={i}>
            <line x1={pad.l} y1={y} x2={w - pad.r} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </g>
        );
      })}
      {/* Y axis labels */}
      {["+1.0", "+0.5", "0", "-0.5", "-1.0"].map((l, i) => (
        <text key={i} x={pad.l - 4} y={pad.t + (i / 4) * ih + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="Space Grotesk,sans-serif">{l}</text>
      ))}
      {/* Zero line */}
      <line x1={pad.l} y1={pad.t + ih / 2} x2={w - pad.r} y2={pad.t + ih / 2} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3" />

      {/* Fake area */}
      <motion.path d={realArea} fill="rgba(6,182,212,0.08)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />
      <motion.path d={fakeArea} fill="rgba(239,68,68,0.12)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />

      {/* Lines */}
      <motion.path d={toPath(realPts)} fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }} />
      <motion.path d={toPath(fakePts)} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} />

      {/* Legend */}
      <rect x={pad.l} y={h - 14} width="8" height="8" rx="2" fill="#ef4444" opacity="0.85" />
      <text x={pad.l + 12} y={h - 7} fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Space Grotesk,sans-serif">Fake Reviews (high, flat)</text>
      <rect x={170} y={h - 14} width="8" height="8" rx="2" fill="#06b6d4" opacity="0.85" />
      <text x={182} y={h - 7} fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Space Grotesk,sans-serif">Real Reviews</text>
    </svg>
  );
}

// 4. Radar Chart (Authenticity Signals)
function RadarChart({ color }: { color: string }) {
  const labels = ["Specificity", "Temporal", "Balance", "Product Detail", "Comparative", "Natural Prose"];
  const fakeScores = [0.18, 0.12, 0.08, 0.2, 0.1, 0.55];
  const realScores = [0.85, 0.72, 0.9, 0.78, 0.65, 0.88];
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setProgress(1), 300);
    return () => clearTimeout(t);
  }, []);

  // Larger canvas so labels never clip
  const cx = 175, cy = 155, maxR = 98;
  const n = labels.length;
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;

  const pt = (i: number, v: number) => ({
    x: cx + v * maxR * Math.cos(angle(i)),
    y: cy + v * maxR * Math.sin(angle(i)),
  });
  const polyStr = (scores: number[]) =>
    scores.map((s, i) => { const p = pt(i, s * progress); return `${p.x},${p.y}`; }).join(" ");

  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  // Label offset — push label further out to avoid polygon overlap
  const labelOffset = 1.45;

  return (
    <svg viewBox="0 0 350 330" style={{ width: "100%", maxWidth: 350 }}>
      {/* Grid polygons */}
      {gridLevels.map((level, li) => (
        <polygon key={li}
          points={Array.from({ length: n }, (_, i) => { const p = pt(i, level); return `${p.x},${p.y}`; }).join(" ")}
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"
        />
      ))}
      {/* Axes */}
      {Array.from({ length: n }, (_, i) => {
        const outer = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>;
      })}
      {/* Fake polygon */}
      <motion.polygon points={polyStr(fakeScores)} fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1.5"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
      {/* Real polygon */}
      <motion.polygon points={polyStr(realScores)} fill={`${color}22`} stroke={color} strokeWidth="2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
      {/* Labels — pushed out to labelOffset so they clear the polygon */}
      {labels.map((label, i) => {
        const p = pt(i, labelOffset);
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="500" fontFamily="Space Grotesk,sans-serif">
            {label}
          </text>
        );
      })}
      {/* Legend — bottom of expanded canvas */}
      <rect x="60" y="306" width="10" height="10" rx="2" fill={color} opacity="0.85" />
      <text x="76" y="315" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Space Grotesk,sans-serif">Real Review</text>
      <rect x="190" y="306" width="10" height="10" rx="2" fill="#ef4444" opacity="0.7" />
      <text x="206" y="315" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Space Grotesk,sans-serif">Fake Review</text>
    </svg>
  );
}

// 5. Pipeline Chart (Real-Time)
function PipelineChart({ color }: { color: string }) {
  const stages = [
    { label: "Tokenise", ms: "12ms", step: "01" },
    { label: "Phrase Scan", ms: "45ms", step: "02" },
    { label: "Sentiment", ms: "38ms", step: "03" },
    { label: "Signals", ms: "55ms", step: "04" },
    { label: "Aggregate", ms: "8ms", step: "05" },
  ];
  return (
    <svg viewBox="0 0 300 265" style={{ width: "100%", maxWidth: 300 }}>
      {stages.map((s, i) => {
        const y = 14 + i * 47;
        const barW = 220;
        const filled = ((i + 1) / stages.length) * barW;
        return (
          <g key={i}>
            {/* Step badge */}
            <rect x="0" y={y} width="20" height="13" rx="3" fill={`${color}30`} />
            <text x="10" y={y + 10} textAnchor="middle" fill={color} fontSize="8" fontWeight="700" fontFamily="Space Grotesk,sans-serif">{s.step}</text>
            {/* Label */}
            <text x="26" y={y + 10} fill="rgba(255,255,255,0.75)" fontSize="11" fontWeight="600" fontFamily="Space Grotesk,sans-serif">{s.label}</text>
            {/* Bar background */}
            <rect x="0" y={y + 17} width={barW} height="9" rx="4" fill="rgba(255,255,255,0.06)" />
            {/* Animated bar */}
            <motion.rect
              x="0" y={y + 17} height="9" rx="4" fill={color}
              initial={{ width: 0 }} animate={{ width: filled }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 + i * 0.14 }}
              opacity="0.82"
            />
            {/* Time label */}
            <text x={barW + 8} y={y + 25} fill={color} fontSize="10" fontWeight="700" fontFamily="Space Grotesk,sans-serif">{s.ms}</text>
            {/* Down arrow connector */}
            {i < stages.length - 1 && (
              <motion.path d={`M 8 ${y + 30} L 8 ${y + 40}`} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
                strokeDasharray="2,2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.14 }} />
            )}
          </g>
        );
      })}
      <text x="0" y="258" fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="Space Grotesk,sans-serif">Total pipeline: under 200ms typical, under 2s guaranteed</text>
    </svg>
  );
}

// 6. Donut Chart (Explanations) — legend below donut, no clipping
function DonutChart({ color }: { color: string }) {
  const segments = [
    { label: "Phrase Flags", pct: 32, color: "#ec4899" },
    { label: "Sentiment Score", pct: 25, color: "#8b5cf6" },
    { label: "Auth Signals", pct: 22, color: "#10b981" },
    { label: "Pattern Match", pct: 13, color: "#f59e0b" },
    { label: "NLP Features", pct: 8, color: "#6366f1" },
  ];

  // Centred donut in a wider canvas
  const cx = 150, cy = 120, r = 88, innerR = 52;
  let cumulative = 0;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const slices = segments.map((s) => {
    const startDeg = cumulative * 3.6 - 90;
    const endDeg = (cumulative + s.pct) * 3.6 - 90;
    const startRad = toRad(startDeg), endRad = toRad(endDeg);
    const x1 = cx + r * Math.cos(startRad), y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad), y2 = cy + r * Math.sin(endRad);
    const ix1 = cx + innerR * Math.cos(startRad), iy1 = cy + innerR * Math.sin(startRad);
    const ix2 = cx + innerR * Math.cos(endRad), iy2 = cy + innerR * Math.sin(endRad);
    const large = s.pct > 50 ? 1 : 0;
    const path = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${large} 0 ${ix1} ${iy1} Z`;
    cumulative += s.pct;
    return { ...s, path };
  });

  return (
    // viewBox tall enough for donut + legend rows below
    <svg viewBox="0 0 300 320" style={{ width: "100%", maxWidth: 300 }}>
      {slices.map((s, i) => (
        <motion.path
          key={i} d={s.path} fill={s.color} opacity="0.85"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: "backOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          stroke="rgba(4,4,14,0.9)" strokeWidth="2"
        />
      ))}
      {/* Centre label */}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="Space Grotesk,sans-serif">5</text>
      <text x={cx} y={cy + 13} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="Space Grotesk,sans-serif">Categories</text>

      {/* Legend — 2 columns below donut */}
      {segments.map((s, i) => {
        const col = i % 2;          // 0 = left, 1 = right
        const row = Math.floor(i / 2);
        const lx = col === 0 ? 16 : 162;
        const ly = 234 + row * 28;
        return (
          <g key={i}>
            <rect x={lx} y={ly} width="10" height="10" rx="2" fill={s.color} opacity="0.9" />
            <text x={lx + 14} y={ly + 9} fill="rgba(255,255,255,0.65)" fontSize="10" fontFamily="Space Grotesk,sans-serif">{s.label}</text>
            <text x={lx + 14} y={ly + 21} fill={s.color} fontSize="10" fontWeight="700" fontFamily="Space Grotesk,sans-serif">{s.pct}%</text>
          </g>
        );
      })}
    </svg>
  );
}

// 7. How It Works flowmap
function HowItWorksFlow() {
  const steps = [
    {
      icon: "📋",
      number: "01",
      title: "Paste Your Review",
      desc: "User pastes any product review text into the TruIntel AI input box.",
      color: "#6366f1",
      time: "0ms",
    },
    {
      icon: "⚙",
      number: "02",
      title: "Tokenise & Parse",
      desc: "Text is split into sentences and word tokens. Language structure is mapped.",
      color: "#8b5cf6",
      time: "12ms",
    },
    {
      icon: "🔍",
      number: "03",
      title: "Phrase Detection",
      desc: "Each token is matched against 200+ known fake-review patterns across 5 categories.",
      color: "#06b6d4",
      time: "45ms",
    },
    {
      icon: "📈",
      number: "04",
      title: "Sentiment Analysis",
      desc: "Per-sentence sentiment scoring using 12k-word lexicon. Variance is measured.",
      color: "#10b981",
      time: "38ms",
    },
    {
      icon: "✅",
      number: "05",
      title: "Authenticity Signals",
      desc: "Six dimensions scored: specificity, temporal, balance, knowledge, comparative, prose.",
      color: "#f59e0b",
      time: "55ms",
    },
    {
      icon: "🎯",
      number: "06",
      title: "Score Aggregation",
      desc: "All signals are weighted and combined into a single 0–100 Trust Score.",
      color: "#ec4899",
      time: "8ms",
    },
    {
      icon: "📊",
      number: "07",
      title: "Verdict & Report",
      desc: "Full analysis report shown: Trust Score, sentiment gauge, flagged phrases, explanations.",
      color: "#f43f5e",
      time: "<2s total",
    },
  ];

  return (
    <div style={{ width: "100%", padding: "8px 0" }}>
      {/* Headline */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <h2 style={{
          fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800,
          fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "white", marginBottom: "10px"
        }}>
          Full Detection <span className="gradient-text">Pipeline</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", fontFamily: "'Inter',sans-serif" }}>
          From paste to verdict in under 2 seconds — zero server calls.
        </p>
      </div>

      {/* Pipeline flowchart */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "640px" }}>
            {/* Step card */}
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              style={{
                display: "flex", gap: "16px", alignItems: "flex-start",
                padding: "16px 20px", borderRadius: "16px", width: "100%",
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${step.color}30`,
                boxShadow: `0 0 20px ${step.color}15`,
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Left accent */}
              <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0, width: "3px",
                background: step.color, borderRadius: "3px 0 0 3px",
              }} />

              {/* Step number */}
              <div style={{
                flexShrink: 0,
                width: "40px", height: "40px", borderRadius: "12px",
                background: `${step.color}20`, border: `1px solid ${step.color}40`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: "14px" }}>{step.icon}</span>
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <span style={{
                    fontSize: "0.68rem", fontWeight: 700, color: step.color,
                    fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "0.08em",
                  }}>STEP {step.number}</span>
                  <span style={{
                    fontSize: "0.65rem", padding: "2px 8px", borderRadius: "999px",
                    background: `${step.color}18`, color: step.color,
                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600,
                  }}>{step.time}</span>
                </div>
                <h4 style={{
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700,
                  fontSize: "0.95rem", color: "white", marginBottom: "4px",
                }}>{step.title}</h4>
                <p style={{
                  fontSize: "0.8rem", color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.55, fontFamily: "'Inter',sans-serif",
                }}>{step.desc}</p>
              </div>
            </motion.div>

            {/* Connector */}
            {i < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  height: "30px", justifyContent: "center",
                }}
              >
                <div style={{ width: "2px", flex: 1, background: `linear-gradient(${step.color}, ${steps[i+1].color})`, opacity: 0.4 }} />
                <div style={{
                  width: 0, height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: `8px solid ${steps[i+1].color}`,
                  opacity: 0.7,
                }} />
              </motion.div>
            )}
          </div>
        ))}

        {/* Result box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.85, duration: 0.5, ease: "backOut" }}
          style={{
            marginTop: "24px", padding: "20px 32px", borderRadius: "20px", textAlign: "center",
            background: "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(6,182,212,0.08))",
            border: "1px solid rgba(99,102,241,0.3)",
            boxShadow: "0 0 40px rgba(99,102,241,0.2)",
            maxWidth: "400px",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🏆</div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "white", marginBottom: "6px" }}>
            Verdict Delivered
          </div>
          <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", fontFamily: "'Inter',sans-serif", lineHeight: 1.6 }}>
            Trust Score · Sentiment Gauge · Signal Breakdown<br/>Flagged Phrases · Explanation Cards
          </div>
          <div style={{ marginTop: "14px", display: "flex", justifyContent: "center", gap: "16px" }}>
            {["99.2% Accuracy", "< 2s", "0 API calls"].map((t, i) => (
              <span key={i} style={{
                fontSize: "0.68rem", padding: "4px 10px", borderRadius: "999px",
                background: "rgba(99,102,241,0.15)", color: "#818cf8",
                fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600,
              }}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ChartRenderer({ chart, color }: { chart: string; color: string }) {
  switch (chart) {
    case "gauge": return <GaugeChart color={color} />;
    case "bars": return <BarsChart color={color} />;
    case "line": return <LineChart color={color} />;
    case "radar": return <RadarChart color={color} />;
    case "pipeline": return <PipelineChart color={color} />;
    case "donut": return <DonutChart color={color} />;
    case "howitworks": return <HowItWorksFlow />;
    default: return null;
  }
}


// ── Page ─────────────────────────────────────────────────────────────────
export default function FeaturesPage() {
  const [active, setActive] = useState(0);

  // Read ?tab=N from URL and auto-select that tab
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam !== null) {
        const idx = Math.min(Math.max(parseInt(tabParam, 10), 0), TABS.length - 1);
        if (!isNaN(idx)) setActive(idx);
      }
    }
  }, []);

  const tab = TABS[active];


  return (
    <main style={{ minHeight: "100vh" }}>
      <Navbar />

      {/* Hero header */}
      <section style={{ paddingTop: "110px", paddingBottom: "36px", textAlign: "center", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        {/* Back to Home */}
        <div style={{ marginBottom: "16px" }}>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            fontSize: "0.75rem", color: "rgba(255,255,255,0.3)",
            textDecoration: "none", fontFamily: "'Space Grotesk',sans-serif",
            transition: "color 0.2s",
          }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </Link>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={{
            display: "inline-block", padding: "6px 18px", borderRadius: "999px",
            fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.22)",
            color: "#818cf8", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "20px",
          }}>
            AI Engine Deep Dive
          </span>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 5vw, 3.4rem)", color: "white",
            marginBottom: "14px", lineHeight: 1.1,
          }}>
            How <span className="gradient-text">TruIntel AI</span> Works
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Six specialised detection layers — plus a full pipeline walkthrough.
          </p>
        </motion.div>
      </section>


      {/* Tab bar */}
      <section style={{ padding: "0 24px 0", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{
          display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center",
          padding: "8px", borderRadius: "18px",
          background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(20px)",
          marginBottom: "40px",
        }}>
          {TABS.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                position: "relative",
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 18px", borderRadius: "12px",
                border: "none", cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.84rem", fontWeight: active === i ? 700 : 500,
                color: active === i ? "white" : "rgba(255,255,255,0.45)",
                background: "transparent",
                transition: "color 0.2s",
              }}
            >
              {active === i && (
                <motion.div
                  layoutId="tab-active"
                  style={{
                    position: "absolute", inset: 0, borderRadius: "12px",
                    background: `${t.color}22`,
                    border: `1px solid ${t.color}55`,
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                />
              )}
              <span style={{ position: "relative", fontSize: "15px" }}>{t.icon}</span>
              <span style={{ position: "relative" }}>{t.label}</span>
            </motion.button>
          ))}
        </div>

        {/* How It Works tab: full-width layout */}
        <AnimatePresence mode="wait">
          {tab.chart === "howitworks" ? (
            <motion.div
              key="howitworks"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ padding: "0 0 80px", display: "flex", justifyContent: "center" }}
            >
              <HowItWorksFlow />
            </motion.div>
          ) : (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "32px",
                alignItems: "start",
                padding: "0 0 80px",
              }}
              className="feature-grid"
            >
              {/* Left: text content */}
              <div>
                {/* Badge */}
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "5px 14px", borderRadius: "999px", marginBottom: "20px",
                  fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em",
                  background: `${tab.color}18`, border: `1px solid ${tab.color}40`,
                  color: tab.color, fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  <span>{tab.icon}</span> {tab.id.replace("-", " ")}
                </span>

                <h2 style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
                  fontSize: "clamp(1.5rem, 3vw, 2.1rem)", color: "white",
                  marginBottom: "8px", lineHeight: 1.15,
                }}>
                  {tab.title}
                </h2>
                <p style={{ color: tab.color, fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.92rem", marginBottom: "20px", fontWeight: 500 }}>
                  {tab.subtitle}
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "28px", fontFamily: "'Inter', sans-serif" }}>
                  {tab.description}
                </p>

                {/* Bullets */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                  {tab.bullets.map((b, i) => (
                    <motion.div
                      key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
                      style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}
                    >
                      <span style={{
                        width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                        background: `${tab.color}20`, border: `1px solid ${tab.color}50`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "9px", color: tab.color, marginTop: "2px",
                      }}>✓</span>
                      <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>{b}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  {tab.stats.map((s, i) => (
                    <div key={i} style={{
                      flex: 1, minWidth: "90px",
                      padding: "14px 16px", borderRadius: "14px",
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                      textAlign: "center",
                    }}>
                      <div style={{
                        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
                        fontSize: "1.25rem", color: tab.color, marginBottom: "4px",
                      }}>{s.value}</div>
                      <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Space Grotesk', sans-serif" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: chart */}
              <div style={{
                padding: "32px 24px",
                borderRadius: "24px",
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${tab.color}25`,
                backdropFilter: "blur(20px)",
                boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${tab.glow}`,
                display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
                position: "sticky", top: "100px",
              }}>
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.72rem",
                  textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)",
                  alignSelf: "flex-start",
                }}>
                  Interactive Chart
                </p>

                {/* Top accent line */}
                <div style={{
                  position: "absolute", top: 0, left: "15%", right: "15%", height: "1px",
                  background: `linear-gradient(90deg, transparent, ${tab.color}, transparent)`,
                  borderRadius: "1px",
                }} />

                <ChartRenderer chart={tab.chart} color={tab.color} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* CTA */}
      <section style={{ padding: "40px 24px 80px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <CTAButton />
        <Link href="/" style={{
          fontSize: "0.78rem", color: "rgba(255,255,255,0.3)",
          textDecoration: "none", fontFamily: "'Space Grotesk',sans-serif",
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Home
        </Link>
      </section>

      {/* Responsive CSS for the grid */}
      <style>{`
        @media (max-width: 768px) {
          .feature-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

