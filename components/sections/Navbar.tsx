"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b-4 border-cyan-400 bg-zinc-950/95 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity group flex-shrink-0 gap-3">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Glitch Logo"
              width={48}
              height={48}
              className="h-10 w-10 sm:h-12 sm:w-12 group-hover:scale-110 transition-transform"
              priority
            />
          </div>
          {/* GLITCH text with glitch effect - visible on all screens */}
          <span className="text-2xl sm:text-3xl font-pixel text-white animate-glitch-text">
            GLITCH
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <button
            onClick={() => scrollToSection("services")}
            className="text-xs lg:text-sm font-pixel text-white transition-all hover:text-cyan-400 border-2 border-transparent hover:border-cyan-400 px-2 lg:px-4 py-2 hover:bg-cyan-400/10 whitespace-nowrap"
          >
            [ SERVICES ]
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-xs lg:text-sm font-pixel text-white transition-all hover:text-pink-400 border-2 border-transparent hover:border-pink-400 px-2 lg:px-4 py-2 hover:bg-pink-400/10 whitespace-nowrap"
          >
            [ CAPABILITIES ]
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-xs lg:text-sm font-pixel text-white transition-all hover:text-purple-400 border-2 border-transparent hover:border-purple-400 px-2 lg:px-4 py-2 hover:bg-purple-400/10 whitespace-nowrap"
          >
            [ ABOUT ]
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-xs lg:text-sm font-pixel text-white transition-all hover:text-yellow-400 border-2 border-transparent hover:border-yellow-400 px-2 lg:px-4 py-2 hover:bg-yellow-400/10 whitespace-nowrap"
          >
            [ CONTACT ]
          </button>
        </div>

        {/* Mobile menu button - Only visible on mobile */}
        <button
          className="md:hidden flex text-white hover:text-cyan-400 transition-all border-2 border-zinc-700 p-2.5 hover:border-cyan-400 flex-shrink-0 z-[60] relative bg-zinc-900 hover:bg-zinc-800 active:scale-95 w-[44px] h-[44px] items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          type="button"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-cyan-400" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-4 border-cyan-400 bg-zinc-950 backdrop-blur-md fixed top-20 left-0 right-0 bottom-0 overflow-y-auto z-[100] w-full">
          <div className="w-full px-4 py-6 space-y-3">
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left text-sm font-pixel text-white hover:text-cyan-400 py-3 border-2 border-transparent hover:border-cyan-400 px-4 transition-all hover:bg-cyan-400/10 rounded-sm"
            >
              [ SERVICES ]
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="block w-full text-left text-sm font-pixel text-white hover:text-pink-400 py-3 border-2 border-transparent hover:border-pink-400 px-4 transition-all hover:bg-pink-400/10 rounded-sm"
            >
              [ CAPABILITIES ]
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left text-sm font-pixel text-white hover:text-purple-400 py-3 border-2 border-transparent hover:border-purple-400 px-4 transition-all hover:bg-purple-400/10 rounded-sm"
            >
              [ ABOUT ]
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left text-sm font-pixel text-white hover:text-yellow-400 py-3 border-2 border-transparent hover:border-yellow-400 px-4 transition-all hover:bg-yellow-400/10 rounded-sm"
            >
              [ CONTACT ]
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
