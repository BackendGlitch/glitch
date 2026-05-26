"use client"

import { useEffect, useState, createContext, useContext } from "react"
import Image from "next/image"

const LoadingCtx = createContext<{ done: boolean }>({ done: true })

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true)
      setTimeout(() => setShow(false), 400)
    }, 1200)
    return () => clearTimeout(t)
  }, [])

  if (!show) return <>{children}</>
  return (
    <LoadingCtx.Provider value={{ done }}>
      <SplashScreen done={done} />
      <div style={{ visibility: done ? "visible" : "hidden" }}>{children}</div>
    </LoadingCtx.Provider>
  )
}

export function useLoadingDone() { return useContext(LoadingCtx).done }

function SplashScreen({ done }: { done: boolean }) {
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    const i = setInterval(() => { setBurst(true); setTimeout(() => setBurst(false), 120) }, 400)
    return () => clearInterval(i)
  }, [])

  return (
    <div className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-400 ${done ? "opacity-0 pointer-events-none" : "opacity-100"}`}>

      {/* RGB split — quick flash */}
      {burst && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 mix-blend-screen" style={{ background: "rgba(255,0,255,0.1)", transform: `translateX(${(Math.random()-0.5)*6}px)` }} />
          <div className="absolute inset-0 mix-blend-screen" style={{ background: "rgba(0,255,255,0.08)", transform: `translateX(${(Math.random()-0.5)*8}px)` }} />
        </div>
      )}

      {/* Tear lines */}
      {burst && [...Array(4)].map((_, i) => (
        <div key={i} className="absolute left-0 right-0 h-[1px] bg-[#7C3AED]/20 pointer-events-none"
          style={{ top: `${20 + i * 20}%`, transform: `translateX(${(Math.random()-0.5)*20}px)` }} />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center" style={{ transform: burst ? `translate(${(Math.random()-0.5)*4}px, ${(Math.random()-0.5)*3}px)` : "none", transition: burst ? "none" : "all 0.2s ease-out" }}>

        <div className="relative inline-block mb-6">
          <div className="absolute -inset-6 rounded-full bg-[#7C3AED]/10 blur-2xl" />
          <Image src="/logo.png" alt="Glitch Inc" width={72} height={72}
            className="relative h-16 w-16 mx-auto drop-shadow-[0_0_25px_rgba(124,58,237,0.3)]" priority />
        </div>

        <h1 className="font-pixel text-3xl md:text-4xl text-white mb-6 select-none"
          style={{ textShadow: burst ? `${(Math.random()-0.5)*3}px ${(Math.random()-0.5)*2}px 0 rgba(255,0,255,0.4)` : "none" }}>
          GLITCH
        </h1>

        <div className="mx-auto w-28 h-[2px] bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-[#7C3AED] rounded-full animate-pulse" style={{ width: "60%", boxShadow: "0 0 4px rgba(124,58,237,0.4)" }} />
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-[10px] font-mono tracking-wider text-[#A0A0A0]">
          <TunisiaFlag className="w-4 h-3" />
          Built in Tunisia
        </div>
      </div>
    </div>
  )
}

function TunisiaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="30" height="20" fill="#E70013" />
      <circle cx="15" cy="10" r="5" fill="white" />
      <path d="M15 6.5 A4 4 0 0 0 12 10 A4 4 0 0 0 15 13.5 A3.5 3.5 0 0 1 13 10 A3.5 3.5 0 0 1 15 6.5Z" fill="#E70013" />
      <polygon points="16.5,7.5 15.5,8 15,7 14.5,8 13.5,7.5 14,8.5 13,9 14,9.5 13.5,10.5 14.5,10 15,11 15.5,10 16.5,10.5 16,9.5 17,9 16,8.5" fill="#E70013" />
    </svg>
  )
}
