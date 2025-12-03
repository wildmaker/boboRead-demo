"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, ChevronLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ReadPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  const handleFinish = () => {
    router.push(`/reading-complete?bookId=${id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-secondary/10 flex flex-col">
      <header className="px-4 py-4 flex items-center justify-between">
        <Link href={`/book/${id}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          <span className="text-sm font-medium">阅读中</span>
        </div>
        <div className="w-10" />
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pb-10">
        <Card className="w-full max-w-md p-6 space-y-4 text-center">
          <h1 className="text-xl font-bold">阅读体验占位页</h1>
          <p className="text-sm text-muted-foreground">
            这里可以接入实际的 AR 阅读或语音伴读界面。当前仅作为占位，让扫码 → 阅读 → 完成的流程是闭环的。
          </p>
          <Button className="w-full h-11 rounded-xl mt-4" onClick={handleFinish}>
            <CheckCircle2 className="w-5 h-5 mr-2" />
            结束阅读
          </Button>
        </Card>
      </main>
    </div>
  )
}


