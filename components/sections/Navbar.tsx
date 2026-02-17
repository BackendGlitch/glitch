"use client"

import Image from "next/image"
import Link from "next/link"

const links = [
  { id: "services", label: "FOCUS", color: "hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10" },
  { id: "projects", label: "PROJECTS", color: "hover:text-pink-400 hover:border-pink-400 hover:bg-pink-400/10" },
  { id: "about", label: "COMPANY", color: "hover:text-purple-400 hover:border-purple-400 hover:bg-purple-400/10" },
  { id: "contact", label: "CONTACT", color: "hover:text-yellow-400 hover:border-yellow-400 hover:bg-yellow-400/10" },
]

export default function Navbar() {
  const navigateToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const navOffset = 92
    const top = element.getBoundingClientRect().top + window.scrollY - navOffset
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b-4 border-cyan-400 bg-zinc-950/95 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Image src="/logo.png" alt="Glitch Logo" width={48} height={48} className="h-10 w-10 sm:h-12 sm:w-12" priority />
          <div>
            <span className="block text-2xl sm:text-3xl font-pixel text-white animate-glitch-text">GLITCH</span>
            <span className="block text-[10px] font-mono text-cyan-400 tracking-[0.16em]">TUNISIA-BASED • BACKEND + WEB3</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => navigateToSection(link.id)}
              className={`text-xs lg:text-sm font-pixel text-white transition-all border-2 border-transparent px-2 lg:px-4 py-2 whitespace-nowrap ${link.color}`}
            >
              [ {link.label} ]
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
