import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono, Press_Start_2P } from "next/font/google"
import "./globals.css"
import { LoadingProvider } from "@/components/LoadingScreen"

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
})

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
})

const pixelFont = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Glitch Inc — Backend Infrastructure & AI",
  description:
    "Glitch Inc is a Tunisia-based tech startup building backend infrastructure, AI agents, and Web3 systems.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} ${pixelFont.variable} antialiased`}>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  )
}
