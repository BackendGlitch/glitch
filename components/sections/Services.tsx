"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad2, Code, Brain, Sparkles, Coins, Layers, CheckCircle2, Zap, Shield, Rocket } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

const services = [
  {
    title: "Blockchain Gamification",
    description: "Transform your platform with token-based rewards, NFT mechanics, staking systems, and engaging game theory models.",
    icon: Gamepad2,
    color: "text-cyan-400",
    borderColor: "border-cyan-400",
    bgColor: "bg-cyan-400/10",
    details: {
      features: [
        "Token-based reward systems",
        "NFT integration and marketplace",
        "Staking and yield mechanisms",
        "Game theory and economic models",
        "Leaderboards and achievements",
        "Quest and mission systems"
      ],
      technologies: ["Solidity", "Web3.js", "Ethers.js", "IPFS", "Next.js", "TypeScript"],
      benefits: [
        "Increased user engagement",
        "Community-driven growth",
        "Sustainable tokenomics",
        "Decentralized ownership"
      ]
    }
  },
  {
    title: "Full-Stack Web Development",
    description: "Modern, scalable web applications built with Next.js, React, TypeScript, and cutting-edge technologies.",
    icon: Code,
    color: "text-pink-400",
    borderColor: "border-pink-400",
    bgColor: "bg-pink-400/10",
    details: {
      features: [
        "Responsive and modern UI/UX",
        "Server-side rendering (SSR)",
        "API development and integration",
        "Database design and optimization",
        "Authentication and authorization",
        "Performance optimization"
      ],
      technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "Tailwind CSS"],
      benefits: [
        "Fast and scalable applications",
        "SEO-friendly architecture",
        "Modern development practices",
        "Cross-platform compatibility"
      ]
    }
  },
  {
    title: "AI Solutions",
    description: "Intelligent features powered by AI: chatbots, content generation, predictive analytics, and automated workflows.",
    icon: Brain,
    color: "text-purple-400",
    borderColor: "border-purple-400",
    bgColor: "bg-purple-400/10",
    details: {
      features: [
        "AI-powered chatbots",
        "Content generation and automation",
        "Predictive analytics",
        "Natural language processing",
        "Image and video analysis",
        "Automated workflow systems"
      ],
      technologies: ["OpenAI API", "LangChain", "Python", "TensorFlow", "PyTorch", "Next.js"],
      benefits: [
        "Enhanced user experience",
        "Automated processes",
        "Data-driven insights",
        "Cost-effective solutions"
      ]
    }
  },
  {
    title: "Game Development",
    description: "Interactive web games and game engines with real-time multiplayer, WebGL graphics, and blockchain integration.",
    icon: Sparkles,
    color: "text-yellow-400",
    borderColor: "border-yellow-400",
    bgColor: "bg-yellow-400/10",
    details: {
      features: [
        "WebGL and Canvas games",
        "Real-time multiplayer",
        "Blockchain asset integration",
        "Game engine development",
        "Physics and collision systems",
        "Audio and visual effects"
      ],
      technologies: ["Phaser", "Three.js", "Socket.io", "WebGL", "TypeScript", "Node.js"],
      benefits: [
        "Engaging user experiences",
        "Cross-platform gaming",
        "NFT and token integration",
        "Scalable multiplayer architecture"
      ]
    }
  },
  {
    title: "Smart Contracts & DeFi",
    description: "Secure smart contract development, DeFi protocols, token economics, and blockchain infrastructure.",
    icon: Coins,
    color: "text-green-400",
    borderColor: "border-green-400",
    bgColor: "bg-green-400/10",
    details: {
      features: [
        "Smart contract development",
        "DeFi protocol design",
        "Token economics and tokenomics",
        "Security audits and testing",
        "Gas optimization",
        "DAO governance systems"
      ],
      technologies: ["Solidity", "Hardhat", "Foundry", "Ethereum", "Polygon", "Arbitrum"],
      benefits: [
        "Secure and audited contracts",
        "Optimized gas costs",
        "Decentralized finance solutions",
        "Community governance"
      ]
    }
  },
  {
    title: "Web3 Integration",
    description: "Seamless wallet connections, NFT marketplaces, decentralized identity, and complete Web3 infrastructure.",
    icon: Layers,
    color: "text-cyan-400",
    borderColor: "border-cyan-400",
    bgColor: "bg-cyan-400/10",
    details: {
      features: [
        "Wallet connection (MetaMask, WalletConnect)",
        "NFT marketplace development",
        "Decentralized identity (DID)",
        "IPFS integration",
        "Blockchain data indexing",
        "Cross-chain compatibility"
      ],
      technologies: ["Wagmi", "Viem", "Ethers.js", "IPFS", "The Graph", "Next.js"],
      benefits: [
        "Seamless Web3 experience",
        "Decentralized storage",
        "Interoperable solutions",
        "User-owned data"
      ]
    }
  },
]

export default function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

  return (
    <>
      <section id="services" className="py-24 bg-zinc-950 border-t-4 border-cyan-400">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16 text-center px-4">
            <div className="inline-block mb-6 px-4 sm:px-6 py-3 bg-cyan-400/20 border-4 border-cyan-400 pixel-text text-cyan-400 text-xs">
              [ SERVICES ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-pixel text-white mb-6 tracking-wider break-words px-2">
              WHAT WE DO
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto font-mono px-2">
              As a new Tunisian Web3 startup, we're focused on delivering exceptional blockchain, 
              development, AI, and gaming solutions.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  onClick={() => setSelectedService(service)}
                  className={`pixel-card ${service.borderColor} ${service.bgColor} p-6 group cursor-pointer hover:scale-105 transition-transform`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${service.bgColor} border-4 ${service.borderColor} mb-4`}>
                      <Icon className={`h-8 w-8 ${service.color}`} />
                    </div>
                    <h3 className={`text-2xl font-pixel ${service.color} mb-3 leading-tight`}>
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-zinc-300 leading-relaxed font-mono text-sm">
                    {service.description}
                  </p>
                  <div className="mt-4 pt-4 border-t-2 border-zinc-800">
                    <span className={`text-xs font-pixel ${service.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
                      [ LEARN MORE → ]
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        {selectedService && (
          <DialogContent className={`border-4 ${selectedService.borderColor} max-w-3xl`}>
            <DialogHeader>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 ${selectedService.bgColor} border-4 ${selectedService.borderColor} flex-shrink-0`}>
                  <selectedService.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${selectedService.color}`} />
                </div>
                <DialogTitle className={selectedService.color}>
                  {selectedService.title}
                </DialogTitle>
              </div>
              <DialogDescription className="text-left mb-6 text-sm sm:text-base">
                {selectedService.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Features */}
              <div>
                <h4 className={`text-lg font-pixel ${selectedService.color} mb-3 flex items-center gap-2`}>
                  <Zap className="h-5 w-5" />
                  KEY FEATURES
                </h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {selectedService.details.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-zinc-300 font-mono">
                      <CheckCircle2 className={`h-4 w-4 ${selectedService.color} mt-0.5 flex-shrink-0`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className={`text-lg font-pixel ${selectedService.color} mb-3 flex items-center gap-2`}>
                  <Code className="h-5 w-5" />
                  TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.details.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 text-xs font-pixel border-2 ${selectedService.borderColor} ${selectedService.bgColor} ${selectedService.color}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className={`text-lg font-pixel ${selectedService.color} mb-3 flex items-center gap-2`}>
                  <Rocket className="h-5 w-5" />
                  BENEFITS
                </h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {selectedService.details.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-zinc-300 font-mono">
                      <Shield className={`h-4 w-4 ${selectedService.color} mt-0.5 flex-shrink-0`} />
                      <span>{benefit}</span>
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
