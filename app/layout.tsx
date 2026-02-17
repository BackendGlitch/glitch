import type { Metadata } from "next"
import { IBM_Plex_Mono, Press_Start_2P, Space_Grotesk } from "next/font/google"
import "./globals.css"

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
})

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
})

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
})

const pixelFont = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Glitch | Backend Infrastructure and Web3 Engineering",
  description:
    "Glitch is a Tunisia-based startup focused on backend infrastructure and Web3/blockchain development. Backend Glitch is our flagship product, currently waiting for funding to operate at scale.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} ${pixelFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
