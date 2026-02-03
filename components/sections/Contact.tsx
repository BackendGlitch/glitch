"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Send, Loader2 } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Success
      setSubmitStatus({
        type: "success",
        message: "Thank you for your message! We'll get back to you soon.",
      })
      setFormData({ name: "", email: "", message: "" })

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" })
      }, 5000)
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" })
    }
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-zinc-950 to-pink-950/20 border-t-4 border-pink-400">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12 text-center">
          <div className="inline-block mb-6 px-6 py-3 bg-pink-400/20 border-4 border-pink-400 pixel-text text-pink-400 text-xs">
            [ CONTACT ]
          </div>
          <h2 className="text-5xl md:text-7xl font-pixel text-white mb-4 tracking-wider">
            GET IN TOUCH
          </h2>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto font-mono">
            We're a new startup and we'd love to hear from you. Let's build something amazing together.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-pixel text-zinc-300 mb-2"
                >
                  [ NAME ]
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  disabled={isSubmitting}
                  className="bg-zinc-900 border-4 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-pink-400 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-pixel text-zinc-300 mb-2"
                >
                  [ EMAIL ]
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                  className="bg-zinc-900 border-4 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-pink-400 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-pixel text-zinc-300 mb-2"
                >
                  [ MESSAGE ]
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or idea..."
                  rows={6}
                  disabled={isSubmitting}
                  className="bg-zinc-900 border-4 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-pink-400 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Status Message */}
              {submitStatus.type && (
                <div
                  className={`p-4 border-4 ${
                    submitStatus.type === "success"
                      ? "border-green-400 bg-green-400/10 text-green-400"
                      : "border-red-400 bg-red-400/10 text-red-400"
                  } font-pixel text-sm`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full pixel-button bg-pink-400 text-zinc-950 border-pink-400 px-8 py-4 text-sm font-pixel disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    [ SENDING... ]
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    [ SEND MESSAGE ]
                  </>
                )}
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div className="pixel-card border-cyan-400 bg-cyan-400/10 p-6">
              <div className="mb-4 flex items-center gap-3 text-cyan-400">
                <MapPin className="h-6 w-6" />
                <h3 className="text-lg font-pixel text-cyan-400">[ LOCATION ]</h3>
              </div>
              <p className="text-zinc-300 text-lg font-mono mb-2">
                Tunisia
              </p>
              <p className="text-sm text-zinc-500 font-mono">
                Remote & On-site collaboration available
              </p>
            </div>
            <div className="pixel-card border-yellow-400 bg-yellow-400/10 p-6">
              <div className="mb-4 flex items-center gap-3 text-yellow-400">
                <Mail className="h-6 w-6" />
                <h3 className="text-lg font-pixel text-yellow-400">[ EMAIL ]</h3>
              </div>
              <p className="text-zinc-300 font-mono">
                Contact us for inquiries, partnerships, or project discussions
              </p>
            </div>
            <div className="pixel-card border-purple-400 bg-gradient-to-br from-purple-400/10 to-pink-400/10 p-6">
              <h3 className="text-lg font-pixel text-purple-400 mb-2">[ NEW STARTUP ]</h3>
              <p className="text-zinc-300 text-sm font-mono">
                We're just getting started, but we're ready to take on exciting projects. 
                Whether you need blockchain solutions, web development, AI integration, or game development, 
                we're here to help bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
