"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Blocks, Server, Plus, RotateCw, Scissors } from "lucide-react"

const tabs = [
  { id: "ai", label: "AI", icon: Brain, bigIcon: Plus, title: "AI Development & Agents", desc: "Autonomous AI agents, LLM-powered systems, voice interfaces, and custom model fine-tuning. We build intelligent software that reasons, acts, and scales.", bullets: ["LLM integration & fine-tuning", "Autonomous agent development", "Voice AI & multimodal systems"] },
  { id: "web3", label: "Web3", icon: Blocks, bigIcon: RotateCw, title: "Web3 & Blockchain", desc: "Smart contracts, DeFi infrastructure, permissioned blockchains, and tokenization. Production-grade on-chain systems engineered for real-world use.", bullets: ["Smart contract development", "DeFi & wallet infrastructure", "On-chain + off-chain bridging"] },
  { id: "backend", label: "Backend", icon: Server, bigIcon: Scissors, title: "Backend Systems", desc: "Scalable APIs, real-time infrastructure, automated backend generation, and VPS orchestration. The invisible layer that powers everything we build.", bullets: ["Scalable API architecture", "Real-time & event-driven systems", "Automated backend generation"] },
]

export default function Services() {
  const [active, setActive] = useState("ai")
  const c = tabs.find((t) => t.id === active)!

  return (
    <section id="services" className="py-24 md:py-32 bg-black">
      <div className="container mx-auto px-6 md:px-8 max-w-3xl">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#A0A0A0] mb-16 text-center">What We Do</p>

        <div className="flex items-center justify-center gap-1 mb-16">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActive(t.id)} className={`relative px-5 py-2 text-sm font-medium rounded-lg transition-all ${active === t.id ? "text-[#7C3AED]" : "text-[#A0A0A0] hover:text-white"}`}>
              {t.label}
              {active === t.id && <motion.div layoutId="activeTab" className="absolute inset-0 bg-[#7C3AED]/10 rounded-lg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="text-center">
            <div className="mb-8"><c.bigIcon className="h-14 w-14 text-[#7C3AED] mx-auto stroke-1" /></div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">{c.title}</h3>
            <p className="text-sm md:text-base text-[#A0A0A0] max-w-lg mx-auto mb-8 leading-relaxed">{c.desc}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {c.bullets.map((b) => <span key={b} className="px-4 py-2 text-sm rounded-lg bg-white/5 border border-white/5 text-[#A0A0A0]">{b}</span>)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
