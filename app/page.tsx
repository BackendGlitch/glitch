import Navbar from "@/components/sections/Navbar"
import Hero from "@/components/sections/Hero"
import Services from "@/components/sections/Services"
import FeaturedProjects from "@/components/sections/FeaturedProjects"
import About from "@/components/sections/About"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <Hero />
      <Services />
      <FeaturedProjects />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
