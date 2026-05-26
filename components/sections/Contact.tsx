"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Loader2, Mail } from "lucide-react"

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true); setStatus({ type: null, message: "" })
    try { const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); const d = await r.json(); if (!r.ok) throw new Error(d.error || "Failed"); setStatus({ type: "success", message: "Thanks! We'll reply shortly." }); setForm({ name: "", email: "", message: "" }); setTimeout(() => setStatus({ type: null, message: "" }), 5000) }
    catch (err) { setStatus({ type: "error", message: err instanceof Error ? err.message : "Failed." }) }
    finally { setSubmitting(false) }
  }

  const cls = "w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder:text-[#A0A0A0] focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/30 transition-all text-sm"

  return (
    <section id="contact" className="py-24 md:py-32 bg-black">
      <div className="container mx-auto px-6 md:px-8 max-w-3xl">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#A0A0A0] mb-3 text-center">Contact</p>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-3 text-center">Let&apos;s Talk</h2>
        <p className="text-sm text-[#A0A0A0] max-w-md mx-auto text-center mb-16">We take on select projects. If you&apos;re building in AI, Web3, or backend infrastructure — reach out.</p>

        <div className="grid md:grid-cols-5 gap-10 max-w-2xl mx-auto">
          <motion.form initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={submit} className="md:col-span-3 space-y-4">
            <div><label className="block text-xs font-mono text-[#A0A0A0] mb-2 uppercase tracking-wider">Name</label><input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" disabled={submitting} className={cls} /></div>
            <div><label className="block text-xs font-mono text-[#A0A0A0] mb-2 uppercase tracking-wider">Email</label><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" disabled={submitting} className={cls} /></div>
            <div><label className="block text-xs font-mono text-[#A0A0A0] mb-2 uppercase tracking-wider">Message</label><textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project..." rows={4} disabled={submitting} className={cls + " resize-none"} /></div>
            {status.type && <div className={`p-3 rounded-lg text-sm ${status.type === "success" ? "bg-green-900/20 border border-green-500/20 text-green-400" : "bg-red-900/20 border border-red-500/20 text-red-400"}`}>{status.message}</div>}
            <button type="submit" disabled={submitting} className="w-full px-6 py-3 text-sm font-semibold bg-[#7C3AED] text-white rounded-lg hover:bg-[#6D28D9] transition-all disabled:opacity-50 flex items-center justify-center gap-2">{submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Message</>}</button>
          </motion.form>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-2 flex flex-col justify-center gap-5">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5"><div className="flex items-center gap-2 text-[#7C3AED] mb-2"><Mail className="h-4 w-4" /><span className="font-heading font-semibold text-sm">Email</span></div><p className="text-sm text-[#A0A0A0] font-mono">contact@backendglitch.com</p></div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5"><p className="text-sm text-[#A0A0A0] leading-relaxed">We respond within 24 hours. Investor, founder, or engineer — if the work is serious, we&apos;re interested.</p></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
