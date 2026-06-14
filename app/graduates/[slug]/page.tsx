import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getGraduateBySlug } from "@/lib/graduates"
import Navbar from "@/components/sections/Navbar"
import Footer from "@/components/sections/Footer"
import GraduateGlitchCard from "@/components/sections/GraduateGlitchCard"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const grad = getGraduateBySlug(slug)
  if (!grad) return { title: "Not Found" }

  return {
    title: `${grad.name} — ${grad.title}`,
    description: `${grad.name} built the full ${grad.project} platform at Glitch Inc as his PFE graduation project. Class of ${grad.class}.`,
    openGraph: {
      title: `${grad.name} — ${grad.title}`,
      description: `${grad.name} built ${grad.project} at Glitch Inc — full-stack: frontend, backend, and printer agent. Class of ${grad.class}.`,
      images: [grad.photo],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${grad.name} — ${grad.title}`,
      description: `${grad.name} built ${grad.project} at Glitch Inc. Class of ${grad.class}.`,
      images: [grad.photo],
    },
  }
}

export default async function GraduatePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const grad = getGraduateBySlug(slug)
  if (!grad) notFound()

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-xl">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-white/5 bg-white/[0.02] text-[#A0A0A0] hover:text-white hover:border-[#7C3AED]/30 transition-all font-heading text-sm rounded-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Glitch Inc
          </Link>

          {/* Glitch Card */}
          <GraduateGlitchCard grad={grad} />

          {/* Screenshot hint */}
          <p className="text-center text-[11px] text-[#A0A0A0]/40 font-mono mt-6">
            Screenshot this card &amp; share it on Instagram 🎓
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
