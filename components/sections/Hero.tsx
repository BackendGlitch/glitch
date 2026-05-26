"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

/* ============================================
   ISOMETRIC DATA CENTER ILLUSTRATION
   Flat 2D line-art, purple on black
   ============================================ */
function ServerIllustration() {
  return (
    <svg
      viewBox="0 0 800 460"
      className="w-full max-w-[800px] h-auto mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* === LEFT SERVER RACK (isometric) === */}
      {/* Back panel */}
      <polygon points="80,260 200,200 200,80 80,140" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Side panel */}
      <polygon points="80,140 200,80 320,140 200,200" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Front panel */}
      <polygon points="80,140 80,260 200,320 200,200" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.6" />

      {/* Server units (horizontal slots on front) */}
      {[165, 185, 205, 225, 245, 265, 285].map((y, i) => (
        <g key={`slot-${i}`}>
          <line x1="80" y1={y} x2="195" y2={y + 55} stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.3" />
          {/* Vent dots */}
          {[0, 1, 2, 3, 4].map((d) => (
            <circle
              key={d}
              cx={100 + d * 18}
              cy={y - 6}
              r="2"
              fill="#7C3AED"
              opacity={Math.random() > 0.3 ? "0.6" : "0.15"}
              style={{ animation: `blink ${1.5 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 0.5}s` }}
            />
          ))}
          {/* Status LED */}
          <circle cx="185" cy={y + 52} r="2.5" fill="#7C3AED" opacity="0.8" style={{ animation: `blink ${1 + i * 0.3}s ease-in-out infinite` }} />
        </g>
      ))}

      {/* Rack label */}
      <text x="140" y="330" fill="#7C3AED" fontSize="9" fontFamily="var(--font-mono), monospace" textAnchor="middle" opacity="0.5">RACK-01</text>

      {/* === RIGHT SERVER RACK (larger) === */}
      <polygon points="440,280 600,200 600,40 440,120" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.4" />
      <polygon points="440,120 600,40 760,120 600,200" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.5" />
      <polygon points="440,120 440,280 600,360 600,200" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.7" />

      {/* Server units for right rack */}
      {[150, 175, 200, 225, 250, 275, 300, 325].map((y) => (
        <g key={`r-slot-${y}`}>
          <line x1="440" y1={y} x2="595" y2={y + 70} stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.25" />
          {[0, 1, 2, 3, 4, 5].map((d) => (
            <circle key={d} cx={470 + d * 22} cy={y - 6} r="2" fill="#7C3AED" opacity={Math.random() > 0.4 ? "0.5" : "0.1"} style={{ animation: `blink ${1.8 + Math.random() * 2}s ease-in-out infinite` }} />
          ))}
          <circle cx="590" cy={y + 67} r="2.5" fill="#7C3AED" opacity="0.9" style={{ animation: `blink ${1.3 + Math.random() * 2}s ease-in-out infinite` }} />
        </g>
      ))}

      <text x="520" y="380" fill="#7C3AED" fontSize="9" fontFamily="var(--font-mono), monospace" textAnchor="middle" opacity="0.5">RACK-02</text>

      {/* === CIRCUIT TRACES connecting racks === */}
      <g stroke="#7C3AED" strokeWidth="0.6" strokeOpacity="0.25" fill="none">
        <path d="M320,140 L380,140 L380,120 L440,120" strokeDasharray="3 3" />
        <path d="M320,180 L370,180 L370,100 L440,100" strokeDasharray="2 4" />
        <path d="M200,320 L300,320 L300,360 L440,360" strokeDasharray="4 2" />
        <path d="M200,290 L340,290 L340,220 L440,220" strokeDasharray="2 3" />
        {/* Data flow dots on traces */}
        <circle cx="350" cy="140" r="2" fill="#7C3AED" opacity="0.6" style={{ animation: "pulse-dot 1.5s ease-in-out infinite" }} />
        <circle cx="390" cy="100" r="2" fill="#7C3AED" opacity="0.6" style={{ animation: "pulse-dot 1.8s ease-in-out infinite 0.3s" }} />
        <circle cx="280" cy="320" r="2" fill="#7C3AED" opacity="0.6" style={{ animation: "pulse-dot 2s ease-in-out infinite 0.6s" }} />
      </g>

      {/* === TERMINAL WINDOW (bottom left) === */}
      <rect x="40" y="380" width="340" height="70" rx="4" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.3" />
      <rect x="40" y="380" width="340" height="18" rx="4" fill="#7C3AED" fillOpacity="0.08" />
      <circle cx="52" cy="389" r="3" fill="#7C3AED" opacity="0.5" />
      <circle cx="62" cy="389" r="3" fill="#7C3AED" opacity="0.3" />
      <circle cx="72" cy="389" r="3" fill="#7C3AED" opacity="0.2" />
      <text x="50" y="410" fill="#FFFFFF" fontSize="10" fontFamily="var(--font-mono), monospace" opacity="0.5">
        $ ssh glitch@backend <tspan fill="#7C3AED" opacity="0.7">▌</tspan>
      </text>
      <text x="50" y="428" fill="#7C3AED" fontSize="10" fontFamily="var(--font-mono), monospace" opacity="0.4">
        $ tail -f /var/log/glitch.log
      </text>
      <text x="50" y="444" fill="#FFFFFF" fontSize="9" fontFamily="var(--font-mono), monospace" opacity="0.25">
        [OK] 204 connections · 12ms p99 · 99.99% uptime
      </text>

      {/* === FLOATING CIRCUIT NODES (top area) === */}
      {[[300, 30], [500, 50], [400, 20], [580, 30]].map(([cx, cy], i) => (
        <g key={`node-${i}`}>
          <circle cx={cx} cy={cy} r="3" fill="#7C3AED" opacity="0.38" style={{ animation: `pulse-dot ${1.5 + i * 0.2}s ease-in-out infinite` }} />
          {i < 3 && (
            <line x1={cx} y1={cy} x2={[500, 400, 580][i]} y2={[50, 20, 30][i]} stroke="#7C3AED" strokeWidth="0.4" strokeOpacity="0.12" />
          )}
        </g>
      ))}

      {/* === BIG CENTER CORE (hexagonal/geometric) === */}
      <polygon
        points="400,160 440,180 440,220 400,240 360,220 360,180"
        stroke="#7C3AED"
        strokeWidth="1.2"
        strokeOpacity="0.5"
        fill="#7C3AED"
        fillOpacity="0.03"
      />
      {/* Inner hex */}
      <polygon
        points="400,175 425,190 425,215 400,230 375,215 375,190"
        stroke="#7C3AED"
        strokeWidth="0.6"
        strokeOpacity="0.35"
        fill="none"
      />
      {/* Core pulse ring */}
      <circle cx="400" cy="200" r="50" stroke="#7C3AED" strokeWidth="0.5" strokeOpacity="0.2" fill="none" strokeDasharray="3 6">
        <animate attributeName="r" from="45" to="65" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="400" cy="200" r="3" fill="#7C3AED" opacity="0.9" style={{ animation: "pulse-dot 1s ease-in-out infinite" }} />
    </svg>
  )
}

/* ============================================
   HERO SECTION
   ============================================ */
export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Illustration — ~55% of viewport */}
      <div className="pt-24 md:pt-20 pb-4 md:pb-8 px-4 md:px-8">
        <ServerIllustration />
      </div>

      {/* Content — centered below illustration */}
      <div className="container mx-auto px-6 md:px-8 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Wordmark label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xs font-mono tracking-[0.3em] uppercase text-[#A0A0A0] mb-4"
          >
            BACKEND <span className="text-[#7C3AED]">.</span> GLITCH <span className="text-[#7C3AED]">.</span> INC
          </motion.p>
        </div>

        {/* Headline — full bleed */}
        <div className="text-center mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-pixel text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight select-none glitch-hero-wordmark inline-block mx-auto text-white"
            data-text="GLITCH"
          >
            GLITCH
          </motion.h1>
        </div>

        <div className="max-w-2xl mx-auto text-center">

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm md:text-base text-[#A0A0A0] max-w-md mx-auto mb-8 leading-relaxed"
          >
            Backend infrastructure, AI agents, and Web3 systems —
            engineered in Tunisia, deployed globally.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex items-center justify-center gap-3"
          >
            <button onClick={() => scrollTo("products")} className="px-6 py-3 text-sm font-semibold bg-[#7C3AED] text-white rounded-lg hover:bg-[#6D28D9] transition-colors">
              Explore Work
            </button>
            <button onClick={() => scrollTo("contact")} className="px-6 py-3 text-sm font-medium text-white border border-white/10 rounded-lg hover:border-[#7C3AED]/40 transition-all">
              Get In Touch
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#A0A0A0]"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  )
}
