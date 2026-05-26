import Navbar from "@/components/sections/Navbar"
import Hero from "@/components/sections/Hero"
import Services from "@/components/sections/Services"
import Products from "@/components/sections/Products"
import HowWeWork from "@/components/sections/HowWeWork"
import TechStack from "@/components/sections/TechStack"
import About from "@/components/sections/About"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A]">
      <Navbar />
      <Hero />
      <Services />
      <Products />
      <HowWeWork />
      <TechStack />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
