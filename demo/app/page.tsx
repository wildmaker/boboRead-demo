"use client"

import { useEffect } from "react"
import { Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LaunchScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
        {/* App Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 bg-primary rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
            <Sparkles className="w-16 h-16 text-primary-foreground" />
          </div>
        </div>

        {/* App Name */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary text-balance">书小宝</h1>
          <p className="text-lg text-muted-foreground text-pretty">AI 智能阅读伴侣</p>
        </div>
      </div>
    </div>
  )
}
