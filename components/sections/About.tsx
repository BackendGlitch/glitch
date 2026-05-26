"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

function Stat({ v, l, glitch }: { v: string; l: string; glitch?: boolean }) {
  const [inView, setInView] = useState(false)
  const [showInfinity, setShowInfinity] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => { const el = ref.current; if (!el) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); o.disconnect() } }, { threshold: 0.5 }); o.observe(el); return () => o.disconnect() }, [])

  // Swap "8" → "∞" in sync with CSS keyframe (hold phase at ~18-60% of 3.6s)
  useEffect(() => {
    if (!glitch || !inView) return
    const show = () => setShowInfinity(true)
    const hide = () => setShowInfinity(false)
    const loop = () => {
      setTimeout(show, 650)
      setTimeout(hide, 2150)
    }
    loop()
    const id = setInterval(loop, 3600)
    return () => clearInterval(id)
  }, [glitch, inView])

  return (
    <div ref={ref} className="text-center">
      <div className={`text-4xl md:text-5xl font-heading font-bold mb-2 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${glitch ? "animate-stat-glitch-infinity" : ""}`}>
        {glitch ? (showInfinity ? "∞" : "8") : v}
      </div>
      <div className="text-sm text-[#A0A0A0]">{l}</div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-black">
      <div className="container mx-auto px-6 md:px-8 max-w-2xl">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#A0A0A0] mb-3 text-center">About</p>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-5 text-center">Built in Tunisia.<br />Engineered for the World.</h2>
        <p className="text-sm text-[#A0A0A0] leading-relaxed text-center mb-5 max-w-lg mx-auto">
          We are a young startup from Tunisia building global-grade technology at the intersection of AI agents, Web3 infrastructure, and backend systems. We do not chase trends — we ship products that work.
        </p>
        <p className="inline-flex items-center gap-2 text-xs text-[#A0A0A0] font-mono justify-center w-full mb-12">
          <TunisiaFlag className="w-5 h-3.5 rounded-sm" /> Made in Tunisia — Operating globally
        </p>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-3 gap-8 max-w-sm mx-auto">
          {[{ v: "3", l: "Products Shipped" }, { v: "8", l: "Hackathon Wins", glitch: true }, { v: "1", l: "Mission" }].map((s) => <Stat key={s.l} {...s} />)}
        </motion.div>
      </div>
    </section>
  )
}

function TunisiaFlag({ className }: { className?: string }) {
  return <svg viewBox="0 0 30 20" className={className} xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#E70013" /><circle cx="15" cy="10" r="5" fill="white" /><path d="M15 6.5 A4 4 0 0 0 12 10 A4 4 0 0 0 15 13.5 A3.5 3.5 0 0 1 13 10 A3.5 3.5 0 0 1 15 6.5Z" fill="#E70013" /><polygon points="16.5,7.5 15.5,8 15,7 14.5,8 13.5,7.5 14,8.5 13,9 14,9.5 13.5,10.5 14.5,10 15,11 15.5,10 16.5,10.5 16,9.5 17,9 16,8.5" fill="#E70013" /></svg>
}
