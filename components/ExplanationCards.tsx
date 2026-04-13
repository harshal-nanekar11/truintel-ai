"use client";

import { motion } from "framer-motion";
import { Explanation } from "@/lib/types";

interface ExplanationCardsProps {
  explanations: Explanation[];
}

const impactStyles = {
  negative: {
    bg: "rgba(244,63,94,0.08)",
    border: "rgba(244,63,94,0.2)",
    dot: "#f43f5e",
    tag: "Risk Factor",
    tagColor: "rgba(244,63,94,0.15)",
    tagText: "#f43f5e",
  },
  positive: {
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
    dot: "#10b981",
    tag: "Positive Signal",
    tagColor: "rgba(16,185,129,0.15)",
    tagText: "#10b981",
  },
  neutral: {
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
    dot: "#6366f1",
    tag: "Observation",
    tagColor: "rgba(99,102,241,0.15)",
    tagText: "#818cf8",
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ExplanationCards({ explanations }: ExplanationCardsProps) {
  if (explanations.length === 0) {
    return (
      <div className="text-center py-8 text-white/30 text-sm">
        No specific findings to report.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
          style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
        >
          📊
        </div>
        <h3
          className="text-sm font-semibold text-white/70 uppercase tracking-wider"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Analysis Breakdown
        </h3>
        <span
          className="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.25)",
            color: "#818cf8",
          }}
        >
          {explanations.length} finding{explanations.length !== 1 ? "s" : ""}
        </span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-3"
      >
        {explanations.map((explanation, index) => {
          const style = impactStyles[explanation.impact];

          return (
            <motion.div
              key={index}
              id={`explanation-card-${index}`}
              variants={cardVariants}
              whileHover={{
                x: 4,
                transition: { duration: 0.15 },
              }}
              className="flex items-start gap-4 p-4 rounded-xl cursor-default group"
              style={{
                background: style.bg,
                border: `1px solid ${style.border}`,
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 mt-0.5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {explanation.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h4
                    className="text-sm font-semibold text-white/90"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {explanation.category}
                  </h4>
                  <span
                    className="flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      background: style.tagColor,
                      color: style.tagText,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {style.tag}
                  </span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">
                  {explanation.description}
                </p>
              </div>

              {/* Left accent line */}
              <div
                className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: style.dot }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
