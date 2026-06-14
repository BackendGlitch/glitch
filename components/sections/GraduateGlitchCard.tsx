"use client"

import Image from "next/image"
import { GraduationCap, ExternalLink, Github, Linkedin, Instagram, Globe } from "lucide-react"
import GraduateShareButtons from "./GraduateShareButtons"

interface Graduate {
  slug: string
  name: string
  title: string
  class: string
  photo: string
  project: string
  projectUrl: string
  statement: string
  contribution: string
  links: {
    label: string
    href: string
    icon: "github" | "linkedin" | "instagram" | "globe"
  }[]
}

const linkIconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  globe: Globe,
}

export default function GraduateGlitchCard({ grad }: { grad: Graduate }) {
  return (
    <div className="relative">
      {/* Outer glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#7C3AED]/30 via-[#00FFFF]/10 to-[#FF00FF]/20 blur-xl opacity-50" />

      {/* Main Card */}
      <div className="relative glitch-card glitch-border rounded-2xl border border-[#7C3AED]/20 bg-black overflow-hidden scanlines">
        {/* Tracking line */}
        <div className="glitch-tracking-line" />

        {/* Photo Section */}
        <div className="relative aspect-[16/10] bg-gradient-to-b from-[#7C3AED]/5 to-black overflow-hidden glitch-photo-container">
          <Image
            src={grad.photo}
            alt={grad.name}
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/10 via-transparent to-[#00FFFF]/5 z-10" />

          {/* Top badges row */}
          <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-[#7C3AED]/30 backdrop-blur-md">
              <span className="text-[10px] font-mono text-[#7C3AED] tracking-wider">GLITCH INC</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-[#7C3AED]/30 backdrop-blur-md">
              <GraduationCap className="h-3.5 w-3.5 text-[#7C3AED]" />
              <span className="text-[10px] font-mono text-[#7C3AED] tracking-wider">CLASS OF {grad.class}</span>
            </div>
          </div>

          {/* Bottom name overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 pb-5">
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white glitch-text mb-1">
              {grad.name}
            </h1>
            <p className="text-sm md:text-base text-[#A0A0A0] font-heading">
              {grad.title}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 space-y-5 relative z-10 bg-black/80">
          {/* Statement */}
          <div className="p-4 rounded-xl bg-[#7C3AED]/5 border border-[#7C3AED]/10">
            <p className="text-sm text-[#A0A0A0] leading-relaxed">
              {grad.statement}
            </p>
          </div>

          {/* Contribution badge */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 text-[10px] font-mono rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED]">
              Full-Stack: Frontend
            </span>
            <span className="px-3 py-1.5 text-[10px] font-mono rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED]">
              Backend &amp; API
            </span>
            <span className="px-3 py-1.5 text-[10px] font-mono rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED]">
              Printer Agent
            </span>
            <span className="px-3 py-1.5 text-[10px] font-mono rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B]">
              {grad.project} Preview ↓
            </span>
          </div>

          {/* Link pills */}
          <div className="flex flex-wrap gap-2.5">
            {grad.links.map((link) => {
              const Icon = linkIconMap[link.icon]
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-sm text-[#A0A0A0] hover:text-white hover:border-[#7C3AED]/30 transition-all"
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-heading text-xs">{link.label}</span>
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </a>
              )
            })}
          </div>

          {/* Divider */}
          <div className="border-t border-white/5" />

          {/* Share Section */}
          <div>
            <GraduateShareButtons
              name={grad.name}
              title={grad.title}
              url={`https://backendglitch.com/graduates/${grad.slug}`}
            />
          </div>

          {/* Footer branding */}
          <div className="text-center pt-2">
            <p className="text-[10px] text-[#A0A0A0]/40 font-mono tracking-[0.15em] uppercase">
              Built at <span className="text-[#7C3AED]/60">Glitch</span> Inc · PFE {grad.class}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
