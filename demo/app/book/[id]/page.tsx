"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Lock, Crown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PaywallDialog } from "@/components/paywall-dialog"

const mockUserState = {
  isLoggedIn: true,
  isMember: false, // Change to true to test member flow
}

const mockBooks: Record<
  string,
  {
    id: string
    title: string
    author: string
    description: string
    cover: string
    ageRange: string
    resourceType: "free" | "premium" | "unrecorded"
    pages: number
  }
> = {
  "1": {
    id: "1",
    title: "小兔子的冒险",
    author: "张晓明",
    description: "跟随小兔子一起探索神奇的森林世界，学习勇敢和友谊的重要性。这是一个温馨的故事，适合睡前阅读。",
    cover: "/cute-rabbit-adventure.jpg",
    ageRange: "3-5岁",
    resourceType: "free",
    pages: 24,
  },
  "2": {
    id: "2",
    title: "恐龙世界大探险",
    author: "李明",
    description: "回到远古时代，认识各种各样的恐龙朋友，了解它们的生活习性。",
    cover: "/dinosaur-world.jpg",
    ageRange: "4-6岁",
    resourceType: "premium",
    pages: 32,
  },
  "3": {
    id: "3",
    title: "太空探险记",
    author: "王小红",
    description: "飞向太空，探索星球的奥秘，认识宇宙中的神奇现象。",
    cover: "/space-adventure.jpg",
    ageRange: "5-7岁",
    resourceType: "unrecorded",
    pages: 28,
  },
}

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [showPaywall, setShowPaywall] = useState(false)

  const book = mockBooks[params.id] || mockBooks["1"]

  const hasPermission = () => {
    if (book.resourceType === "free") return true
    if (mockUserState.isMember) return true
    return false
  }

  const handleStartReading = () => {
    if (!mockUserState.isLoggedIn) {
      router.push(`/login?returnTo=/book/${book.id}`)
      return
    }

    if (hasPermission()) {
      router.push(`/scan?bookId=${book.id}`)
    } else {
      // User doesn't have permission - show paywall
      setShowPaywall(true)
    }
  }

  const getButtonText = () => {
    if (hasPermission()) {
      return "开始阅读"
    }
    return "解锁阅读（会员专享）"
  }

  const getButtonIcon = () => {
    if (hasPermission()) {
      return <Play className="w-5 h-5 mr-2" />
    }
    return <Lock className="w-5 h-5 mr-2" />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          <Link href="/home">
            <Button variant="secondary" size="icon" className="rounded-full shadow-lg">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Cover Image */}
        <div className="relative h-80 bg-gradient-to-br from-primary/20 to-secondary/20">
          <img src={book.cover || "/placeholder.svg"} alt={book.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      </div>

      {/* Book Info */}
      <main className="px-6 py-6 space-y-6 -mt-20 relative z-10">
        {/* Book Card */}
        <Card className="p-6 space-y-4 shadow-xl">
          <div className="flex items-start gap-4">
            <img
              src={book.cover || "/placeholder.svg"}
              alt={book.title}
              className="w-24 h-32 object-cover rounded-xl shadow-lg flex-shrink-0"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h1 className="text-2xl font-bold text-balance">{book.title}</h1>
                {book.resourceType === "premium" && (
                  <Badge className="bg-accent text-accent-foreground flex-shrink-0">
                    <Crown className="w-3 h-3 mr-1" />
                    精品
                  </Badge>
                )}
                {book.resourceType === "unrecorded" && mockUserState.isMember && (
                  <Badge variant="outline" className="flex-shrink-0">
                    未收录
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">作者：{book.author}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{book.ageRange}</Badge>
                <Badge variant="outline">{book.pages} 页</Badge>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold">内容简介</h3>
            <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{book.description}</p>
          </div>

          <Button
            size="lg"
            className="w-full h-14 rounded-2xl text-base"
            onClick={handleStartReading}
            variant={hasPermission() ? "default" : "default"}
          >
            {getButtonIcon()}
            {getButtonText()}
          </Button>
        </Card>

        {/* Features for premium/unrecorded books */}
        {!hasPermission() && (
          <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-secondary/5">
            <h3 className="font-semibold flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              会员专享特权
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary-foreground">✓</span>
                </div>
                <div>
                  <p className="font-medium">解锁所有精品资源</p>
                  <p className="text-sm text-muted-foreground">海量优质绘本随心读</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary-foreground">✓</span>
                </div>
                <div>
                  <p className="font-medium">AI 实时合成朗读</p>
                  <p className="text-sm text-muted-foreground">任何绘本都能智能朗读</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-primary-foreground">✓</span>
                </div>
                <div>
                  <p className="font-medium">Pro 音色全解锁</p>
                  <p className="text-sm text-muted-foreground">更多高品质声音选择</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </main>

      <PaywallDialog open={showPaywall} onOpenChange={setShowPaywall} source="book-detail" />
    </div>
  )
}
