"use client"

import { ArrowRight, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import UFO from "@/components/UFO"

export default function Hero() {
  const [glitchActive, setGlitchActive] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [orb1Position, setOrb1Position] = useState({ x: 25, y: 25 })
  const [orb2Position, setOrb2Position] = useState({ x: 75, y: 75 })

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    // Random movement for orb 1
    const interval1 = setInterval(() => {
      setOrb1Position({
        x: Math.random() * 100,
        y: Math.random() * 100,
      })
    }, 3000 + Math.random() * 2000) // Random interval between 3-5 seconds

    // Random movement for orb 2
    const interval2 = setInterval(() => {
      setOrb2Position({
        x: Math.random() * 100,
        y: Math.random() * 100,
      })
    }, 3500 + Math.random() * 2000) // Random interval between 3.5-5.5 seconds

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Top cyan line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400 z-50" />

      {/* Animated background grid */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Starry background effect */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-zinc-950" />
      </div>

      {/* Glowing orb effects - randomly moving */}
      <div 
        className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse transition-all duration-[3000ms] ease-in-out"
        style={{
          left: `${orb1Position.x}%`,
          top: `${orb1Position.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div 
        className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse transition-all duration-[3500ms] ease-in-out"
        style={{
          left: `${orb2Position.x}%`,
          top: `${orb2Position.y}%`,
          transform: 'translate(-50%, -50%)',
          animationDelay: "1s",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-8 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
            {/* Left Column - Text Content */}
            <div className="space-y-8 order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-block mb-6 px-5 py-2.5 border-4 border-cyan-400 bg-cyan-400/20 pixel-text text-cyan-400 text-xs">
                [ TUNISIA • WEB3 STARTUP ]
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-pixel leading-tight tracking-wider">
                  <span className={`block text-white mb-3 ${glitchActive ? "animate-glitch-text" : ""}`}>
                    GLITCH
                  </span>
                  <span className="block text-cyan-400">
                    WEB3 STUDIO
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-mono max-w-xl">
                  A Tunisian blockchain startup building the future of{" "}
                  <span className="text-pink-400 font-bold">gamification</span>,{" "}
                  <span className="text-yellow-400 font-bold">web development</span>,{" "}
                  <span className="text-purple-400 font-bold">AI</span>, and{" "}
                  <span className="text-green-400 font-bold">game development</span>
                </p>
                <p className="text-base md:text-lg text-zinc-400 font-mono">
                  We're just getting started, and we're ready to build something amazing together.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="pixel-button bg-cyan-400 text-zinc-950 border-cyan-400 px-8 py-4 text-sm font-pixel hover:bg-cyan-300"
                >
                  [ GET STARTED ]
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="pixel-button bg-transparent text-cyan-400 border-cyan-400 px-8 py-4 text-sm font-pixel hover:bg-cyan-400/10"
                >
                  [ OUR SERVICES ]
                </button>
              </div>
            </div>

            {/* Right Column - UFO Model */}
            <div className="relative order-1 lg:order-2">
              <div className="relative w-full aspect-square max-w-lg mx-auto h-[300px] sm:h-[400px] lg:h-auto">
                <UFO mousePosition={mousePosition} />
              </div>
            </div>
          </div>

          {/* Quick Stats - Bottom Section */}
          <div className="grid grid-cols-3 gap-6 pt-12 mt-12 border-t-4 border-zinc-800 max-w-4xl mx-auto">
            <div className="pixel-card border-cyan-400 bg-cyan-400/10 p-6 text-center">
              <div className="text-3xl md:text-4xl font-pixel text-cyan-400 mb-2">2024</div>
              <div className="text-xs font-pixel text-zinc-400">FOUNDED</div>
            </div>
            <div className="pixel-card border-pink-400 bg-pink-400/10 p-6 text-center">
              <div className="text-3xl md:text-4xl font-pixel text-pink-400 mb-2">TUNISIA</div>
              <div className="text-xs font-pixel text-zinc-400">BASED</div>
            </div>
            <div className="pixel-card border-yellow-400 bg-yellow-400/10 p-6 text-center">
              <div className="text-3xl md:text-4xl font-pixel text-yellow-400 mb-2">WEB3</div>
              <div className="text-xs font-pixel text-zinc-400">FOCUS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
