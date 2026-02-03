"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b-4 border-cyan-400 bg-zinc-950/95 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity group">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Glitch Logo"
              width={48}
              height={48}
              className="h-12 w-12 group-hover:scale-110 transition-transform"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={() => scrollToSection("services")}
            className="text-sm font-pixel text-white transition-all hover:text-cyan-400 border-2 border-transparent hover:border-cyan-400 px-4 py-2 hover:bg-cyan-400/10"
          >
            [ SERVICES ]
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-sm font-pixel text-white transition-all hover:text-pink-400 border-2 border-transparent hover:border-pink-400 px-4 py-2 hover:bg-pink-400/10"
          >
            [ CAPABILITIES ]
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm font-pixel text-white transition-all hover:text-purple-400 border-2 border-transparent hover:border-purple-400 px-4 py-2 hover:bg-purple-400/10"
          >
            [ ABOUT ]
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-pixel text-white transition-all hover:text-yellow-400 border-2 border-transparent hover:border-yellow-400 px-4 py-2 hover:bg-yellow-400/10"
          >
            [ CONTACT ]
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-zinc-400 hover:text-cyan-400 transition-colors border-2 border-zinc-700 p-2 hover:border-cyan-400"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-4 border-cyan-400 bg-zinc-950/98 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left text-sm font-pixel text-white hover:text-cyan-400 py-3 border-2 border-transparent hover:border-cyan-400 px-4 transition-all hover:bg-cyan-400/10"
            >
              [ SERVICES ]
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left text-sm font-pixel text-white hover:text-pink-400 py-3 border-2 border-transparent hover:border-pink-400 px-4 transition-all hover:bg-pink-400/10"
            >
              [ CAPABILITIES ]
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left text-sm font-pixel text-white hover:text-purple-400 py-3 border-2 border-transparent hover:border-purple-400 px-4 transition-all hover:bg-purple-400/10"
            >
              [ ABOUT ]
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left text-sm font-pixel text-white hover:text-yellow-400 py-3 border-2 border-transparent hover:border-yellow-400 px-4 transition-all hover:bg-yellow-400/10"
            >
              [ CONTACT ]
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
