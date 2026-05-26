"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink, MapPin, Wifi, Printer, Zap, Cpu, Globe, QrCode, Shield, Wallet, Box, Blocks, Smartphone, Clock, Package } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

/* ============================================
   NEXAPAY VIRTUAL CARD (2D that looks 3D)
   ============================================ */
function VirtualCard() {
  return (
    <div className="perspective-card flex justify-center">
      <div className="virtual-card p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="virtual-card-chip" />
          <Wifi className="h-4 w-4 text-white/30 rotate-90" />
        </div>
        <div>
          <Image src="/nexapay_logo.png" alt="NexaPay" width={100} height={24} className="h-5 w-auto object-contain object-left brightness-0 invert opacity-80" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-mono text-white/20 tracking-[0.12em] uppercase">Blockchain Wallet</span>
          <span className="text-[8px] font-mono text-white/20 tracking-[0.12em] uppercase">Tunisia</span>
        </div>
      </div>
    </div>
  )
}

/* ============================================
   WASLA MAP PREVIEW
   ============================================ */
function WaslaMapPreview() {
  return (
    <div className="relative rounded-xl overflow-hidden border border-[#7C3AED]/10 bg-black/50">
      <Image src="/tn.svg" alt="Tunisia Map" width={260} height={340} className="w-full h-auto map-dark" />
      <div className="absolute top-[22%] right-[22%] flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
        <span className="text-[8px] font-mono text-[#7C3AED]">Monastir</span>
      </div>
      <div className="absolute top-[14%] right-[18%] flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" style={{ animation: "pulse-dot 2.5s ease-in-out infinite 0.3s" }} />
        <span className="text-[8px] font-mono text-[#7C3AED]">Nabeul</span>
      </div>
    </div>
  )
}

/* ============================================
   PRODUCT DATA
   ============================================ */
const products = [
  {
    id: "wasla", name: "WASLA", status: "Live" as const, dot: "bg-green-500", logo: "/wasla_logo.png",
    desc: "Smart public transportation platform redefining how Tunisians travel. AI-powered smart stations with modern booking — no crowds, no waiting.",
    highlights: [
      { icon: Cpu, text: "Smart AI-powered seat booking with departure prediction" },
      { icon: Globe, text: "Real-time station management system across Tunisia" },
      { icon: QrCode, text: "QR ticket scanning at smart stations" },
      { icon: Zap, text: "Book in advance or last-minute, even same hour" },
    ],
    userFlow: ["Open Wasla, pick your route", "AI predicts departure times", "Book seat — advance or same hour", "Show up, scan QR, board"],
    comingSoon: ["Mobile App", "Web App"],
    visual: "map",
  },
  {
    id: "nexapay", name: "NEXAPAY", status: "Live" as const, dot: "bg-green-500", logo: "/nexapay_logo.png",
    desc: "Tunisian blockchain-powered e-wallet built for end users and developers. Consumer simplicity meets programmable finance — fully on-chain, AI-driven.",
    highlights: [
      { icon: Blocks, text: "Blockchain-deployed e-wallet infrastructure — live and operating" },
      { icon: Cpu, text: "AI-powered KYC: AI scans and validates documents automatically. Zero human review." },
      { icon: Zap, text: "Zero human interaction in critical flows — everything automated" },
      { icon: Shield, text: "User-friendly despite underlying blockchain complexity" },
    ],
    devNote: "Published NPM SDK @nexapay/node-sdk for seamless integration.",
    links: [{ label: "Visit NexaPay", href: "https://nexapay.space" }, { label: "NPM SDK", href: "https://www.npmjs.com/package/@nexapay/node-sdk", icon: Package }],
    visual: "card",
  },
  {
    id: "backendglitch", name: "BACKEND GLITCH", status: "Coming Soon" as const, dot: "bg-[#7C3AED]", logo: "/logo.png",
    desc: "Our flagship cloud infrastructure platform — built for the Tunisian market. Deploy AI stacks, rent VPS, generate backends — pay in Tunisian Dinar.",
    highlights: [
      { icon: Cpu, text: "AI Infrastructure — deploy your AI stack in minutes" },
      { icon: Box, text: "VPS Rental — own hardware, Glitch-owned datacenter" },
      { icon: Zap, text: "Serverless DB — managed databases, instant deploy" },
      { icon: Globe, text: "AI Backend Generator — describe your backend, get a deployed API with docs" },
      { icon: Wallet, text: "Pay in TND — no foreign card required" },
      { icon: Shield, text: "Own Datacenter — operated by Glitch Inc" },
    ],
    callout: "Powered by our own infrastructure. Built in Tunisia. For the world.",
    visual: "logo",
  },
  {
    id: "fabrix", name: "FABRIX", status: "In Dev" as const, dot: "bg-amber-500", logo: null,
    desc: "Marketplace that turns idle 3D printers into a distributed manufacturing network. Owners monetize unused machine time. Customers get on-demand printing with doorstep delivery.",
    highlights: [
      { icon: Cpu, text: "AI-powered 3D model generation from text prompts" },
      { icon: Globe, text: "Distributed printer network across Tunisia" },
      { icon: Zap, text: "Automated job dispatching and queue management" },
      { icon: Package, text: "End-to-end logistics — warehouse to doorstep" },
    ],
    flows: {
      owners: [{ icon: Box, title: "Install Agent", desc: "Connect your printer to the network" }, { icon: Zap, title: "Earn Passively", desc: "Earn money when idle" }],
      customers: [{ icon: Cpu, title: "Upload/Generate", desc: "STL or AI text-to-3D" }, { icon: Globe, title: "Browse Library", desc: "Pick readymade designs" }, { icon: Clock, title: "Configure & Pay", desc: "Size, quantity, instant quote" }, { icon: Package, title: "Delivery", desc: "Printed, shipped to your door" }],
    },
    visual: "printer",
  },
]

/* ============================================
   STATUS BADGE
   ============================================ */
function StatusBadge({ status, dot }: { status: string; dot: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#A0A0A0]">
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} style={status === "Live" ? { animation: "pulse-dot 2s ease-in-out infinite" } : undefined} />
      {status}
    </span>
  )
}

/* ============================================
   PRODUCT CARD
   ============================================ */
function ProductCard({ product, onClick }: { product: typeof products[0]; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      onClick={onClick}
      className="group text-left w-full rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden hover:border-[#7C3AED]/20 transition-all duration-300"
    >
      <div className="grid md:grid-cols-5">
        {/* Content */}
        <div className="md:col-span-3 p-6 md:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {product.logo ? (
                <Image src={product.logo} alt={product.name} width={90} height={24} className="h-6 w-auto" />
              ) : (
                <span className="text-xl font-heading font-extrabold text-white">{product.name}</span>
              )}
              <StatusBadge status={product.status} dot={product.dot} />
            </div>
            <p className="text-sm text-[#A0A0A0] leading-relaxed mb-3">{product.desc}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.highlights.slice(0, 3).map((h) => (
                <span key={h.text} className="text-[10px] font-mono px-2 py-1 rounded bg-[#7C3AED]/5 border border-[#7C3AED]/10 text-[#7C3AED]">{h.text.slice(0, 40)}...</span>
              ))}
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7C3AED] group-hover:text-white transition-colors">
            View Details <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

        {/* Visual */}
        <div className="md:col-span-2 bg-white/[0.02] p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-white/5">
          {product.visual === "map" && <WaslaMapPreview />}
          {product.visual === "card" && <VirtualCard />}
          {product.visual === "logo" && (
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-[#7C3AED]/10 blur-2xl" />
              <Image src="/logo.png" alt="Backend Glitch" width={90} height={90} className="relative h-22 w-22 md:h-24 md:w-24 object-contain drop-shadow-[0_0_30px_rgba(124,58,237,0.4)]" />
            </div>
          )}
          {product.visual === "printer" && (
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-[#F59E0B]/5 border border-[#F59E0B]/15 flex items-center justify-center">
                <Printer className="h-9 w-9 text-[#F59E0B] stroke-1" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/15" />
            </div>
          )}
        </div>
      </div>
    </motion.button>
  )
}

/* ============================================
   DIALOGS
   ============================================ */
function WaslaDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const p = products[0]
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl bg-black border-white/10">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Image src={p.logo!} alt="WASLA" width={90} height={24} className="h-6 w-auto" />
            <span className="text-lg text-[#7C3AED] font-heading">وصلة</span>
            <StatusBadge status={p.status} dot={p.dot} />
          </div>
          <DialogTitle className="text-xl font-heading font-bold text-white !mt-2">{p.name}</DialogTitle>
          <DialogDescription className="text-sm text-[#A0A0A0] !mt-1">{p.desc}</DialogDescription>
        </DialogHeader>
        <div className="space-y-5 mt-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-xs font-mono text-[#7C3AED] uppercase tracking-wider mb-3">Passenger Flow</p>
            <div className="space-y-2.5">
              {p.userFlow!.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#7C3AED]/15 text-[#7C3AED] text-[10px] font-mono font-bold border border-[#7C3AED]/20 flex items-center justify-center">{i + 1}</span>
                  <span className="text-sm text-[#A0A0A0]">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <ul className="space-y-2">
            {p.highlights.map((h) => <li key={h.text} className="flex items-start gap-2 text-sm text-[#A0A0A0]"><h.icon className="h-4 w-4 text-[#7C3AED] mt-0.5 flex-shrink-0" />{h.text}</li>)}
          </ul>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-xs font-mono text-[#7C3AED] uppercase tracking-wider mb-2">Coming Soon</p>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#7C3AED]/5 border border-[#7C3AED]/15 text-xs text-[#7C3AED]"><Smartphone className="h-3.5 w-3.5" /> Mobile App</span>
              {" "}
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#7C3AED]/5 border border-[#7C3AED]/15 text-xs text-[#7C3AED]"><Globe className="h-3.5 w-3.5" /> Web App</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 mb-2"><MapPin className="h-4 w-4 text-[#7C3AED]" /><span className="text-xs font-mono text-[#A0A0A0] uppercase tracking-wider">Stations</span></div>
              <Image src="/tn.svg" alt="Tunisia" width={200} height={240} className="w-full h-auto max-h-[160px] object-contain map-dark rounded-lg" />
              <div className="flex flex-wrap gap-2 mt-2">
                {["Monastir Center", "Monastir Jammel", "Monastir Ksour Hellal", "Nabeul Grombalia"].map((s) => (
                  <span key={s} className="text-[10px] text-[#A0A0A0] font-mono inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function NexaPayDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const p = products[1]
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl bg-black border-white/10">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1"><Image src={p.logo!} alt="NEXAPAY" width={90} height={24} className="h-6 w-auto" /><StatusBadge status={p.status} dot={p.dot} /></div>
          <DialogTitle className="text-xl font-heading font-bold text-white !mt-2">{p.name}</DialogTitle>
          <DialogDescription className="text-sm text-[#A0A0A0] !mt-1">{p.desc}</DialogDescription>
        </DialogHeader>
        <div className="space-y-5 mt-4">
          <div className="flex justify-center py-2"><VirtualCard /></div>
          <ul className="space-y-2">{p.highlights.map((h) => <li key={h.text} className="flex items-start gap-2 text-sm text-[#A0A0A0]"><h.icon className="h-4 w-4 text-[#7C3AED] mt-0.5 flex-shrink-0" />{h.text}</li>)}</ul>
          <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
            <div className="flex items-center gap-2 mb-1 text-green-400"><Package className="h-4 w-4" /><span className="font-heading font-bold text-sm">Developer-First</span></div>
            <p className="text-sm text-[#A0A0A0]">{p.devNote}</p>
          </div>
          <div className="flex gap-3">
            {p.links!.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all ${l.icon ? "border border-white/10 text-white hover:border-[#7C3AED]/30" : "bg-[#7C3AED] text-white hover:bg-[#6D28D9]"}`}>
                {l.icon && <l.icon className="h-4 w-4" />} {l.label} <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function BackendGlitchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const p = products[2]
  const scrollTo = (id: string) => { onClose(); setTimeout(() => { const e = document.getElementById(id); if (e) window.scrollTo({ top: e.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" }) }, 200) }
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl bg-black border-white/10">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1"><Image src={p.logo!} alt="Backend Glitch" width={28} height={28} className="h-7 w-7" /><span className="text-xl font-heading font-extrabold text-white">BACKEND <span className="text-[#7C3AED]">GLITCH</span></span><StatusBadge status={p.status} dot={p.dot} /></div>
          <DialogTitle className="text-xl font-heading font-bold text-white !mt-2">Cloud Infrastructure Platform</DialogTitle>
          <DialogDescription className="text-sm text-[#A0A0A0] !mt-1">{p.desc}</DialogDescription>
        </DialogHeader>
        <div className="space-y-5 mt-4">
          <div className="grid sm:grid-cols-2 gap-3">
            {p.highlights.map((h) => <div key={h.text} className="p-3 rounded-xl bg-white/[0.02] border border-white/5"><div className="flex items-center gap-2 mb-1.5"><h.icon className="h-4 w-4 text-[#7C3AED]" /><span className="text-sm font-heading font-bold text-white">{h.text.split(" —")[0]}</span></div><p className="text-xs text-[#A0A0A0]">{h.text.includes("—") ? h.text.split("—")[1].trim() : ""}</p></div>)}
          </div>
          <div className="p-4 rounded-xl bg-[#7C3AED]/5 border border-[#7C3AED]/10">
            <p className="text-xs font-mono text-[#7C3AED] uppercase tracking-wider mb-3">AI Backend Generator</p>
            <div className="space-y-2">
              {["Pick your stack (or let AI choose)", "Write a prompt describing your backend", "AI customizes, deploys, documents", "Minutes later: live API + database + docs"].map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-[#A0A0A0]"><span className="text-[#7C3AED] font-mono text-xs mt-0.5">0{i + 1}.</span>{s}</div>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <p className="text-sm font-medium text-white">{p.callout}</p>
            <button onClick={() => scrollTo("contact")} className="flex-shrink-0 px-5 py-2.5 text-sm font-semibold bg-[#7C3AED] text-white rounded-lg hover:bg-[#6D28D9] transition-all">Join the Waitlist <ArrowRight className="h-3.5 w-3.5 inline ml-1" /></button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FabrixDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const p = products[3]
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl bg-black border-white/10">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1"><span className="text-2xl font-heading font-extrabold text-white">FABRIX</span><StatusBadge status={p.status} dot={p.dot} /></div>
          <DialogTitle className="text-xl font-heading font-bold text-white !mt-2">3D Printer Marketplace</DialogTitle>
          <DialogDescription className="text-sm text-[#A0A0A0] !mt-1">{p.desc}</DialogDescription>
        </DialogHeader>
        <div className="space-y-5 mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-xs font-mono text-[#F59E0B] uppercase tracking-wider mb-3">For Printer Owners</p>
              <div className="space-y-3">
                {p.flows!.owners.map((f) => <div key={f.title} className="p-3 rounded-lg bg-black/50 border border-white/5"><div className="flex items-center gap-2"><f.icon className="h-4 w-4 text-[#F59E0B]" /><span className="text-sm font-heading font-bold text-white">{f.title}</span></div><p className="text-xs text-[#A0A0A0] mt-1">{f.desc}</p></div>)}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-xs font-mono text-[#F59E0B] uppercase tracking-wider mb-3">For Customers</p>
              <div className="space-y-3">
                {p.flows!.customers.map((f) => <div key={f.title} className="p-3 rounded-lg bg-black/50 border border-white/5"><div className="flex items-center gap-2"><f.icon className="h-4 w-4 text-[#F59E0B]" /><span className="text-sm font-heading font-bold text-white">{f.title}</span></div><p className="text-xs text-[#A0A0A0] mt-1">{f.desc}</p></div>)}
              </div>
            </div>
          </div>
          <ul className="space-y-2">{p.highlights.map((h) => <li key={h.text} className="flex items-start gap-2 text-sm text-[#A0A0A0]"><h.icon className="h-4 w-4 text-[#7C3AED] mt-0.5 flex-shrink-0" />{h.text}</li>)}</ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* ============================================
   SECTION
   ============================================ */
export default function Products() {
  const [sel, setSel] = useState<string | null>(null)
  const scrollTo = (id: string) => { const e = document.getElementById(id); if (e) window.scrollTo({ top: e.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" }) }

  return (
    <>
      <section id="products" className="py-24 md:py-32 bg-black">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#A0A0A0] mb-3 text-center">What We Ship</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-3 text-center">Products</h2>
          <p className="text-sm text-[#A0A0A0] max-w-md mx-auto text-center mb-16">Real products. Real infrastructure. Built in Tunisia.</p>

          <div className="flex flex-col gap-4 md:gap-5 mb-16">
            {products.map((p) => <ProductCard key={p.id} product={p} onClick={() => setSel(p.id)} />)}
          </div>

          <div className="text-center py-10 px-6 rounded-2xl border border-dashed border-white/5 bg-white/[0.01] max-w-xl mx-auto">
            <p className="text-lg font-heading font-bold text-white mb-1">And we are not done.</p>
            <p className="text-sm text-[#A0A0A0] mb-5">Several projects in stealth. Let us talk.</p>
            <button onClick={() => scrollTo("contact")} className="px-5 py-2.5 text-sm font-semibold bg-[#7C3AED] text-white rounded-lg hover:bg-[#6D28D9] transition-all">Get In Touch <ArrowRight className="h-3.5 w-3.5 inline ml-1" /></button>
          </div>
        </div>
      </section>

      <WaslaDialog open={sel === "wasla"} onClose={() => setSel(null)} />
      <NexaPayDialog open={sel === "nexapay"} onClose={() => setSel(null)} />
      <BackendGlitchDialog open={sel === "backendglitch"} onClose={() => setSel(null)} />
      <FabrixDialog open={sel === "fabrix"} onClose={() => setSel(null)} />
    </>
  )
}
