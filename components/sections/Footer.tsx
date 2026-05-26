"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

const socials = [
  { icon: Twitter, href: "https://x.com/backend_glitch", label: "X" },
  { icon: Github, href: "https://github.com/BackendGlitch", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/backendglitch", label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-10">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-6">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Image src="/logo.png" alt="Glitch Inc" width={26} height={26} className="h-6 w-6" />
            <span className="text-sm font-heading font-bold text-white">Glitch<span className="text-[#7C3AED]">.</span></span>
          </Link>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="p-2 rounded-lg border border-white/5 text-[#A0A0A0] hover:text-[#7C3AED] hover:border-[#7C3AED]/20 transition-all">
                <s.icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-white/5">
          <p className="text-xs text-[#A0A0A0] font-mono inline-flex items-center gap-2">&copy; {new Date().getFullYear()} Glitch Inc. <TunisiaFlag className="w-4 h-2.5 rounded-sm" /> Built in Tunisia.</p>
          <div className="flex items-center gap-3">
            <a href="/PFE" className="text-xs text-[#A0A0A0] font-mono hover:text-[#7C3AED] transition-colors">PFE</a>
            <span className="text-white/5">&middot;</span>
            <p className="text-xs text-[#A0A0A0] font-mono">AI Agents &middot; Web3 &middot; Backend Systems</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function TunisiaFlag({ className }: { className?: string }) {
  return <svg viewBox="0 0 30 20" className={className} xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#E70013" /><circle cx="15" cy="10" r="5" fill="white" /><path d="M15 6.5 A4 4 0 0 0 12 10 A4 4 0 0 0 15 13.5 A3.5 3.5 0 0 1 13 10 A3.5 3.5 0 0 1 15 6.5Z" fill="#E70013" /><polygon points="16.5,7.5 15.5,8 15,7 14.5,8 13.5,7.5 14,8.5 13,9 14,9.5 13.5,10.5 14.5,10 15,11 15.5,10 16.5,10.5 16,9.5 17,9 16,8.5" fill="#E70013" /></svg>
}
