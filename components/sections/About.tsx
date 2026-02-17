"use client"

import { Flag, Handshake, MapPin, Target, Zap } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-zinc-950 to-purple-950/20 border-t-4 border-purple-400">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center px-4">
            <div className="inline-block mb-6 px-4 sm:px-6 py-3 bg-purple-400/20 border-4 border-purple-400 pixel-text text-purple-400 text-xs">
              [ COMPANY ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-pixel text-white mb-6 tracking-wider break-words px-2">
              ABOUT GLITCH
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto font-mono px-2">
              Tunisia-based startup focused on one clear lane: backend infrastructure + Web3/blockchain execution.
            </p>
          </div>

          <div className="mb-12 pixel-card border-pink-400 bg-pink-400/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 border-4 border-pink-400 bg-pink-400/20 flex items-center justify-center mb-4 md:mb-0">
                <MapPin className="h-8 w-8 text-pink-400" />
              </div>
              <div>
                <h3 className="text-3xl font-pixel text-pink-400 mb-4">BUILT IN TUNISIA. AIMED AT GLOBAL EXECUTION.</h3>
                <p className="text-zinc-300 leading-relaxed text-lg font-mono">
                  We started in 2024 and chose focus over noise. Glitch is structured like a YC startup profile: clear product,
                  clear capability, clear proof. We build and ship backend and blockchain systems with measurable outcomes.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="pixel-card border-cyan-400 bg-cyan-400/10 p-6">
              <div className="flex items-start gap-4">
                <Flag className="h-8 w-8 text-cyan-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-pixel text-cyan-400 mb-2">OUR POSITIONING</h3>
                  <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                    We do not present as a do-everything agency. We focus on backend architecture and Web3/blockchain products.
                  </p>
                </div>
              </div>
            </div>

            <div className="pixel-card border-yellow-400 bg-yellow-400/10 p-6">
              <div className="flex items-start gap-4">
                <Zap className="h-8 w-8 text-yellow-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-pixel text-yellow-400 mb-2">CURRENT PRIORITY</h3>
                  <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                    Launch Backend Glitch at full capacity by securing funding and operating capital.
                  </p>
                </div>
              </div>
            </div>

            <div className="pixel-card border-green-400 bg-green-400/10 p-6">
              <div className="flex items-start gap-4">
                <Target className="h-8 w-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-pixel text-green-400 mb-2">EXECUTION PROOF</h3>
                  <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                    Wasla is already delivered and used in transport station operations in Tunisia.
                  </p>
                </div>
              </div>
            </div>

            <div className="pixel-card border-purple-400 bg-purple-400/10 p-6">
              <div className="flex items-start gap-4">
                <Handshake className="h-8 w-8 text-purple-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-pixel text-purple-400 mb-2">PARTNERSHIPS</h3>
                  <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                    Open to strategic partners, founders, and investors who align with backend and blockchain products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
