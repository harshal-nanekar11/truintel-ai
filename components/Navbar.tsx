"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoIcon } from "./Logo";


// ── Nav link definitions with icons ───────────────────────────────────────
const navLinks = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/analyze",
    label: "Analyze",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    href: "/features",
    label: "Features",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

// ── Framer Motion variants ─────────────────────────────────────────────────
const navbarVariants = {
  hidden: { y: -90, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "16px 20px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            borderRadius: "18px",
            background: "rgba(8, 8, 18, 0.82)",
            backdropFilter: "blur(28px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={{ filter: "drop-shadow(0 0 10px rgba(99,102,241,0.5))" }}
            >
              <LogoIcon size={36} />
            </motion.div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.01em", lineHeight: 1 }}>
              <span className="gradient-text">TruIntel</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}> AI</span>
            </span>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────────────────── */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2px" }} className="hidden md:flex">
            {navLinks.map(({ href, label, icon }, i) => {
              const isActive = pathname === href || (href === "#features" && false);
              return (
                <motion.div
                  key={href}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    href={href}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "9px 16px",
                      borderRadius: "12px",
                      textDecoration: "none",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: "0.88rem",
                      letterSpacing: "0.01em",
                      color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
                      transition: "color 0.2s",
                    }}
                  >
                    {/* Active pill background */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-pill"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "12px",
                            background: "rgba(99,102,241,0.18)",
                            border: "1px solid rgba(99,102,241,0.35)",
                          }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Hover background */}
                    <motion.div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.06)",
                        opacity: 0,
                      }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                    />

                    {/* Icon */}
                    <span
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        color: isActive ? "#818cf8" : "rgba(255,255,255,0.45)",
                        transition: "color 0.2s",
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </span>

                    {/* Label */}
                    <span style={{ position: "relative" }}>{label}</span>

                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          position: "relative",
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#6366f1",
                          boxShadow: "0 0 6px #6366f1",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* ── CTA Button ───────────────────────────────────────────── */}
          <motion.div
            className="hidden md:flex"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            style={{ flexShrink: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              href="/analyze"
              id="nav-cta-button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                borderRadius: "12px",
                textDecoration: "none",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 0 22px rgba(99,102,241,0.45)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 700,
                color: "white",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Detect Fakes
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </Link>
          </motion.div>

          {/* ── Mobile Menu Toggle ────────────────────────────────────── */}
          <motion.button
            className="md:hidden"
            whileTap={{ scale: 0.9 }}
            style={{
              padding: "8px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 5h18M3 12h18M3 19h18" />}
            </motion.svg>
          </motion.button>
        </div>

        {/* ── Mobile Menu ──────────────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                marginTop: "8px",
                borderRadius: "18px",
                padding: "12px",
                background: "rgba(8,8,18,0.95)",
                backdropFilter: "blur(28px)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
              className="md:hidden"
            >
              {navLinks.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: pathname === href ? 600 : 400,
                    color: pathname === href ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)",
                    background: pathname === href ? "rgba(99,102,241,0.12)" : "transparent",
                    marginBottom: "2px",
                  }}
                >
                  <span style={{ color: pathname === href ? "#818cf8" : "rgba(255,255,255,0.35)" }}>{icon}</span>
                  {label}
                </Link>
              ))}
              <Link
                href="/analyze"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  marginTop: "8px",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "white",
                  textAlign: "center",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                Detect Fakes →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
