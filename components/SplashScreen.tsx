"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoIconLarge } from "./Logo";

const LETTERS = "TruIntel AI".split("");

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<"logo" | "text" | "tagline" | "exit">("logo");

  useEffect(() => {
    // Phase timeline — shows on every load/refresh
    const t1 = setTimeout(() => setPhase("text"), 900);
    const t2 = setTimeout(() => setPhase("tagline"), 2200);
    const t3 = setTimeout(() => setPhase("exit"), 4800);
    const t4 = setTimeout(() => setShow(false), 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={phase === "exit" ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#04040a",
            gap: "0px",
            overflow: "hidden",
          }}
        >
          {/* Deep radial bg glow */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              width: "700px",
              height: "700px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.1) 35%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Outer particle ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              width: "380px",
              height: "380px",
              borderRadius: "50%",
              border: "1px dashed rgba(99,102,241,0.18)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              border: "1px dashed rgba(6,182,212,0.14)",
              pointerEvents: "none",
            }}
          />

          {/* Logo with rings */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.15 }}
            style={{ position: "relative", zIndex: 2, marginBottom: "36px" }}
          >
            {/* Pulse ring 1 */}
            <motion.div
              animate={{ scale: [1, 1.6, 2.2], opacity: [0.7, 0.3, 0] }}
              transition={{ duration: 2, delay: 0.8, ease: "easeOut", repeat: Infinity, repeatDelay: 1.5 }}
              style={{
                position: "absolute",
                inset: "-12px",
                borderRadius: "50%",
                border: "2px solid rgba(99,102,241,0.6)",
              }}
            />
            {/* Pulse ring 2 */}
            <motion.div
              animate={{ scale: [1, 2, 2.8], opacity: [0.5, 0.2, 0] }}
              transition={{ duration: 2.2, delay: 1.1, ease: "easeOut", repeat: Infinity, repeatDelay: 1.5 }}
              style={{
                position: "absolute",
                inset: "-12px",
                borderRadius: "50%",
                border: "1px solid rgba(139,92,246,0.4)",
              }}
            />

            {/* Logo glow beneath */}
            <div style={{
              position: "absolute",
              inset: "-20px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)",
              filter: "blur(12px)",
            }} />

            <LogoIconLarge size={110} />
          </motion.div>

          {/* Brand name — letters stagger in */}
          <motion.div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1px",
              position: "relative",
              zIndex: 2,
              marginBottom: "14px",
            }}
          >
            {LETTERS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={phase !== "logo"
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : {}}
                transition={{ delay: i * 0.07, duration: 0.5, ease: "easeOut" }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: i < 8 ? 800 : 300,
                  fontSize: "3.2rem",
                  letterSpacing: "-0.02em",
                  color: i < 3 ? undefined : i < 8 ? "white" : "rgba(255,255,255,0.3)",
                  background: i < 3
                    ? "linear-gradient(135deg, #6366f1, #a78bfa, #06b6d4)"
                    : undefined,
                  WebkitBackgroundClip: i < 3 ? "text" : undefined,
                  WebkitTextFillColor: i < 3 ? "transparent" : undefined,
                }}
              >
                {char === " " ? "\u00a0" : char}
              </motion.span>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={phase === "tagline" || phase === "exit"
              ? { opacity: 1, y: 0 }
              : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ position: "relative", zIndex: 2 }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 22px",
              borderRadius: "999px",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.25)",
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#06b6d4",
                boxShadow: "0 0 8px #06b6d4",
              }} />
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}>
                Fake Review Detector · AI Powered
              </span>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#818cf8",
                boxShadow: "0 0 8px #818cf8",
              }} />
            </div>
          </motion.div>

          {/* Bottom scanning line progress */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "3px",
              background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4, #8b5cf6, #6366f1)",
              backgroundSize: "200% 100%",
              zIndex: 2,
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.5, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Corner accent lines */}
          {[
            { top: "20px", left: "20px", borderTop: true, borderLeft: true },
            { top: "20px", right: "20px", borderTop: true, borderRight: true },
            { bottom: "20px", left: "20px", borderBottom: true, borderLeft: true },
            { bottom: "20px", right: "20px", borderBottom: true, borderRight: true },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              style={{
                position: "absolute",
                width: "28px",
                height: "28px",
                borderTop: pos.borderTop ? "1.5px solid rgba(99,102,241,0.4)" : "none",
                borderLeft: pos.borderLeft ? "1.5px solid rgba(99,102,241,0.4)" : "none",
                borderBottom: pos.borderBottom ? "1.5px solid rgba(99,102,241,0.4)" : "none",
                borderRight: pos.borderRight ? "1.5px solid rgba(99,102,241,0.4)" : "none",
                top: pos.top,
                left: pos.left,
                right: pos.right,
                bottom: pos.bottom,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
