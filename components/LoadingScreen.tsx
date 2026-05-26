"use client"

import { useEffect, useState, createContext, useContext, useCallback } from "react"
import Image from "next/image"

const LoadingCtx = createContext<{ done: boolean }>({ done: true })

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)
  const [show, setShow] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    // Only show on first visit per session
    const seen = sessionStorage.getItem("glitch-splash-seen")
    if (seen) return
    sessionStorage.setItem("glitch-splash-seen", "1")
    setShow(true)
    setStarted(true)
  }, [])

  const skip = useCallback(() => {
    if (!started) return
    setDone(true)
    setTimeout(() => setShow(false), 500)
  }, [started])

  // Auto-finish after 1.5s
  useEffect(() => {
    if (!started) return
    const t = setTimeout(() => {
      setDone(true)
      setTimeout(() => setShow(false), 500)
    }, 1500)
    return () => clearTimeout(t)
  }, [started])

  if (!show) return <>{children}</>

  return (
    <LoadingCtx.Provider value={{ done }}>
      <SplashScreen done={done} skip={skip} />
      <div style={{ visibility: done ? "visible" : "hidden" }}>{children}</div>
    </LoadingCtx.Provider>
  )
}

export function useLoadingDone() { return useContext(LoadingCtx).done }

function SplashScreen({ done, skip }: { done: boolean; skip: () => void }) {
  const [settled, setSettled] = useState(false)

  // "GLITCH" glitches in, then settles
  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      onClick={skip}
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center cursor-pointer transition-opacity duration-500 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-center">
        {/* Wordmark — glitch in then settle */}
        <h1
          className={`font-pixel text-4xl md:text-5xl text-white select-none transition-all duration-600 ${
            settled ? "translate-y-0 scale-100" : "translate-y-2 scale-95"
          }`}
          style={{
            textShadow: settled
              ? "0 0 20px rgba(124,58,237,0.3)"
              : `${(Math.random()-0.5)*5}px ${(Math.random()-0.5)*3}px 0 rgba(255,0,255,0.5), ${(Math.random()-0.5)*-5}px ${(Math.random()-0.5)*-3}px 0 rgba(0,255,255,0.5)`,
          }}
        >
          GLITCH
        </h1>

        {/* Thin bar below */}
        <div className="mt-8 mx-auto w-24 h-[2px] bg-[#7C3AED]/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#7C3AED] rounded-full transition-all duration-1000"
            style={{ width: settled ? "100%" : "20%", boxShadow: "0 0 6px rgba(124,58,237,0.5)" }}
          />
        </div>

        {/* Skip hint */}
        <p className="mt-8 text-[10px] font-mono tracking-wider text-[#A0A0A0]/40">
          Click anywhere to skip
        </p>
      </div>
    </div>
  )
}
