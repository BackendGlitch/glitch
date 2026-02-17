"use client"

import { AlertCircle, CheckCircle2, ExternalLink, Rocket, Target, Zap } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

const projects = [
  {
    title: "Backend Glitch",
    description:
      "Backend generation platform, deployed on app.backendglitch.com, that creates, deploys, and documents backend services with code editing and VPS access.",
    tags: ["Backend Generator", "API Docs", "VPS", "Node.js", "DevOps"],
    color: "cyan",
    url: "http://app.backendglitch.com/",
    status: "seeking-funding",
    details: {
      overview:
        "Backend Glitch is designed to let teams launch backend systems quickly. It is deployed on app.backendglitch.com and handles backend setup, deployment flow, and documentation while keeping direct code access.",
      highlights: [
        "Generate and deploy backend services",
        "Automatic API documentation",
        "Code editing and management access",
        "VPS-backed runtime environments",
        "Git-based workflow",
      ],
      proof: [
        "Deployed at app.backendglitch.com",
        "Product direction and prototype are in place",
        "Current blocker is operating capital",
        "Open for investors and strategic partners",
      ],
      statusInfo:
        "Backend Glitch is deployed on app.backendglitch.com and is currently waiting for funding and operating money to run at full scale. We are actively looking for investor and partner support.",
    },
  },
  {
    title: "Wasla - Transport Station Management System",
    description:
      "Delivered management system for Louaj transport operations in Tunisia with queueing, booking, AI barrier control, and station-to-station sync.",
    tags: ["Go", "Electron", "React", "PostgreSQL", "Redis", "WebSocket", "AI"],
    color: "green",
    status: "delivered",
    details: {
      overview:
        "Wasla is a real deployed operations platform used by transport teams. It coordinates station workflows in real time and improves queue and booking operations.",
      highlights: [
        "Real-time queue management",
        "Booking and reservation workflow",
        "AI-powered barrier control",
        "Multi-station synchronization",
        "Operational dashboards and reporting",
      ],
      proof: [
        "Delivered and deployed in Tunisia",
        "Used in active transport operations",
        "Expansion to more stations underway",
      ],
      statusInfo: "Delivered project with active operational usage and growth roadmap.",
    },
  },
]

const colorClasses = {
  cyan: { border: "border-cyan-400", bg: "bg-cyan-400/10", text: "text-cyan-400" },
  green: { border: "border-green-400", bg: "bg-green-400/10", text: "text-green-400" },
}

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  return (
    <>
      <section id="projects" className="py-24 bg-zinc-950 border-t-4 border-yellow-400">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 text-center px-4">
            <div className="inline-block mb-6 px-4 sm:px-6 py-3 bg-yellow-400/20 border-4 border-yellow-400 pixel-text text-yellow-400 text-xs">
              [ PRODUCTS + PROOF ]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-pixel text-white mb-4 tracking-wider break-words px-2">
              WHAT WE SHIP
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto font-mono px-2">
              Clear YC-style structure: one flagship product and one delivered operational project.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => {
              const colors = colorClasses[project.color as keyof typeof colorClasses]

              return (
                <div
                  key={project.title}
                  onClick={() => setSelectedProject(project)}
                  className={`pixel-card ${colors.border} ${colors.bg} p-6 group cursor-pointer hover:scale-105 transition-transform`}
                >
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <div className="inline-block px-3 py-1 border-2 border-zinc-700 bg-zinc-900/50 pixel-text text-xs text-zinc-400">
                        [{String(index + 1).padStart(2, "0")}]
                      </div>

                      {project.status === "seeking-funding" && (
                        <div className="px-2 py-1 border-2 border-yellow-400 bg-yellow-400/10 pixel-text text-xs text-yellow-400 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> SEEKING FUNDING
                        </div>
                      )}

                      {project.status === "delivered" && (
                        <div className="px-2 py-1 border-2 border-green-400 bg-green-400/10 pixel-text text-xs text-green-400 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> DELIVERED
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <h3 className={`text-xl font-pixel ${colors.text} leading-tight`}>{project.title}</h3>
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-zinc-400 hover:text-cyan-400 transition-colors"
                          aria-label="Visit project"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <p className="text-zinc-300 mb-4 leading-relaxed font-mono text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className={`px-2 py-1 text-xs font-pixel border-2 ${colors.border} ${colors.bg} ${colors.text}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t-2 border-zinc-800">
                    <span className={`text-xs font-pixel ${colors.text} opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-2`}>
                      [ OPEN PROJECT BRIEF → ]
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className={`border-4 ${colorClasses[selectedProject.color as keyof typeof colorClasses].border} max-w-4xl`}>
            <DialogHeader>
              <DialogTitle className={colorClasses[selectedProject.color as keyof typeof colorClasses].text}>{selectedProject.title}</DialogTitle>
              <DialogDescription className="text-left mb-6 text-sm sm:text-base">{selectedProject.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h4
                  className={`text-lg font-pixel ${colorClasses[selectedProject.color as keyof typeof colorClasses].text} mb-3 flex items-center gap-2`}
                >
                  <Target className="h-5 w-5" /> OVERVIEW
                </h4>
                <p className="text-sm text-zinc-300 font-mono leading-relaxed">{selectedProject.details.overview}</p>
              </div>

              <div>
                <h4
                  className={`text-lg font-pixel ${colorClasses[selectedProject.color as keyof typeof colorClasses].text} mb-3 flex items-center gap-2`}
                >
                  <Zap className="h-5 w-5" /> HIGHLIGHTS
                </h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {selectedProject.details.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-zinc-300 font-mono">
                      <CheckCircle2
                        className={`h-4 w-4 ${colorClasses[selectedProject.color as keyof typeof colorClasses].text} mt-0.5 flex-shrink-0`}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4
                  className={`text-lg font-pixel ${colorClasses[selectedProject.color as keyof typeof colorClasses].text} mb-3 flex items-center gap-2`}
                >
                  <Rocket className="h-5 w-5" /> EXECUTION PROOF
                </h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {selectedProject.details.proof.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-zinc-300 font-mono">
                      <CheckCircle2
                        className={`h-4 w-4 ${colorClasses[selectedProject.color as keyof typeof colorClasses].text} mt-0.5 flex-shrink-0`}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`p-4 border-4 ${
                  selectedProject.status === "seeking-funding" ? "border-yellow-400 bg-yellow-400/10" : "border-green-400 bg-green-400/10"
                } rounded-sm`}
              >
                <p className="text-sm text-zinc-300 font-mono leading-relaxed">{selectedProject.details.statusInfo}</p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
