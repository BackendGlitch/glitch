"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/sections/Navbar"
import Hero from "@/components/sections/Hero"
import Services from "@/components/sections/Services"
import FeaturedProjects from "@/components/sections/FeaturedProjects"
import PFEProjects from "@/components/sections/PFEProjects"
import About from "@/components/sections/About"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"
import LoadingScreen from "@/components/LoadingScreen"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Start showing content slightly before loading screen finishes (for smooth transition)
    const showContentTimer = setTimeout(() => {
      setShowContent(true)
    }, 1100) // Start fade in at 1.1s (loading finishes at 1.6s)
    
    // Hide loading screen
    const hideLoadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1600)
    
    return () => {
      clearTimeout(showContentTimer)
      clearTimeout(hideLoadingTimer)
    }
  }, [])

  return (
    <>
      {isLoading && <LoadingScreen />}
      <main className={`min-h-screen bg-zinc-950 ${showContent ? "opacity-100" : "opacity-0"} transition-opacity duration-700 ease-out`}>
        <Navbar />
        <Hero />
        <Services />
        <FeaturedProjects />
        <PFEProjects />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
