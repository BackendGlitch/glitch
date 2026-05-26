import Link from "next/link"
import { ArrowRight, GraduationCap } from "lucide-react"
import { pfeProjects } from "@/lib/pfe-projects"

export default function PFEPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-6 md:px-8 max-w-3xl">
        <div className="mb-12">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#7C3AED] mb-3 block">Academic</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-3">PFE Projects</h1>
          <p className="text-[#A0A0A0] text-sm leading-relaxed">
            Graduation projects (Projet de Fin d&apos;Études) supervised and delivered by the Glitch Inc team.
          </p>
        </div>

        <div className="space-y-4">
          {pfeProjects.map((project) => (
            <Link
              key={project.id}
              href={`/PFE/${project.id}`}
              className="block group rounded-xl border border-white/5 bg-white/[0.02] p-5 md:p-6 transition-all duration-300 hover:border-[#7C3AED]/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="h-4 w-4 text-[#7C3AED]" />
                    <span className="text-xs font-mono text-[#7C3AED]">{project.id}</span>
                  </div>
                  <h2 className="text-base md:text-lg font-heading font-bold mb-2 text-white">
                    {project.title}
                  </h2>
                  <p className="text-sm text-[#A0A0A0] line-clamp-2">
                    {project.description.slice(0, 140)}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#A0A0A0] group-hover:text-[#7C3AED] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
