import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans_Arabic, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
})
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SBE2Value - Smart Platform for Spent Bleaching Earth",
  description: "Transform industrial waste into economic value",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar">
      <body className={`font-sans antialiased ${_ibmPlex.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
