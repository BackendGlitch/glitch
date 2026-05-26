const techs = ["Node.js", "Go", "Rust", "Python", "TypeScript", "Next.js", "PostgreSQL", "Redis", "Docker", "Solidity", "LangChain", "TensorFlow", "Claude API", "GraphQL", "WebSockets"]

export default function TechStack() {
  return (
    <section id="stack" className="py-24 md:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-4xl">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#A0A0A0] mb-3 text-center">Stack</p>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-3 text-center">Our Weapons of Choice</h2>
        <p className="text-sm text-[#A0A0A0] max-w-md mx-auto text-center mb-16">The tools we use to ship production-grade systems.</p>
      </div>
      <div className="marquee-container mb-3">
        <div className="animate-marquee flex gap-3 whitespace-nowrap">
          {[...techs, ...techs].map((t, i) => <span key={`${t}-${i}`} className="px-5 py-2.5 text-sm font-mono rounded-lg border border-white/5 bg-white/[0.02] text-[#A0A0A0] hover:text-[#7C3AED] hover:border-[#7C3AED]/20 transition-all">{t}</span>)}
        </div>
      </div>
      <div className="marquee-container">
        <div className="animate-marquee flex gap-3 whitespace-nowrap" style={{ animationDirection: "reverse", animationDuration: "28s" }}>
          {[...[...techs].reverse(), ...[...techs].reverse()].map((t, i) => <span key={`r-${t}-${i}`} className="px-5 py-2.5 text-sm font-mono rounded-lg border border-white/5 bg-white/[0.02] text-[#A0A0A0] hover:text-[#7C3AED] hover:border-[#7C3AED]/20 transition-all">{t}</span>)}
        </div>
      </div>
    </section>
  )
}
