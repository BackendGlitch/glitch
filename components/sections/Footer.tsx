"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t-4 border-green-400 bg-zinc-950 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-4 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Glitch Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-2xl font-pixel text-white">GLITCH</span>
            </Link>
            <p className="text-sm text-zinc-400 mb-4 font-mono">
              A Tunisian Web3 startup building the future of blockchain, gamification, AI, and game development.
            </p>
            <div className="flex items-center gap-2 text-sm text-zinc-500 font-mono">
              <MapPin className="h-4 w-4" />
              <span>Tunisia</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-pixel text-green-400 mb-4">[ SERVICES ]</h3>
            <ul className="space-y-2 text-sm text-zinc-400 font-mono">
              <li>
                <a href="#services" className="hover:text-green-400 transition-colors">
                  Blockchain Gamification
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-green-400 transition-colors">
                  Full-Stack Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-green-400 transition-colors">
                  AI Solutions
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-green-400 transition-colors">
                  Game Development
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-pixel text-cyan-400 mb-4">[ COMPANY ]</h3>
            <ul className="space-y-2 text-sm text-zinc-400 font-mono">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-pixel text-yellow-400 mb-4">[ CONNECT ]</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://x.com/backend_glitch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-yellow-400 transition-colors border-2 border-zinc-700 p-2 hover:border-yellow-400"
                aria-label="X (Twitter)"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/BackendGlitch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-yellow-400 transition-colors border-2 border-zinc-700 p-2 hover:border-yellow-400"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/backendglitch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-yellow-400 transition-colors border-2 border-zinc-700 p-2 hover:border-yellow-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#contact"
                className="text-zinc-400 hover:text-yellow-400 transition-colors border-2 border-zinc-700 p-2 hover:border-yellow-400"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-zinc-500 font-pixel">
              FOUNDED 2024 • TUNISIAN WEB3 STARTUP
            </p>
          </div>
        </div>
        <div className="border-t-4 border-zinc-800 pt-8 text-center">
          <p className="text-sm text-zinc-500 font-pixel">
            &copy; {new Date().getFullYear()} GLITCH. ALL RIGHTS RESERVED. | TUNISIAN WEB3 STARTUP
          </p>
        </div>
      </div>
    </footer>
  )
}
