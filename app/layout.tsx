import type React from "react"
import type { Metadata } from "next"
import { Nunito, Fredoka } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-nunito",
})

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-fredoka",
})

export const metadata: Metadata = {
  title: "法老绘本 - AR阅读伴读",
  description: "神奇的AR绘本阅读体验，与河马小伙伴一起探索知识",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${nunito.variable} ${fredoka.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
