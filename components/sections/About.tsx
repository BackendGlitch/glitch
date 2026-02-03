"use client"

import { MapPin, Rocket, Target, Zap, Code, Brain, Gamepad2 } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-zinc-950 to-purple-950/20 border-t-4 border-purple-400">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-block mb-6 px-6 py-3 bg-purple-400/20 border-4 border-purple-400 pixel-text text-purple-400 text-xs">
              [ ABOUT US ]
            </div>
            <h2 className="text-5xl md:text-7xl font-pixel text-white mb-6 tracking-wider">
              ABOUT GLITCH
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto font-mono">
              We're a fresh Web3 startup based in Tunisia, passionate about blockchain technology, 
              gamification, and innovative software solutions.
            </p>
          </div>
          
          {/* Main Story Card */}
          <div className="mb-12 pixel-card border-pink-400 bg-pink-400/10 p-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 border-4 border-pink-400 bg-pink-400/20 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-pink-400" />
              </div>
              <div>
                <h3 className="text-3xl font-pixel text-pink-400 mb-4">BORN IN TUNISIA, BUILT FOR THE WORLD</h3>
                <p className="text-zinc-300 leading-relaxed text-lg font-mono">
                  Glitch was founded in 2024 as a Web3 blockchain startup in Tunisia. We believe that 
                  great innovation can come from anywhere, and we're proud to be part of Tunisia's growing 
                  tech ecosystem. Our mission is to create cutting-edge blockchain solutions, gamification 
                  platforms, and web applications that make a real impact.
                </p>
              </div>
            </div>
          </div>

          {/* What We Do Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="pixel-card border-cyan-400 bg-cyan-400/10 p-6">
              <div className="flex items-start gap-4">
                <Zap className="h-8 w-8 text-cyan-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-pixel text-cyan-400 mb-2">
                    BLOCKCHAIN GAMIFICATION
                  </h3>
                  <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                    We specialize in creating engaging Web3 experiences through token economics, 
                    NFT mechanics, and innovative game theory models that drive user engagement.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pixel-card border-yellow-400 bg-yellow-400/10 p-6">
              <div className="flex items-start gap-4">
                <Code className="h-8 w-8 text-yellow-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-pixel text-yellow-400 mb-2">
                    FULL-STACK DEVELOPMENT
                  </h3>
                  <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                    From frontend to backend, we build scalable, production-ready applications 
                    using modern technologies like Next.js, React, TypeScript, and cloud infrastructure.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pixel-card border-purple-400 bg-purple-400/10 p-6">
              <div className="flex items-start gap-4">
                <Brain className="h-8 w-8 text-purple-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-pixel text-purple-400 mb-2">
                    AI-POWERED SOLUTIONS
                  </h3>
                  <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                    We integrate cutting-edge AI technologies to enhance user experiences, 
                    automate workflows, and provide intelligent insights for your business.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pixel-card border-green-400 bg-green-400/10 p-6">
              <div className="flex items-start gap-4">
                <Gamepad2 className="h-8 w-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-pixel text-green-400 mb-2">
                    GAME DEVELOPMENT
                  </h3>
                  <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                    We create immersive web games and interactive experiences with real-time 
                    multiplayer capabilities and seamless blockchain integration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="pixel-card border-cyan-400 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 p-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 border-4 border-cyan-400 bg-cyan-400/20 flex items-center justify-center">
                <Target className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-3xl font-pixel text-cyan-400 mb-4">OUR VISION</h3>
                <p className="text-zinc-200 leading-relaxed text-lg font-mono">
                  As a new startup, we're building something special. We're not just another tech company—we're 
                  a team of passionate developers, designers, and blockchain enthusiasts who believe in the power 
                  of Web3 technology. We're here to create innovative solutions, push boundaries, and help bring 
                  the decentralized future to life. Join us on this journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
