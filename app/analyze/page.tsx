"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { AnalysisResult } from "@/lib/types";

const SAMPLE_REVIEWS = [
  {
    label: "Likely Fake",
    emoji: "⚠️",
    text: "Best product ever!! Highly recommend!! Amazing quality, wow!! Must buy!! Changed my life!! 5 stars!! Do not hesitate!! Trust me!! Perfect!! No complaints at all!! Super fast delivery!! Will buy again!!",
  },
  {
    label: "Likely Real",
    emoji: "✓",
    text: "I bought this after comparing it to three similar models. The build quality is solid — although the instruction manual could be clearer. After 2 months of daily use, the battery holds up well. However, the material feels slightly cheaper than described. Would still recommend, but manage your expectations on the casing.",
  },
  {
    label: "Suspicious",
    emoji: "?",
    text: "Great quality product! Value for money. Fast delivery. Very happy with purchase. Excellent product. Would buy again. No regrets. Legit seller. 5 stars recommended.",
  },
];

const AI_THINKING_STEPS = [
  "Parsing review structure...",
  "Running NLP phrase detection...",
  "Analyzing sentiment patterns...",
  "Scoring authenticity signals...",
  "Generating trust verdict...",
];

export default function AnalyzePage() {
  const [review, setReview] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setReview(val);
    setCharCount(val.length);
    setError(null);
  };

  const handleSample = (text: string) => {
    setReview(text);
    setCharCount(text.length);
    setError(null);
    textareaRef.current?.focus();
  };

  const handleAnalyze = async () => {
    if (!review.trim() || review.trim().length < 5) {
      setError("Please enter a review with at least 5 characters.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setThinkingStep(0);

    // Cycle through thinking steps
    const stepInterval = setInterval(() => {
      setThinkingStep((prev) => Math.min(prev + 1, AI_THINKING_STEPS.length - 1));
    }, 350);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Analysis failed");
      }

      const result: AnalysisResult = await response.json();

      // Store result in sessionStorage and navigate to results
      sessionStorage.setItem("truintel_result", JSON.stringify(result));
      sessionStorage.setItem("truintel_review", review);

      clearInterval(stepInterval);
      router.push("/results");
    } catch (err) {
      clearInterval(stepInterval);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsAnalyzing(false);
    }
  };

  const wordCount = review.trim().split(/\s+/).filter(Boolean).length;

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "112px 24px 80px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "720px" }}>
          {/* Back to Home */}
          <div style={{ marginBottom: "16px", textAlign: "center" }}>
            <a href="/" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontSize: "0.75rem", color: "rgba(255,255,255,0.3)",
              textDecoration: "none", fontFamily: "'Space Grotesk',sans-serif",
            }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </a>
          </div>
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "40px" }}
          >

            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.2)",
                color: "#818cf8",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              AI Analysis Engine
            </span>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                color: "white",
                marginBottom: "12px",
                lineHeight: 1.1,
              }}
            >
              Paste Your <span className="gradient-text">Review</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.97rem", lineHeight: 1.7 }}>
              Enter any product review — Amazon, Flipkart, Google, or any platform.
              We&apos;ll analyze it in seconds.
            </p>
          </motion.div>

          {/* Sample Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-wrap gap-2 justify-center mb-6"
          >
            <p className="w-full text-center text-xs text-white/30 mb-1 uppercase tracking-wider">
              Try a sample
            </p>
            {SAMPLE_REVIEWS.map(({ label, emoji, text }) => (
              <motion.button
                key={label}
                onClick={() => handleSample(text)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id={`sample-${label.toLowerCase().replace(/\s/g, "-")}`}
                className="px-4 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white transition-colors"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {emoji} {label}
              </motion.button>
            ))}
          </motion.div>

          {/* ── Main Input Card ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            style={{ position: "relative" }}
          >
            {/* Rotating conic-gradient glow border */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: "-2px",
                borderRadius: "28px",
                background: "conic-gradient(from 0deg, transparent 0%, #6366f1 20%, #8b5cf6 40%, #06b6d4 60%, transparent 80%)",
                zIndex: 0,
                opacity: 0.55,
              }}
            />
            {/* Inner background over rotating border */}
            <div style={{
              position: "absolute",
              inset: "1px",
              borderRadius: "26px",
              background: "rgba(8,8,20,0.97)",
              zIndex: 1,
            }} />

            <div style={{ position: "relative", zIndex: 2, borderRadius: "26px" }}>
              {/* Top gradient line */}
              <div style={{
                position: "absolute",
                top: 0,
                left: "8%",
                right: "8%",
                height: "1px",
                background: "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, #06b6d4, transparent)",
              }} />

              {/* Shimmer sweep */}
              <motion.div
                animate={{ x: ["-100%", "220%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "40%", height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.055), transparent)",
                  pointerEvents: "none",
                  borderRadius: "26px",
                }}
              />

              <div style={{ padding: "28px" }}>
                {/* Textarea wrapper */}
                <div style={{
                  position: "relative",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  overflow: "hidden",
                }}>
                  {/* Scan line (only when empty) */}
                  {!review && (
                    <motion.div
                      animate={{ y: ["0%", "92%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        position: "absolute",
                        left: 0, right: 0,
                        height: "2px",
                        background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.45), rgba(139,92,246,0.45), transparent)",
                        pointerEvents: "none",
                        zIndex: 5,
                      }}
                    />
                  )}

                  <textarea
                    ref={textareaRef}
                    id="review-input"
                    value={review}
                    onChange={handleReviewChange}
                    placeholder={`Paste your product review here...

e.g., "I've been using this product for about 3 months now. The build quality is solid, though the charging cable feels a bit flimsy. Performance has been consistent and the battery life exceeded my expectations. Would still recommend, but manage your expectations on the casing quality."`}
                    disabled={isAnalyzing}
                    rows={11}
                    maxLength={5000}
                    style={{
                      display: "block",
                      width: "100%",
                      boxSizing: "border-box",
                      resize: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: "0.9rem",
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.85)",
                      caretColor: "#6366f1",
                      fontFamily: "'Inter', sans-serif",
                      padding: "18px 20px",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.ctrlKey) handleAnalyze();
                    }}
                  />

                  {/* AI thinking overlay */}
                  <AnimatePresence>
                    {isAnalyzing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(4,4,14,0.9)",
                          backdropFilter: "blur(10px)",
                          borderRadius: "14px",
                          gap: "16px",
                        }}
                      >
                        <div style={{ position: "relative", width: "60px", height: "60px" }}>
                          <div style={{
                            position: "absolute", inset: 0, borderRadius: "50%",
                            background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.15))",
                            border: "1px solid rgba(99,102,241,0.35)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                              style={{
                                width: "28px", height: "28px", borderRadius: "50%",
                                border: "2px solid transparent",
                                borderTopColor: "#6366f1", borderRightColor: "#8b5cf6",
                              }}
                            />
                          </div>
                          <motion.div
                            animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                            style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(99,102,241,0.3)" }}
                          />
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={thinkingStep}
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            style={{ color: "#818cf8", fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.88rem", fontWeight: 600 }}
                          >
                            {AI_THINKING_STEPS[thinkingStep]}
                          </motion.p>
                        </AnimatePresence>
                        <div style={{ display: "flex", gap: "6px" }}>
                          {AI_THINKING_STEPS.map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: i <= thinkingStep ? 1 : 0.2 }}
                              style={{ width: "6px", height: "6px", borderRadius: "50%", background: i <= thinkingStep ? "#6366f1" : "rgba(255,255,255,0.2)" }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      style={{
                        overflow: "hidden", marginTop: "12px",
                        padding: "12px 16px", borderRadius: "12px",
                        fontSize: "0.85rem", fontFamily: "'Space Grotesk',sans-serif",
                        background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)", color: "#fb7185",
                      }}
                    >
                      ⚠ {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom bar */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  flexWrap: "wrap", gap: "12px",
                  marginTop: "20px", paddingTop: "18px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.28)", fontFamily: "'Space Grotesk',sans-serif" }}>
                      {wordCount} word{wordCount !== 1 ? "s" : ""}
                    </span>
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                    <span style={{ fontSize: "0.74rem", fontFamily: "'Space Grotesk',sans-serif", color: charCount > 4500 ? "#f59e0b" : "rgba(255,255,255,0.28)" }}>
                      {charCount}/5000
                    </span>
                    <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.18)", fontFamily: "'Space Grotesk',sans-serif" }}>Ctrl+Enter</span>
                  </div>

                  <motion.button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !review.trim()}
                    id="analyze-submit-button"
                    whileHover={!isAnalyzing && review.trim() ? { scale: 1.04 } : {}}
                    whileTap={!isAnalyzing && review.trim() ? { scale: 0.96 } : {}}
                    style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "12px 26px", borderRadius: "14px",
                      fontSize: "0.88rem", fontWeight: 700, color: "white",
                      fontFamily: "'Space Grotesk',sans-serif",
                      background: isAnalyzing || !review.trim() ? "rgba(99,102,241,0.25)" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                      boxShadow: isAnalyzing || !review.trim() ? "none" : "0 0 30px rgba(99,102,241,0.55),0 4px 20px rgba(0,0,0,0.4)",
                      cursor: isAnalyzing || !review.trim() ? "not-allowed" : "pointer",
                      border: "none", outline: "none", transition: "all 0.25s",
                    }}
                  >
                    {isAnalyzing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          style={{ width: "15px", height: "15px", borderRadius: "50%", border: "2px solid transparent", borderTopColor: "white" }}
                        />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                        </svg>
                        Analyze Review
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            style={{
              textAlign: "center", fontSize: "0.7rem",
              color: "rgba(255,255,255,0.18)", marginTop: "16px",
              fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "0.02em",
            }}
          >
            Your review is processed locally. No data is stored or shared.
          </motion.p>
        </div>
      </div>
    </main>
  );
}
