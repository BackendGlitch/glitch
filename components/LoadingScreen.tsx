"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [glitchActive, setGlitchActive] = useState(false)
  const [zoomActive, setZoomActive] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [intenseGlitch, setIntenseGlitch] = useState(false)

  useEffect(() => {
    // Start glitch effect immediately and keep it going
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 120)
    }, 180)

    // Intense reality glitch (affects entire screen)
    const intenseGlitchInterval = setInterval(() => {
      setIntenseGlitch(true)
      setTimeout(() => setIntenseGlitch(false), 100)
    }, 400)

    // Start zoom quickly
    const zoomTimer = setTimeout(() => {
      setZoomActive(true)
    }, 700)

    // Start fade out slightly before zoom completes
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 1200)

    // Hide loading after zoom completes
    const hideTimer = setTimeout(() => {
      setLoading(false)
      clearInterval(glitchInterval)
      clearInterval(intenseGlitchInterval)
    }, 1600)

    return () => {
      clearInterval(glitchInterval)
      clearInterval(intenseGlitchInterval)
      clearTimeout(zoomTimer)
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!loading) return null

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-zinc-950 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      } ${intenseGlitch ? "glitch-reality" : ""}`}
    >
      {/* RGB Channel Separation - Reality Glitch */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-100 ${intenseGlitch ? "opacity-100" : "opacity-0"}`}>
        {/* Red channel */}
        <div 
          className="absolute inset-0 mix-blend-screen"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.3) 50%, transparent 100%)",
            transform: intenseGlitch ? "translateX(-4px)" : "translateX(0)",
            transition: "transform 0.1s",
          }}
        />
        {/* Green channel */}
        <div 
          className="absolute inset-0 mix-blend-screen"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(0, 255, 0, 0.3) 50%, transparent 100%)",
            transform: intenseGlitch ? "translateX(0)" : "translateX(0)",
          }}
        />
        {/* Blue channel */}
        <div 
          className="absolute inset-0 mix-blend-screen"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.3) 50%, transparent 100%)",
            transform: intenseGlitch ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.1s",
          }}
        />
      </div>

      {/* Screen Tearing Effect */}
      {intenseGlitch && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-[2px] bg-cyan-400/20"
              style={{
                top: `${20 + i * 20}%`,
                transform: `translateX(${Math.random() * 20 - 10}px) skewX(${Math.random() * 10 - 5}deg)`,
                animation: "tear 0.2s ease-out",
              }}
            />
          ))}
        </div>
      )}

      {/* Screen Distortion */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-100 ${
          intenseGlitch ? "opacity-100" : "opacity-0"
        }`}
        style={{
          clipPath: intenseGlitch 
            ? `polygon(
                0% ${Math.random() * 5}%, 
                100% ${Math.random() * 5}%, 
                100% ${95 + Math.random() * 5}%, 
                0% ${95 + Math.random() * 5}%
              )`
            : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          transform: intenseGlitch ? `skew(${Math.random() * 2 - 1}deg, ${Math.random() * 2 - 1}deg)` : "skew(0deg, 0deg)",
        }}
      />

      {/* Digital Noise/Static */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-100 ${
          intenseGlitch ? "opacity-30" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "screen",
        }}
      />

      {/* Animated background with depth */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            intenseGlitch ? "opacity-[0.08] translate-x-[-2px]" : "opacity-[0.04]"
          }`}
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        
        {/* Scanlines with corruption */}
        <div
          className={`absolute inset-0 transition-all duration-200 ${
            zoomActive ? "opacity-0" : intenseGlitch ? "opacity-[0.1] translate-y-[-1px]" : "opacity-[0.02]"
          }`}
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)`,
          }}
        />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-zinc-950/50" />
      </div>

      {/* Glowing particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-cyan-400/30 rounded-full transition-all duration-1000 ${
              zoomActive ? "scale-[3] opacity-0" : "scale-100 opacity-100"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
              transform: intenseGlitch ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` : "translate(0, 0)",
            }}
          />
        ))}
      </div>

      {/* GLITCH text with enhanced effects */}
      <div className="relative">
        {/* Glow effect behind text */}
        <div
          className={`absolute inset-0 blur-3xl transition-all duration-700 ease-in-out ${
            zoomActive ? "scale-[12] opacity-0" : "scale-150 opacity-30"
          }`}
          style={{
            background: "radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Main text container with perspective */}
        <div
          className={`relative text-center transition-all duration-700 ease-in-out ${
            zoomActive 
              ? "scale-[10] opacity-0 blur-sm" 
              : "scale-100 opacity-100 blur-0"
          }`}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
            transform: intenseGlitch 
              ? `translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px) rotate(${Math.random() * 1 - 0.5}deg)` 
              : "translate(0, 0) rotate(0deg)",
            transition: intenseGlitch ? "none" : "all 0.7s ease-in-out",
          }}
        >
          {/* Text shadow layers for depth */}
          <h1
            className={`text-8xl md:text-9xl font-bold relative ${
              glitchActive ? "animate-glitch-text" : ""
            }`}
            style={{
              textShadow: `
                0 0 40px rgba(0, 255, 255, 0.5),
                0 0 80px rgba(0, 255, 255, 0.3),
                0 0 120px rgba(0, 255, 255, 0.2)
              `,
              filter: intenseGlitch ? "contrast(1.2) brightness(1.1)" : "none",
            }}
          >
            <span className="text-zinc-100 relative z-10">GL</span>
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent relative z-10">
              ITCH
            </span>
          </h1>

          {/* RGB Split Glitch on Text */}
          {intenseGlitch && (
            <>
              <div
                className="absolute inset-0 text-8xl md:text-9xl font-bold pointer-events-none"
                style={{
                  clipPath: "inset(0 0 0 0)",
                  transform: "translateX(-6px)",
                  color: "rgba(255, 0, 0, 0.8)",
                  mixBlendMode: "screen",
                }}
              >
                <span className="text-zinc-100">GL</span>
                <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  ITCH
                </span>
              </div>
              <div
                className="absolute inset-0 text-8xl md:text-9xl font-bold pointer-events-none"
                style={{
                  clipPath: "inset(0 0 0 0)",
                  transform: "translateX(6px)",
                  color: "rgba(0, 255, 255, 0.8)",
                  mixBlendMode: "screen",
                }}
              >
                <span className="text-zinc-100">GL</span>
                <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  ITCH
                </span>
              </div>
            </>
          )}

          {/* Glitch overlay layers */}
          {glitchActive && (
            <>
              <div
                className="absolute inset-0 text-8xl md:text-9xl font-bold pointer-events-none"
                style={{
                  clipPath: "inset(0 0 50% 0)",
                  transform: "translateX(-3px)",
                  color: "rgba(255, 0, 0, 0.7)",
                  textShadow: "2px 0 rgba(255, 0, 0, 0.7)",
                }}
              >
                <span className="text-zinc-100">GL</span>
                <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  ITCH
                </span>
              </div>
              <div
                className="absolute inset-0 text-8xl md:text-9xl font-bold pointer-events-none"
                style={{
                  clipPath: "inset(50% 0 0 0)",
                  transform: "translateX(3px)",
                  color: "rgba(0, 255, 255, 0.7)",
                  textShadow: "-2px 0 rgba(0, 255, 255, 0.7)",
                }}
              >
                <span className="text-zinc-100">GL</span>
                <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  ITCH
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Radial burst effect on zoom */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          zoomActive ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            zoomActive ? "animate-expand" : ""
          }`}
          style={{
            background: "radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 50%)",
          }}
        />
      </div>
    </div>
  )
}
