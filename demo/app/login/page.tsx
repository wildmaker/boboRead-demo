"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") || "/privacy-agreement"

  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleSendCode = () => {
    setIsCodeSent(true)
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleLogin = () => {
    // In real app, perform authentication here
    router.push(returnTo)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex flex-col">
      {/* Header */}
      <div className="p-4">
        <Link href="/home">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-balance">欢迎来到书小宝</h1>
            <p className="text-muted-foreground text-pretty">使用手机号登录，开启智能阅读之旅</p>
          </div>

          <div className="space-y-6 bg-card p-8 rounded-3xl shadow-sm border">
            {/* Phone Input */}
            <div className="space-y-2">
              <Label htmlFor="phone">手机号</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="请输入手机号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 rounded-xl text-base"
                maxLength={11}
              />
            </div>

            {/* Verification Code */}
            <div className="space-y-2">
              <Label htmlFor="code">验证码</Label>
              <div className="flex gap-2">
                <Input
                  id="code"
                  type="text"
                  placeholder="请输入验证码"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="h-12 rounded-xl text-base flex-1"
                  maxLength={6}
                />
                <Button
                  variant="outline"
                  className="h-12 px-4 rounded-xl min-w-[100px] bg-transparent"
                  onClick={handleSendCode}
                  disabled={!phone || phone.length !== 11 || countdown > 0}
                >
                  {countdown > 0 ? `${countdown}秒` : "获取验证码"}
                </Button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              size="lg"
              className="w-full h-12 rounded-xl"
              onClick={handleLogin}
              disabled={!phone || !code || code.length !== 6}
            >
              登录/注册
            </Button>

            {/* Terms */}
            <p className="text-xs text-center text-muted-foreground text-pretty">
              登录即表示同意
              <Link href="#" className="text-primary hover:underline">
                《用户协议》
              </Link>
              和
              <Link href="#" className="text-primary hover:underline">
                《隐私政策》
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
