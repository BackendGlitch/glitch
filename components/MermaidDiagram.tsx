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
  const [touchStart, setTouchStart] = useState<{ x: number; y: number; distance: number } | null>(null)
  const [initialScale, setInitialScale] = useState(1)

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

  // Drag functionality (mouse)
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

  // Touch functionality
  const getTouchDistance = (touches: React.TouchList): number => {
    if (touches.length < 2) return 0
    const touch1 = touches[0]
    const touch2 = touches[1]
    return Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length === 1) {
      // Single touch - panning
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    } else if (e.touches.length === 2) {
      // Two touches - pinch to zoom
      const distance = getTouchDistance(e.touches)
      setTouchStart({
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        distance,
      })
      setInitialScale(scale)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length === 1 && isDragging) {
      // Single touch - panning
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      })
    } else if (e.touches.length === 2 && touchStart) {
      // Two touches - pinch to zoom
      const distance = getTouchDistance(e.touches)
      const scaleChange = distance / touchStart.distance
      const newScale = Math.max(0.5, Math.min(3, initialScale * scaleChange))
      setScale(newScale)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length === 0) {
      setIsDragging(false)
      setTouchStart(null)
    } else if (e.touches.length === 1) {
      // Switch from pinch to pan
      setTouchStart(null)
      setIsDragging(true)
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    }
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
      {/* Zoom Controls - Larger on mobile */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 flex flex-col gap-2 sm:gap-2">
        <button
          onClick={handleZoomIn}
          className="p-3 sm:p-2 bg-zinc-900/95 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 active:bg-cyan-400/20 transition-all touch-manipulation min-w-[48px] min-h-[48px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
          aria-label="Zoom in"
          title="Zoom in"
        >
          <ZoomIn className="h-5 w-5 sm:h-4 sm:w-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-3 sm:p-2 bg-zinc-900/95 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 active:bg-cyan-400/20 transition-all touch-manipulation min-w-[48px] min-h-[48px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
          aria-label="Zoom out"
          title="Zoom out"
        >
          <ZoomOut className="h-5 w-5 sm:h-4 sm:w-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-3 sm:p-2 bg-zinc-900/95 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 active:bg-cyan-400/20 transition-all touch-manipulation min-w-[48px] min-h-[48px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
          aria-label="Reset zoom"
          title="Reset zoom"
        >
          <RotateCcw className="h-5 w-5 sm:h-4 sm:w-4" />
        </button>
      </div>

      {isLoading && (
        <div className="p-8 border-2 border-zinc-700 bg-zinc-900/50 text-center rounded-sm">
          <p className="text-zinc-400 font-mono text-sm">Rendering diagram...</p>
        </div>
      )}

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden border-2 border-zinc-700 rounded-sm bg-zinc-950 min-h-[300px] sm:min-h-[400px] cursor-move touch-none select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
      <div className="mt-2 text-xs sm:text-sm text-zinc-400 font-mono text-center px-2">
        Zoom: {Math.round(scale * 100)}% 
        {scale !== 1 && (
          <span className="hidden sm:inline"> • Click and drag to pan</span>
        )}
        <span className="sm:hidden"> • Pinch to zoom, drag to pan</span>
      </div>
    </div>
  )
}
