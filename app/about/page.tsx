"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Info } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Info className="w-5 h-5" />
          关于我们
        </h1>
      </header>

      <main className="px-6 py-6 space-y-4">
        <Card className="p-4 space-y-2">
          <h2 className="font-semibold">书小宝 · AI 智能阅读伴侣</h2>
          <p className="text-sm text-muted-foreground">
            本页面为占位介绍，可根据实际品牌信息补充公司介绍、团队介绍、联系我们等内容。
          </p>
          <p className="text-xs text-muted-foreground">当前版本：v1.0.0</p>
        </Card>
      </main>
    </div>
  )
}


