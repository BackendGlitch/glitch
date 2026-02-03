"use client"

import { useEffect, useRef, useState } from "react"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface MermaidDiagramProps {
  chart: string
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const mermaidRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!mermaidRef.current || typeof window === "undefined") return

    const renderDiagram = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Dynamically import mermaid only on client side
        const mermaid = (await import("mermaid")).default

        // Initialize Mermaid with dark theme only
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            primaryColor: "#00d9ff",
            primaryTextColor: "#000000",
            primaryBorderColor: "#00aacc",
            lineColor: "#00ffff",
            secondaryColor: "#aa00ff",
            tertiaryColor: "#ffff00",
            background: "#09090b",
            mainBkgColor: "#18181b",
            secondBkgColor: "#27272a",
            textColor: "#fafafa",
          },
          securityLevel: "loose",
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: "basis",
          },
        })

        // Clear previous content
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = ""

          // Generate unique ID for this diagram
          const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`

          // Render the diagram
          const { svg } = await mermaid.render(id, chart)
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = svg
          }
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Mermaid rendering error:", err)
        setError(err instanceof Error ? err.message : "Failed to render diagram")
        setIsLoading(false)
      }
    }

    renderDiagram()
  }, [chart])

  // Zoom functions
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return // Only left mouse button
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  if (error) {
    return (
      <div className="p-8 border-2 border-red-400 bg-red-400/10 text-center rounded-sm">
        <p className="text-red-400 font-mono text-sm mb-4">Error rendering diagram: {error}</p>
        <details className="text-left">
          <summary className="text-xs text-zinc-400 font-mono cursor-pointer mb-2">Show Mermaid code</summary>
          <pre className="mt-2 text-xs text-zinc-400 font-mono overflow-auto p-4 bg-zinc-900/50 rounded">
            {chart}
          </pre>
        </details>
      </div>
    )
  }

  return (
    <div className="w-full relative">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-zinc-900/90 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all"
          aria-label="Zoom in"
          title="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-zinc-900/90 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all"
          aria-label="Zoom out"
          title="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-zinc-900/90 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all"
          aria-label="Reset zoom"
          title="Reset zoom"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {isLoading && (
        <div className="p-8 border-2 border-zinc-700 bg-zinc-900/50 text-center rounded-sm">
          <p className="text-zinc-400 font-mono text-sm">Rendering diagram...</p>
        </div>
      )}

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden border-2 border-zinc-700 rounded-sm bg-zinc-950 min-h-[400px] cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={mermaidRef}
          className="mermaid-container w-full flex justify-center items-center p-8"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.2s ease-out",
          }}
        />
      </div>

      {/* Zoom indicator */}
      <div className="mt-2 text-xs text-zinc-400 font-mono text-center">
        Zoom: {Math.round(scale * 100)}% {scale !== 1 && "• Click and drag to pan"}
      </div>
    </div>
  )
}
