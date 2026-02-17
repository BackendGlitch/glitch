"use client"

import { CircleDollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import UFO from "@/components/UFO"

const STAR_POINTS = Array.from({ length: 50 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  duration: 2 + (i % 5) * 0.45,
  delay: (i % 6) * 0.25,
}))

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left: (i * 23) % 100,
  top: (i * 41) % 100,
  delay: (i % 4) * 0.35,
  duration: 2 + (i % 3) * 0.7,
}))

const ORB_PATH_ONE = [
  { x: 20, y: 25 },
  { x: 35, y: 38 },
  { x: 22, y: 55 },
  { x: 30, y: 72 },
]

const ORB_PATH_TWO = [
  { x: 76, y: 74 },
  { x: 66, y: 58 },
  { x: 78, y: 38 },
  { x: 68, y: 22 },
]

export default function Hero() {
  const [glitchActive, setGlitchActive] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [orbIndex1, setOrbIndex1] = useState(0)
  const [orbIndex2, setOrbIndex2] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const interval1 = setInterval(() => {
      setOrbIndex1((prev) => (prev + 1) % ORB_PATH_ONE.length)
    }, 3400)

    const interval2 = setInterval(() => {
      setOrbIndex2((prev) => (prev + 1) % ORB_PATH_TWO.length)
    }, 3900)

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

  const orb1 = ORB_PATH_ONE[orbIndex1]
  const orb2 = ORB_PATH_TWO[orbIndex2]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400 z-50" />

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

        <div className="absolute inset-0">
          {STAR_POINTS.map((star, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animation: `twinkle ${star.duration}s ease-in-out infinite`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-zinc-950" />
      </div>

      <div
        className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse transition-all duration-[3000ms] ease-in-out"
        style={{
          left: `${orb1.x}%`,
          top: `${orb1.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse transition-all duration-[3500ms] ease-in-out"
        style={{
          left: `${orb2.x}%`,
          top: `${orb2.y}%`,
          transform: "translate(-50%, -50%)",
          animationDelay: "1s",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-8 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="inline-block mb-4 px-5 py-2.5 border-4 border-cyan-400 bg-cyan-400/20 pixel-text text-cyan-400 text-xs">
                [ TUNISIA-BASED • YC-STYLE STRUCTURE • GLITCH DESIGN ]
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-pixel leading-tight tracking-wider">
                  <span className={`block text-white mb-3 ${glitchActive ? "animate-glitch-text" : ""}`}>GLITCH</span>
                  <span className="block text-cyan-400">BACKEND + WEB3</span>
                </h1>

                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-mono max-w-xl">
                  We build <span className="text-cyan-400 font-bold">backend infrastructure</span> and
                  <span className="text-pink-400 font-bold"> blockchain products</span> with a clear startup focus.
                </p>
                <p className="text-base md:text-lg text-zinc-300 font-mono max-w-xl">
                  We are based in <span className="text-pink-400 font-bold">Tunisia</span> and build products for global teams.
                </p>
                <p className="text-base md:text-lg text-zinc-300 font-mono max-w-xl">
                  <span className="text-yellow-400 font-bold">Backend Glitch</span> generates backends, deploys them,
                  produces docs, and gives code editing access with VPS infrastructure.
                </p>
                <p className="text-base md:text-lg text-zinc-400 font-mono max-w-xl">
                  Backend Glitch is deployed on <span className="text-cyan-400">app.backendglitch.com</span>.
                </p>
                <p className="text-base md:text-lg text-zinc-400 font-mono max-w-xl">
                  Backend Glitch is currently waiting for funding and operating money to run at full scale.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="pixel-button bg-cyan-400 text-zinc-950 border-cyan-400 px-8 py-4 text-sm font-pixel hover:bg-cyan-300"
                >
                  [ VIEW PROJECTS ]
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="pixel-button bg-transparent text-cyan-400 border-cyan-400 px-8 py-4 text-sm font-pixel hover:bg-cyan-400/10"
                >
                  [ CONTACT GLITCH ]
                </button>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative w-full aspect-square max-w-lg mx-auto h-[300px] sm:h-[400px] lg:h-auto">
                <UFO mousePosition={mousePosition} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 mt-12 border-t-4 border-zinc-800 max-w-5xl mx-auto">
            <div className="pixel-card border-cyan-400 bg-cyan-400/10 p-6 text-center">
              <div className="text-2xl md:text-3xl font-pixel text-cyan-400 mb-2">BACKEND GLITCH</div>
              <div className="text-xs font-pixel text-zinc-400">FLAGSHIP PRODUCT</div>
            </div>
            <div className="pixel-card border-pink-400 bg-pink-400/10 p-6 text-center">
              <div className="text-2xl md:text-3xl font-pixel text-pink-400 mb-2">WASLA</div>
              <div className="text-xs font-pixel text-zinc-400">DELIVERED PROJECT</div>
            </div>
            <div className="pixel-card border-yellow-400 bg-yellow-400/10 p-6 text-center">
              <div className="text-2xl md:text-3xl font-pixel text-yellow-400 mb-2 flex items-center justify-center gap-2">
                <CircleDollarSign className="h-5 w-5" /> FUNDING
              </div>
              <div className="text-xs font-pixel text-zinc-400">CURRENT PRIORITY</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
