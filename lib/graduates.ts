export interface Graduate {
  slug: string
  name: string
  title: string
  class: string
  photo: string
  project: string
  projectUrl: string
  statement: string
  contribution: string
  links: {
    label: string
    href: string
    icon: "github" | "linkedin" | "instagram" | "globe"
  }[]
}

export const graduates: Graduate[] = [
  {
    slug: "ayhem-belhassen",
    name: "Ayhem Belhassen",
    title: "Built Fabrix at Glitch Inc",
    class: "2026",
    photo: "/graduates/ayhem.jpg",
    project: "Fabrix",
    projectUrl: "https://fabrix.sbs",
    statement:
      "As his Projet de Fin d'Études, Ayhem built the entire Fabrix platform from the ground up - the frontend web interface, the central backend with job scheduling and payment processing, and the printer agent that connects physical 3D printers to the network. His work turned Fabrix from a concept into a working distributed manufacturing platform.",
    contribution:
      "Full-stack development of the Fabrix platform - frontend, backend, and printer agent. Designed the system architecture, implemented real-time job scheduling, integrated the Click payment gateway, and built the printer client application.",
    links: [
      { label: "GitHub", href: "https://github.com/ACPIdark", icon: "github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ayhem-belhassen-1931a5346", icon: "linkedin" },
      { label: "Ducky Prints", href: "https://www.instagram.com/duckyprints.o_o/", icon: "instagram" },
      { label: "Fabrix Preview", href: "https://fabrix.sbs", icon: "globe" },
    ],
  },
]

export function getGraduateBySlug(slug: string): Graduate | undefined {
  return graduates.find((g) => g.slug === slug)
}
