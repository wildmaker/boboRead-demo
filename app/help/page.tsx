"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          帮助中心
        </h1>
      </header>

      <main className="px-6 py-6 space-y-4">
        <Card className="p-4 space-y-2">
          <h2 className="font-semibold">常见问题</h2>
          <p className="text-sm text-muted-foreground">
            这里将展示常见的使用问题和解决方案。当前为占位页面，后续可以接入真实的帮助文档或客服系统。
          </p>
        </Card>
      </main>
    </div>
  )
}


