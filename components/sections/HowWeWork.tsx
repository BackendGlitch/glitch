"use client"

import { Search, PenTool, Wrench, Rocket } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  { num: "01", icon: Search, title: "Discover", desc: "We dig into your problem space, map the architecture, define scope." },
  { num: "02", icon: PenTool, title: "Architect", desc: "System design, tech selection, API contracts — all planned before code." },
  { num: "03", icon: Wrench, title: "Build", desc: "Iterative development, CI, code review, weekly demos." },
  { num: "04", icon: Rocket, title: "Ship", desc: "Deploy, monitor, document, handover. We stay until it's stable." },
]

export default function HowWeWork() {
  return (
    <section id="process" className="py-24 md:py-32 bg-black">
      <div className="container mx-auto px-6 md:px-8 max-w-4xl">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#A0A0A0] mb-3 text-center">Process</p>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-3 text-center">How We Work</h2>
        <p className="text-sm text-[#A0A0A0] max-w-md mx-auto text-center mb-16">Proven process. Refined across products.</p>

        <div className="hidden md:grid grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="relative text-center">
              {i < 3 && <div className="absolute top-8 left-[calc(50%+20px)] w-[calc(100%-40px)] h-[1px] bg-white/5" />}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/[0.03] border border-white/5 mb-4">
                <s.icon className="h-6 w-6 text-[#7C3AED] stroke-1" />
              </div>
              <div className="text-xs font-mono text-[#7C3AED] mb-2">{s.num}</div>
              <h3 className="text-base font-heading font-bold text-white mb-1">{s.title}</h3>
              <p className="text-sm text-[#A0A0A0] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden space-y-8">
          {steps.map((s, i) => (
            <motion.div key={s.num} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex gap-4 items-start">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center"><s.icon className="h-5 w-5 text-[#7C3AED] stroke-1" /></div>
                {i < 3 && <div className="w-[1px] h-8 bg-white/5 mt-1" />}
              </div>
              <div>
                <div className="text-xs font-mono text-[#7C3AED] mb-1">{s.num}</div>
                <h3 className="text-base font-heading font-bold text-white mb-1">{s.title}</h3>
                <p className="text-sm text-[#A0A0A0]">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
