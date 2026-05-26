"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" })
  }

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
      <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-6 md:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          
          <span className="text-md  font-heading font-bold text-white tracking-tight">
            <span className="text-lg font-mono font-bold text-[#7C3AED] tracking-tight">Backend</span>
          <span className="text-[#7C3AED] text-xl font-bold">.</span>
            Glitch<span className="text-[#7C3AED] text-xl font-bold">.</span>Inc
          </span>
        </Link>

        <div className="hidden md:flex items-center rounded-lg border border-white/5 overflow-hidden">
          <button onClick={() => scrollTo("contact")} className="px-5 py-2 text-sm font-medium bg-[#7C3AED] text-white hover:bg-[#6D28D9] transition-colors">
            + Inquire
          </button>
          <button onClick={() => scrollTo("products")} className="px-5 py-2 text-sm font-medium text-[#A0A0A0] hover:text-white transition-colors">
            &bull; Explore Work
          </button>
        </div>

        <button onClick={() => scrollTo("contact")} className="hidden md:block px-4 py-2 text-sm font-medium border border-white/5 rounded-lg text-[#A0A0A0] hover:text-white hover:border-[#7C3AED]/30 transition-all">
          Drop Us a Line
        </button>

        <button onClick={() => scrollTo("contact")} className="md:hidden px-4 py-2 text-xs font-semibold bg-[#7C3AED] text-white rounded-lg">
          + Inquire
        </button>
      </div>
    </nav>
  )
}
