"use client"

import { useState } from "react"
import { Share2, Copy, Check, Instagram, Linkedin } from "lucide-react"

export default function GraduateShareButtons({
  name,
  title,
  url,
}: {
  name: string
  title: string
  url: string
}) {
  const [copied, setCopied] = useState(false)

  const shareText = `${name} - ${title} at Glitch Inc 🎓`
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(shareText)

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          text: shareText,
          url,
        })
      } catch {
        // User cancelled - no-op
      }
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const input = document.createElement("input")
      input.value = url
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-mono text-[#7C3AED] uppercase tracking-wider">
        Share
      </h3>

      <div className="flex flex-wrap gap-3">
        {/* Native Share (includes Instagram on mobile) */}
        {typeof window !== "undefined" && typeof navigator !== "undefined" && typeof navigator.share === "function" && (
          <button
            onClick={handleNativeShare}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7C3AED] text-white font-heading text-sm font-medium hover:bg-[#6D28D9] transition-all"
          >
            <Share2 className="h-4 w-4" />
            Share via Instagram & more
          </button>
        )}

        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-[#0A66C2]/20 bg-[#0A66C2]/10 text-[#0A66C2] font-heading text-sm font-medium hover:bg-[#0A66C2]/15 transition-all"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>

        {/* Instagram - Ducky Prints */}
        <a
          href="https://www.instagram.com/duckyprints.o_o/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-[#E4405F]/20 bg-[#E4405F]/10 text-[#E4405F] font-heading text-sm font-medium hover:bg-[#E4405F]/15 transition-all"
        >
          <Instagram className="h-4 w-4" />
          Instagram
        </a>

        {/* Instagram hint + Copy Link */}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-[#A0A0A0] font-heading text-sm font-medium hover:text-white hover:border-[#7C3AED]/30 transition-all"
        >
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

      <p className="text-[10px] text-[#A0A0A0]/50 font-mono">
        Tap &quot;Share via Instagram&quot; on mobile to share directly to Instagram Stories or DMs
      </p>
    </div>
  )
}
