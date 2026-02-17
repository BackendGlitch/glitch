"use client"

import { Blocks, CheckCircle2, Code, DatabaseZap, Rocket, ServerCog, Shield, Zap } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

const services = [
  {
    title: "Backend Glitch Platform",
    description:
      "Generate production-ready backends, deploy infrastructure, and publish docs with code access and VPS support.",
    icon: ServerCog,
    color: "text-cyan-400",
    borderColor: "border-cyan-400",
    bgColor: "bg-cyan-400/10",
    details: {
      features: [
        "Backend generation workflow",
        "Automatic deployment",
        "API documentation output",
        "Code editing and management",
        "VPS-backed runtime",
      ],
      technologies: ["Node.js", "Express", "MongoDB", "Docker", "VPS", "Git"],
      benefits: [
        "Faster MVP backend launch",
        "Lower ops overhead",
        "Clear API-first workflow",
        "Scalable backend foundation",
      ],
    },
  },
  {
    title: "Custom Backend Engineering",
    description:
      "Direct engineering delivery for startups that need secure APIs, database architecture, and deployment-ready systems.",
    icon: DatabaseZap,
    color: "text-pink-400",
    borderColor: "border-pink-400",
    bgColor: "bg-pink-400/10",
    details: {
      features: [
        "System and API architecture",
        "Database design and optimization",
        "Auth and permission models",
        "Monitoring and reliability setup",
      ],
      technologies: ["Node.js", "Go", "PostgreSQL", "Redis", "WebSocket", "Docker"],
      benefits: [
        "Production-grade backend design",
        "Faster execution with clear scope",
        "Operational reliability",
        "Better time to market",
      ],
    },
  },
  {
    title: "Web3 + Blockchain Development",
    description:
      "We build practical blockchain products: smart contracts, wallet integrations, token systems, and backend connectivity.",
    icon: Blocks,
    color: "text-yellow-400",
    borderColor: "border-yellow-400",
    bgColor: "bg-yellow-400/10",
    details: {
      features: [
        "Smart contract development",
        "Wallet integration",
        "Token and staking mechanics",
        "On-chain and off-chain bridge services",
      ],
      technologies: ["Solidity", "Hardhat", "Ethers.js", "Wagmi", "Next.js", "TypeScript"],
      benefits: [
        "Focused Web3 execution",
        "Secure contract and integration flow",
        "Clear business-oriented blockchain architecture",
        "Faster Web3 product launch",
      ],
    },
  },
]

export default function Services() {
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)

  return (
    <>
      <section id="services" className="py-24 bg-zinc-950 border-t-4 border-cyan-400">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16 text-center px-4">
            <div className="inline-block mb-6 px-4 sm:px-6 py-3 bg-cyan-400/20 border-4 border-cyan-400 pixel-text text-cyan-400 text-xs">
              [ STARTUP FOCUS ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-pixel text-white mb-6 tracking-wider break-words px-2">
              WHAT GLITCH BUILDS
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto font-mono px-2">
              YC-style positioning, Glitch style visuals: we stay focused on backend infrastructure and Web3/blockchain execution.
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
                    <h3 className={`text-2xl font-pixel ${service.color} mb-3 leading-tight`}>{service.title}</h3>
                  </div>
                  <p className="text-zinc-300 leading-relaxed font-mono text-sm">{service.description}</p>
                  <div className="mt-4 pt-4 border-t-2 border-zinc-800">
                    <span className={`text-xs font-pixel ${service.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
                      [ OPEN DETAILS → ]
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
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 ${selectedService.bgColor} border-4 ${selectedService.borderColor} flex-shrink-0`}
                >
                  <selectedService.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${selectedService.color}`} />
                </div>
                <DialogTitle className={selectedService.color}>{selectedService.title}</DialogTitle>
              </div>
              <DialogDescription className="text-left mb-6 text-sm sm:text-base">{selectedService.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h4 className={`text-lg font-pixel ${selectedService.color} mb-3 flex items-center gap-2`}>
                  <Zap className="h-5 w-5" /> WHAT WE DELIVER
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

              <div>
                <h4 className={`text-lg font-pixel ${selectedService.color} mb-3 flex items-center gap-2`}>
                  <Code className="h-5 w-5" /> STACK
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

              <div>
                <h4 className={`text-lg font-pixel ${selectedService.color} mb-3 flex items-center gap-2`}>
                  <Rocket className="h-5 w-5" /> WHY IT MATTERS
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
