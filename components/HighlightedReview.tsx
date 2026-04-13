"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SuspiciousPhrase } from "@/lib/types";
import { useState } from "react";

interface HighlightedReviewProps {
  highlightedText: string;
  suspiciousPhrases: SuspiciousPhrase[];
}

function parseParts(text: string): { text: string; isHighlight: boolean }[] {
  const parts: { text: string; isHighlight: boolean }[] = [];
  const regex = /__HIGHLIGHT__(.+?)__END__/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), isHighlight: false });
    }
    parts.push({ text: match[1], isHighlight: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isHighlight: false });
  }

  return parts;
}

export default function HighlightedReview({ highlightedText, suspiciousPhrases }: HighlightedReviewProps) {
  const [tooltip, setTooltip] = useState<{ phrase: string; reason: string; severity: string } | null>(null);
  const parts = parseParts(highlightedText);

  const getPhrase = (text: string) =>
    suspiciousPhrases.find(
      (p) => p.phrase.toLowerCase() === text.toLowerCase()
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative"
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
          style={{ background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.25)" }}
        >
          🔍
        </div>
        <h3
          className="text-sm font-semibold text-white/70 uppercase tracking-wider"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Annotated Review
        </h3>
        {suspiciousPhrases.length > 0 && (
          <span
            className="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(244,63,94,0.12)",
              border: "1px solid rgba(244,63,94,0.25)",
              color: "#f43f5e",
            }}
          >
            {suspiciousPhrases.length} flag{suspiciousPhrases.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div
        className="relative p-6 rounded-2xl leading-relaxed text-sm"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          color: "rgba(255,255,255,0.75)",
          lineHeight: "1.9",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {parts.map((part, i) => {
          if (!part.isHighlight) {
            return <span key={i}>{part.text}</span>;
          }

          const phrase = getPhrase(part.text);
          const severityColor =
            phrase?.severity === "high" ? "#f43f5e"
            : phrase?.severity === "medium" ? "#f59e0b"
            : "#fb923c";

          return (
            <span
              key={i}
              className="relative inline cursor-pointer"
              style={{
                background: `${severityColor}20`,
                borderBottom: `2px solid ${severityColor}80`,
                borderRadius: "3px",
                padding: "1px 3px",
                color: "rgba(255,255,255,0.95)",
                transition: "all 0.15s",
              }}
              onMouseEnter={() =>
                phrase && setTooltip({
                  phrase: part.text,
                  reason: phrase.reason,
                  severity: phrase.severity,
                })
              }
              onMouseLeave={() => setTooltip(null)}
            >
              {part.text}
              <AnimatePresence>
                {tooltip?.phrase.toLowerCase() === part.text.toLowerCase() && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-1/2 mb-2 z-50 pointer-events-none"
                    style={{ transform: "translateX(-50%)" }}
                  >
                    <div
                      className="px-3 py-2 rounded-xl text-xs whitespace-nowrap max-w-48"
                      style={{
                        background: "rgba(10,10,20,0.95)",
                        border: `1px solid ${severityColor}40`,
                        backdropFilter: "blur(16px)",
                        boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 12px ${severityColor}20`,
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: severityColor }}
                        />
                        <span
                          className="font-semibold text-white/90 capitalize"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {phrase?.severity} severity
                        </span>
                      </div>
                      <p className="text-white/55 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", whiteSpace: "normal", maxWidth: "190px" }}>
                        {tooltip.reason}
                      </p>
                    </div>
                    {/* Arrow */}
                    <div
                      className="absolute left-1/2 top-full w-2 h-2"
                      style={{
                        transform: "translateX(-50%) rotate(45deg) translateY(-50%)",
                        background: "rgba(10,10,20,0.95)",
                        border: `0 0 1px 1px solid ${severityColor}40`,
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          );
        })}

        {suspiciousPhrases.length === 0 && (
          <div
            className="absolute inset-0 rounded-2xl flex items-center justify-center"
            style={{ pointerEvents: "none" }}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">✓</div>
              <p className="text-xs text-white/30">No suspicious phrases detected</p>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      {suspiciousPhrases.length > 0 && (
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          {[
            { label: "High", color: "#f43f5e" },
            { label: "Medium", color: "#f59e0b" },
            { label: "Low", color: "#fb923c" },
          ].map(({ label, color }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-white/35">
              <span
                className="w-3 h-1.5 rounded-full"
                style={{ background: color, opacity: 0.7 }}
              />
              {label} severity
            </span>
          ))}
          <span className="text-xs text-white/25 ml-auto">Hover to inspect</span>
        </div>
      )}
    </motion.div>
  );
}
