"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, FileText, Target, CheckCircle2, Calendar, Code, BookOpen, Workflow } from "lucide-react"
import { getProjectById, type PFEProject } from "@/lib/pfe-projects"
import Navbar from "@/components/sections/Navbar"
import Footer from "@/components/sections/Footer"
import MermaidDiagram from "@/components/MermaidDiagram"

export default function PFEProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<PFEProject | null>(null)

  useEffect(() => {
    const projectId = params.id as string
    const foundProject = getProjectById(projectId)
    if (!foundProject) {
      router.push("/")
      return
    }
    setProject(foundProject)
  }, [params.id, router])

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white font-pixel">Loading...</div>
      </div>
    )
  }

  const colorClasses = {
    red: { border: "border-red-400", bg: "bg-red-400/10", text: "text-red-400" },
    pink: { border: "border-pink-400", bg: "bg-pink-400/10", text: "text-pink-400" },
    cyan: { border: "border-cyan-400", bg: "bg-cyan-400/10", text: "text-cyan-400" },
    yellow: { border: "border-yellow-400", bg: "bg-yellow-400/10", text: "text-yellow-400" },
    green: { border: "border-green-400", bg: "bg-green-400/10", text: "text-green-400" },
    purple: { border: "border-purple-400", bg: "bg-purple-400/10", text: "text-purple-400" },
  }

  const colors = colorClasses[project.color]
  const difficultyColors = {
    High: "text-red-400 border-red-400 bg-red-400/10",
    "Medium-High": "text-yellow-400 border-yellow-400 bg-yellow-400/10",
    Medium: "text-green-400 border-green-400 bg-green-400/10",
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 border-2 border-zinc-700 bg-zinc-900/50 hover:border-cyan-400 hover:bg-cyan-400/10 text-zinc-300 hover:text-cyan-400 transition-all font-pixel text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              [ BACK ]
            </button>
            
            <div className="mb-8">
              <div className={`inline-block mb-4 px-4 py-2 border-2 ${colors.border} ${colors.bg} pixel-text text-xs ${colors.text}`}>
                [{project.id}]
              </div>
              <h1 className={`text-4xl md:text-6xl font-pixel ${colors.text} mb-4 leading-tight`}>
                {project.title}
              </h1>
              <div className={`inline-block px-3 py-1 border-2 ${difficultyColors[project.difficulty]} pixel-text text-xs mb-6`}>
                {project.difficulty}
              </div>
              <p className="text-xl font-latex leading-relaxed max-w-3xl text-zinc-300">
                {project.description}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-10 font-latex text-zinc-200">
            {/* Project Context */}
            {project.context && (
              <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                  <FileText className="h-7 w-7" />
                  PROJECT CONTEXT
                </h2>
                <div className="prose prose-lg max-w-none">
                  <div className="text-lg md:text-xl leading-relaxed space-y-4 prose-invert">
                    {project.context.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Description */}
            <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
              <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                <FileText className="h-7 w-7" />
                PROJECT DESCRIPTION
              </h2>
              <div className="prose prose-lg max-w-none">
                <div className="text-lg md:text-xl leading-relaxed space-y-4 prose-invert">
                  {project.fullDescription.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* Objectives */}
            <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
              <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                <Target className="h-7 w-7" />
                OBJECTIVES
              </h2>
              <ul className="space-y-4">
                {project.objectives.map((objective, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                    <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                    <span className="flex-1">{objective}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Deliverables */}
            <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
              <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                <FileText className="h-7 w-7" />
                DELIVERABLES
              </h2>
              <ul className="space-y-4">
                {project.deliverables.map((deliverable, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                    <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                    <span className="flex-1">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Skills & Stack */}
            <div className="grid md:grid-cols-2 gap-6">
              <section className={`p-8 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                <h2 className={`text-2xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                  <Code className="h-6 w-6" />
                  REQUIRED SKILLS
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 text-base font-pixel border-2 ${colors.border} ${colors.bg} ${colors.text}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section className={`p-8 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                <h2 className={`text-2xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                  <Code className="h-6 w-6" />
                  TECH STACK
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-base font-pixel border-2 border-zinc-700 bg-zinc-800 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Order Lifecycle */}
            {project.orderLifecycle && project.orderLifecycle.length > 0 && (
              <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                  <Workflow className="h-7 w-7" />
                  ORDER STATE LIFECYCLE
                </h2>
                <div className="space-y-3">
                  {project.orderLifecycle.map((state, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-lg md:text-xl">
                      <div className={`w-8 h-8 flex items-center justify-center border-2 ${colors.border} ${colors.bg} ${colors.text} font-pixel text-sm flex-shrink-0`}>
                        {idx + 1}
                      </div>
                      <span className="font-latex">{state}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Educational Value */}
            {project.educationalValue && project.educationalValue.length > 0 && (
              <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                <h2 className={`text-3xl font-pixel ${colors.text} mb-6 flex items-center gap-3`}>
                  <BookOpen className="h-7 w-7" />
                  EDUCATIONAL VALUE
                </h2>
                <p className="text-lg md:text-xl mb-6 leading-relaxed text-zinc-300">
                  This project allows interns to work on the following areas:
                </p>
                <ul className="space-y-4">
                  {project.educationalValue.map((value, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-lg md:text-xl leading-relaxed">
                      <CheckCircle2 className={`h-6 w-6 ${colors.text} mt-1 flex-shrink-0`} />
                      <span className="flex-1">{value}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Timeline */}
            <section className={`p-8 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
              <h2 className={`text-2xl font-pixel ${colors.text} mb-4 flex items-center gap-3`}>
                <Calendar className="h-6 w-6" />
                TIMELINE
              </h2>
              <p className="text-2xl font-latex">{project.timeline}</p>
            </section>

            {/* Diagram Section */}
            {project.diagram && project.diagram.mermaid && (
              <section className={`p-8 md:p-10 border-4 ${colors.border} ${colors.bg} bg-zinc-900/30 rounded-sm`}>
                <h2 className={`text-3xl font-pixel ${colors.text} mb-4`}>
                  {project.diagram.title}
                </h2>
                <p className="mb-8 text-lg md:text-xl leading-relaxed text-zinc-200">
                  {project.diagram.description}
                </p>
                <div className={`p-6 border-2 ${colors.border} bg-zinc-950 rounded-sm overflow-auto`}>
                  <MermaidDiagram chart={project.diagram.mermaid} />
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
