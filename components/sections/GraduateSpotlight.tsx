"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, GraduationCap } from "lucide-react"
import { graduates } from "@/lib/graduates"

export default function GraduateSpotlight() {
  if (graduates.length === 0) return null

  return (
    <section className="py-24 md:py-32 bg-black">
      <div className="container mx-auto px-6 md:px-8 max-w-4xl">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#A0A0A0] mb-3 text-center">
          Graduate Spotlight
        </p>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-3 text-center">
          Fresh Talent
        </h2>
        <p className="text-sm text-[#A0A0A0] max-w-md mx-auto text-center mb-16">
          The people who build real products during their PFE at Glitch Inc.
        </p>

        <div className="flex flex-col gap-4">
          {graduates.map((grad, i) => (
            <motion.div
              key={grad.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden hover:border-[#7C3AED]/20 transition-all duration-300"
            >
              <div className="grid md:grid-cols-5">
                {/* Photo */}
                <div className="md:col-span-2 relative aspect-[4/3] md:aspect-auto bg-gradient-to-br from-[#7C3AED]/10 to-black/50 overflow-hidden">
                  <Image
                    src={grad.photo}
                    alt={grad.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60" />
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-[#7C3AED]/20 backdrop-blur-sm">
                    <GraduationCap className="h-3 w-3 text-[#7C3AED]" />
                    <span className="text-[10px] font-mono text-[#7C3AED] tracking-wider uppercase">
                      Class of {grad.class}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-6 md:p-7 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-mono tracking-[0.15em] uppercase text-[#7C3AED] mb-2">
                      PFE Graduate
                    </p>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-1">
                      {grad.name}
                    </h3>
                    <p className="text-sm text-[#A0A0A0] mb-3">{grad.title}</p>
                    <p className="text-sm text-[#A0A0A0]/70 leading-relaxed line-clamp-2 mb-4">
                      {grad.contribution}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {grad.links.slice(0, 3).map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border border-white/5 bg-white/[0.02] text-[#A0A0A0] hover:text-white hover:border-[#7C3AED]/20 transition-all"
                      >
                        {link.label} <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                    <Link
                      href={`/graduates/${grad.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#7C3AED] text-white hover:bg-[#6D28D9] transition-all"
                    >
                      Graduate Card <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
