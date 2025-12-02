"use client"

import Link from "next/link"
import { User, Settings, ChevronRight, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] to-background">
      {/* Header */}
      <header className="px-4 pt-10 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#FF8F00] font-fredoka">我的</h1>
          <p className="mt-1 text-xs text-[#8D6E63] font-medium">管理宝宝资料和应用设置</p>
        </div>
      </header>

      <main className="px-4 pb-10 space-y-6">
        {/* Profile Card */}
        <Card className="p-4 flex items-center gap-4 bg-white/90 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#FFE0B2] flex items-center justify-center text-[#FF6F00]">
            <User className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold">小明的阅读角</p>
                <p className="mt-0.5 text-xs text-muted-foreground">宝宝资料可在设置中修改</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Reading summary */}
        <Card className="p-4 flex items-center justify-between bg-[#FFF8E1] border-[#FFE082]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#FF8F00]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#5D4037]">阅读小结</p>
              <p className="text-xs text-[#8D6E63]">已收集 12 本故事书，继续加油～</p>
            </div>
          </div>
        </Card>

        {/* Navigation list */}
        <section className="space-y-3">
          <h2 className="text-xs font-medium text-muted-foreground px-1">通用</h2>
          <Card className="divide-y">
            <Link
              href="/settings"
              className="flex items-center justify-between p-4 hover:bg-accent/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">设置</p>
                  <p className="text-xs text-muted-foreground">宝宝信息、隐私、安全等</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </Card>
        </section>

        <section>
          <Button asChild variant="outline" className="w-full rounded-xl text-xs text-muted-foreground border-dashed">
            <Link href="/">返回首页</Link>
          </Button>
        </section>
      </main>
    </div>
  )
}


