"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function FeedbackPage() {
  const [content, setContent] = useState("")
  const [contact, setContact] = useState("")

  const handleSubmit = () => {
    alert("感谢您的反馈，我们会尽快查看！")
    setContent("")
    setContact("")
  }

  const disabled = !content.trim()

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          意见反馈
        </h1>
      </header>

      <main className="px-6 py-6">
        <Card className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="feedback">反馈内容</Label>
            <Textarea
              id="feedback"
              placeholder="请描述您遇到的问题或产品建议..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">联系方式（选填）</Label>
            <Input
              id="contact"
              placeholder="微信/手机号/邮箱"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <Button className="w-full mt-2" disabled={disabled} onClick={handleSubmit}>
            提交反馈
          </Button>
        </Card>
      </main>
    </div>
  )
}


