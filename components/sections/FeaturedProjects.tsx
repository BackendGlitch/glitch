"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, ArrowRight, CheckCircle2, Code, Zap, Target } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

const capabilities = [
  {
    title: "DeFi & Yield Platforms",
    description: "Building decentralized finance solutions with smart contracts, yield optimization, and automated trading strategies.",
    tags: ["Solidity", "Next.js", "Web3.js", "TypeScript", "DeFi"],
    color: "yellow",
    details: {
      overview: "We can build comprehensive DeFi platforms that enable users to lend, borrow, stake, and earn yield on their crypto assets. Our solutions include automated market makers (AMMs), liquidity pools, and yield farming mechanisms.",
      features: [
        "Smart contract-based lending and borrowing",
        "Automated yield optimization",
        "Liquidity pool management",
        "Token swapping and AMM integration",
        "Governance token systems",
        "Risk management and analytics"
      ],
      techStack: ["Solidity", "Next.js", "Web3.js", "TypeScript", "Hardhat", "The Graph", "IPFS"],
      useCases: [
        "Decentralized exchanges (DEX)",
        "Lending and borrowing protocols",
        "Yield farming platforms",
        "Staking and governance systems"
      ]
    }
  },
  {
    title: "NFT Gaming Platforms",
    description: "Creating immersive web games with NFT integration, allowing players to own, trade, and monetize digital assets.",
    tags: ["React", "WebGL", "Ethereum", "IPFS", "Game Dev"],
    color: "pink",
    details: {
      overview: "We develop engaging web-based games where players can truly own their in-game assets as NFTs. Our platforms support trading, breeding, and monetization of game assets on the blockchain.",
      features: [
        "NFT-based character and item systems",
        "In-game marketplace integration",
        "Play-to-earn mechanics",
        "Cross-game asset compatibility",
        "Real-time multiplayer gameplay",
        "Blockchain-based progression"
      ],
      techStack: ["React", "WebGL", "Ethereum", "IPFS", "Phaser", "Three.js", "Socket.io"],
      useCases: [
        "MMORPG with NFT assets",
        "Trading card games",
        "Virtual world platforms",
        "Collectible game experiences"
      ]
    }
  },
  {
    title: "Token Economics & Staking",
    description: "Designing tokenomics, staking mechanisms, and governance systems for DAOs and blockchain projects.",
    tags: ["Next.js", "Solidity", "GraphQL", "Wagmi", "Tokenomics"],
    color: "purple",
    details: {
      overview: "We design and implement comprehensive token economics systems including staking, vesting, governance, and reward distribution mechanisms for DAOs and blockchain projects.",
      features: [
        "Custom tokenomics design",
        "Staking and reward systems",
        "DAO governance integration",
        "Vesting and lockup mechanisms",
        "Token distribution automation",
        "Analytics and tracking dashboards"
      ],
      techStack: ["Next.js", "Solidity", "GraphQL", "Wagmi", "The Graph", "Hardhat"],
      useCases: [
        "DAO governance platforms",
        "Staking and yield protocols",
        "Token launch platforms",
        "Community reward systems"
      ]
    }
  },
  {
    title: "Blockchain Analytics",
    description: "Building custom explorers and analytics platforms with real-time transaction tracking and on-chain insights.",
    tags: ["React", "PostgreSQL", "WebSocket", "Ethers.js", "Analytics"],
    color: "cyan",
    details: {
      overview: "We create powerful analytics platforms that provide real-time insights into blockchain transactions, token movements, wallet activities, and on-chain metrics.",
      features: [
        "Real-time transaction monitoring",
        "Wallet and address analytics",
        "Token flow visualization",
        "Custom dashboard creation",
        "Alert and notification systems",
        "Historical data analysis"
      ],
      techStack: ["React", "PostgreSQL", "WebSocket", "Ethers.js", "The Graph", "D3.js", "Node.js"],
      useCases: [
        "Blockchain explorers",
        "Portfolio tracking tools",
        "DeFi analytics platforms",
        "On-chain research tools"
      ]
    }
  },
  {
    title: "Web3 Social Platforms",
    description: "Developing decentralized social networks with token-based rewards, content monetization, and on-chain reputation.",
    tags: ["Next.js", "IPFS", "Lens Protocol", "TypeScript", "Social"],
    color: "green",
    details: {
      overview: "We build decentralized social platforms where users own their content, earn tokens for engagement, and build on-chain reputation. Our solutions integrate with protocols like Lens and Farcaster.",
      features: [
        "Decentralized content storage (IPFS)",
        "Token-based reward systems",
        "On-chain reputation and badges",
        "NFT profile integration",
        "Decentralized messaging",
        "Community governance"
      ],
      techStack: ["Next.js", "IPFS", "Lens Protocol", "TypeScript", "Ethereum", "The Graph"],
      useCases: [
        "Decentralized Twitter alternatives",
        "Creator monetization platforms",
        "Community-driven social networks",
        "On-chain reputation systems"
      ]
    }
  },
  {
    title: "Play-to-Earn Games",
    description: "Creating multiplayer web games with blockchain integration, asset ownership, and play-to-earn mechanics.",
    tags: ["Phaser", "Socket.io", "Ethereum", "MongoDB", "P2E"],
    color: "pink",
    details: {
      overview: "We develop engaging play-to-earn games where players can earn cryptocurrency and NFTs through gameplay. Our games feature real-time multiplayer, asset ownership, and sustainable tokenomics.",
      features: [
        "Real-time multiplayer gameplay",
        "NFT asset ownership and trading",
        "Token reward systems",
        "Leaderboards and tournaments",
        "Cross-platform compatibility",
        "Sustainable economic models"
      ],
      techStack: ["Phaser", "Socket.io", "Ethereum", "MongoDB", "Node.js", "Web3.js", "IPFS"],
      useCases: [
        "Battle royale games",
        "Strategy and simulation games",
        "Racing and sports games",
        "Casual mobile-to-web games"
      ]
    }
  },
]

const colorClasses = {
  yellow: {
    border: "border-yellow-400",
    bg: "bg-yellow-400/10",
    text: "text-yellow-400",
  },
  pink: {
    border: "border-pink-400",
    bg: "bg-pink-400/10",
    text: "text-pink-400",
  },
  purple: {
    border: "border-purple-400",
    bg: "bg-purple-400/10",
    text: "text-purple-400",
  },
  cyan: {
    border: "border-cyan-400",
    bg: "bg-cyan-400/10",
    text: "text-cyan-400",
  },
  green: {
    border: "border-green-400",
    bg: "bg-green-400/10",
    text: "text-green-400",
  },
}

export default function FeaturedProjects() {
  const [selectedCapability, setSelectedCapability] = useState<typeof capabilities[0] | null>(null)

  return (
    <>
      <section id="projects" className="py-24 bg-zinc-950 border-t-4 border-yellow-400">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 text-center">
            <div className="inline-block mb-6 px-6 py-3 bg-yellow-400/20 border-4 border-yellow-400 pixel-text text-yellow-400 text-xs">
              [ CAPABILITIES ]
            </div>
            <h2 className="text-5xl md:text-7xl font-pixel text-white mb-4 tracking-wider">
              OUR CAPABILITIES
            </h2>
            <p className="text-xl text-zinc-300 max-w-3xl mx-auto font-mono">
              As a new startup, we're ready to build these types of projects. 
              Let's discuss your idea and bring it to life.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability, index) => {
              const colors = colorClasses[capability.color as keyof typeof colorClasses]
              return (
                <div
                  key={capability.title}
                  onClick={() => setSelectedCapability(capability)}
                  className={`pixel-card ${colors.border} ${colors.bg} p-6 group cursor-pointer hover:scale-105 transition-transform`}
                >
                  <div className="mb-4">
                    <div className="inline-block mb-3 px-3 py-1 border-2 border-zinc-700 bg-zinc-900/50 pixel-text text-xs text-zinc-400">
                      [{String(index + 1).padStart(2, "0")}]
                    </div>
                    <h3 className={`text-xl font-pixel ${colors.text} mb-3 leading-tight`}>
                      {capability.title}
                    </h3>
                  </div>
                  <p className="text-zinc-300 mb-4 leading-relaxed font-mono text-sm">
                    {capability.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {capability.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-xs font-pixel border-2 ${colors.border} ${colors.bg} ${colors.text}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 border-t-2 border-zinc-800">
                    <span className={`text-xs font-pixel ${colors.text} opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-2`}>
                      [ EXPLORE → ]
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedCapability} onOpenChange={(open) => !open && setSelectedCapability(null)}>
        {selectedCapability && (
          <DialogContent className={`border-4 ${colorClasses[selectedCapability.color as keyof typeof colorClasses].border} max-w-3xl`}>
            <DialogHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-block px-3 py-1 border-2 border-zinc-700 bg-zinc-900/50 pixel-text text-xs text-zinc-400">
                  [{String(capabilities.indexOf(selectedCapability) + 1).padStart(2, "0")}]
                </div>
                <DialogTitle className={colorClasses[selectedCapability.color as keyof typeof colorClasses].text}>
                  {selectedCapability.title}
                </DialogTitle>
              </div>
              <DialogDescription className="text-left mb-6">
                {selectedCapability.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Overview */}
              <div>
                <h4 className={`text-lg font-pixel ${colorClasses[selectedCapability.color as keyof typeof colorClasses].text} mb-3 flex items-center gap-2`}>
                  <Target className="h-5 w-5" />
                  OVERVIEW
                </h4>
                <p className="text-sm text-zinc-300 font-mono leading-relaxed">
                  {selectedCapability.details.overview}
                </p>
              </div>

              {/* Features */}
              <div>
                <h4 className={`text-lg font-pixel ${colorClasses[selectedCapability.color as keyof typeof colorClasses].text} mb-3 flex items-center gap-2`}>
                  <Zap className="h-5 w-5" />
                  KEY FEATURES
                </h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {selectedCapability.details.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-zinc-300 font-mono">
                      <CheckCircle2 className={`h-4 w-4 ${colorClasses[selectedCapability.color as keyof typeof colorClasses].text} mt-0.5 flex-shrink-0`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className={`text-lg font-pixel ${colorClasses[selectedCapability.color as keyof typeof colorClasses].text} mb-3 flex items-center gap-2`}>
                  <Code className="h-5 w-5" />
                  TECH STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCapability.details.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 text-xs font-pixel border-2 ${colorClasses[selectedCapability.color as keyof typeof colorClasses].border} ${colorClasses[selectedCapability.color as keyof typeof colorClasses].bg} ${colorClasses[selectedCapability.color as keyof typeof colorClasses].text}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <h4 className={`text-lg font-pixel ${colorClasses[selectedCapability.color as keyof typeof colorClasses].text} mb-3 flex items-center gap-2`}>
                  <Rocket className="h-5 w-5" />
                  USE CASES
                </h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {selectedCapability.details.useCases.map((useCase, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-zinc-300 font-mono">
                      <CheckCircle2 className={`h-4 w-4 ${colorClasses[selectedCapability.color as keyof typeof colorClasses].text} mt-0.5 flex-shrink-0`} />
                      <span>{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
