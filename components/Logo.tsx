// Classy techy hexagonal logo for TruIntel AI
export function LogoIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lg-bg" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="45%" stopColor="#4c1d95" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
        <linearGradient id="lg-t" x1="11" y1="15" x2="33" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.82)" />
        </linearGradient>
        <linearGradient id="lg-dot1" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="lg-dot2" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        <filter id="lg-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer hexagon */}
      <path
        d="M22 2 L40 12 L40 32 L22 42 L4 32 L4 12 Z"
        fill="url(#lg-bg)"
        stroke="rgba(139,92,246,0.55)"
        strokeWidth="0.8"
      />

      {/* Inner dim hexagon for depth */}
      <path
        d="M22 7 L36 15 L36 29 L22 37 L8 29 L8 15 Z"
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="0.6"
      />

      {/* Corner circuit nodes */}
      <circle cx="4" cy="16" r="1.5" fill="#06b6d4" opacity="0.7" />
      <circle cx="40" cy="16" r="1.5" fill="#818cf8" opacity="0.7" />
      <circle cx="22" cy="2" r="1.5" fill="#a78bfa" opacity="0.7" />
      <circle cx="4" cy="28" r="1" fill="#818cf8" opacity="0.5" />
      <circle cx="40" cy="28" r="1" fill="#06b6d4" opacity="0.5" />

      {/* Circuit lines from nodes */}
      <line x1="4" y1="16" x2="11" y2="16" stroke="#06b6d4" strokeWidth="0.7" opacity="0.5" />
      <line x1="40" y1="16" x2="33" y2="16" stroke="#818cf8" strokeWidth="0.7" opacity="0.5" />

      {/* T — horizontal bar */}
      <rect x="11" y="15" width="22" height="4" rx="2" fill="url(#lg-t)" />

      {/* T — vertical stem */}
      <rect x="17.5" y="15" width="9" height="14.5" rx="2" fill="url(#lg-t)" />

      {/* Accent dots at T-bar ends */}
      <circle cx="11" cy="17" r="2.2" fill="url(#lg-dot1)" filter="url(#lg-glow)" />
      <circle cx="33" cy="17" r="2.2" fill="url(#lg-dot2)" filter="url(#lg-glow)" />
    </svg>
  );
}

// Larger version for splash screen with extra glow
export function LogoIconLarge({ size = 96 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lgl-bg" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="45%" stopColor="#4c1d95" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
        <linearGradient id="lgl-t" x1="11" y1="15" x2="33" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.85)" />
        </linearGradient>
        <filter id="lgl-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="lgl-outer-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer soft glow */}
      <path
        d="M22 2 L40 12 L40 32 L22 42 L4 32 L4 12 Z"
        fill="rgba(99,102,241,0.2)"
        filter="url(#lgl-outer-glow)"
      />

      {/* Main hex */}
      <path
        d="M22 2 L40 12 L40 32 L22 42 L4 32 L4 12 Z"
        fill="url(#lgl-bg)"
        stroke="rgba(139,92,246,0.7)"
        strokeWidth="1"
      />

      {/* Inner hex */}
      <path
        d="M22 7 L36 15 L36 29 L22 37 L8 29 L8 15 Z"
        fill="none"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="0.8"
      />

      {/* Circuit dots */}
      <circle cx="4" cy="16" r="2" fill="#06b6d4" filter="url(#lgl-glow)" />
      <circle cx="40" cy="16" r="2" fill="#818cf8" filter="url(#lgl-glow)" />
      <circle cx="22" cy="2" r="2" fill="#a78bfa" filter="url(#lgl-glow)" />
      <circle cx="4" cy="28" r="1.4" fill="#818cf8" opacity="0.6" />
      <circle cx="40" cy="28" r="1.4" fill="#06b6d4" opacity="0.6" />
      <circle cx="22" cy="42" r="1.4" fill="#6366f1" opacity="0.5" />

      {/* Circuit lines */}
      <line x1="4" y1="16" x2="11" y2="16" stroke="#06b6d4" strokeWidth="0.8" opacity="0.6" />
      <line x1="40" y1="16" x2="33" y2="16" stroke="#818cf8" strokeWidth="0.8" opacity="0.6" />
      <line x1="22" y1="7" x2="22" y2="15" stroke="#a78bfa" strokeWidth="0.8" opacity="0.5" />

      {/* T bar */}
      <rect x="11" y="15" width="22" height="4" rx="2" fill="url(#lgl-t)" />
      {/* T stem */}
      <rect x="17.5" y="15" width="9" height="14.5" rx="2" fill="url(#lgl-t)" />

      {/* Accent dots at ends */}
      <circle cx="11" cy="17" r="2.5" fill="#06b6d4" filter="url(#lgl-glow)" />
      <circle cx="33" cy="17" r="2.5" fill="#818cf8" filter="url(#lgl-glow)" />
    </svg>
  );
}
