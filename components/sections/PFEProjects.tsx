"use client"

import { Rocket } from "lucide-react"
import Link from "next/link"
import { pfeProjects } from "@/lib/pfe-projects"

const difficultyColors = {
  High: "text-red-400 border-red-400 bg-red-400/10",
  "Medium-High": "text-yellow-400 border-yellow-400 bg-yellow-400/10",
  Medium: "text-green-400 border-green-400 bg-green-400/10",
}

const colorClasses = {
  red: { border: "border-red-400", bg: "bg-red-400/10", text: "text-red-400" },
  pink: { border: "border-pink-400", bg: "bg-pink-400/10", text: "text-pink-400" },
  cyan: { border: "border-cyan-400", bg: "bg-cyan-400/10", text: "text-cyan-400" },
  yellow: { border: "border-yellow-400", bg: "bg-yellow-400/10", text: "text-yellow-400" },
  green: { border: "border-green-400", bg: "bg-green-400/10", text: "text-green-400" },
  purple: { border: "border-purple-400", bg: "bg-purple-400/10", text: "text-purple-400" },
}

export default function PFEProjects() {
  return (
    <section id="pfe" className="py-24 bg-zinc-950 border-t-4 border-purple-400">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 text-center px-4">
          <div className="inline-block mb-6 px-4 sm:px-6 py-3 bg-purple-400/20 border-4 border-purple-400 pixel-text text-purple-400 text-xs">
            [ INTERNSHIP OPPORTUNITIES ]
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-pixel text-white mb-4 tracking-wider break-words px-2">
            PFE / INTERNSHIP PROJECTS
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto font-mono px-2">
            As a new startup, we're looking for talented students and interns to join our team. 
            Explore exciting project opportunities and help us build the future of Web3.
          </p>
        </div>
        <div className="max-w-4xl mx-auto px-2 sm:px-0">
          <div className="space-y-4">
            {pfeProjects.map((project, index) => {
              const colors = colorClasses[project.color as keyof typeof colorClasses]
              const diffColor = difficultyColors[project.difficulty as keyof typeof difficultyColors]
              return (
                <Link
                  key={project.id}
                  href={`/PFE/${project.id}`}
                  className={`block pixel-card ${colors.border} ${colors.bg} p-4 sm:p-6 cursor-pointer hover:scale-[1.02] transition-transform overflow-hidden`}
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <span className={`px-2 py-1 border-2 ${colors.border} ${colors.bg} pixel-text text-xs ${colors.text} flex-shrink-0 w-fit`}>
                          [{project.id}]
                        </span>
                        <h3 className={`text-lg sm:text-xl font-pixel ${colors.text} leading-tight break-words`}>
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-zinc-300 leading-relaxed font-mono text-sm mb-4 break-words">
                        {project.description}
                      </p>
                    </div>
                    <div className={`px-3 py-1 border-2 ${diffColor} pixel-text text-xs flex-shrink-0 self-start sm:self-auto`}>
                      {project.difficulty}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="min-w-0">
                      <h4 className="text-xs font-pixel text-zinc-400 mb-2">[ REQUIRED SKILLS ]</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className={`px-2 py-1 text-xs font-pixel border-2 ${colors.border} ${colors.bg} ${colors.text} break-words`}
                          >
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 3 && (
                          <span className="px-2 py-1 text-xs font-pixel border-2 border-zinc-700 bg-zinc-900/50 text-zinc-400 flex-shrink-0">
                            +{project.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-pixel text-zinc-400 mb-2">[ TECH STACK ]</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-pixel border-2 border-zinc-700 bg-zinc-900/50 text-zinc-300 break-words"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 3 && (
                          <span className="px-2 py-1 text-xs font-pixel border-2 border-zinc-700 bg-zinc-900/50 text-zinc-400 flex-shrink-0">
                            +{project.stack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t-2 border-zinc-800">
                    <span className={`text-xs font-pixel ${colors.text} opacity-70 flex items-center gap-2`}>
                      [ VIEW DETAILS → ]
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
